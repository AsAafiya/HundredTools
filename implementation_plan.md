# Background Remover Tool Implementation Plan

This plan details the addition of a **Background Remover** tool to the "Hundred Tools" codebase.

## Codebase Analysis & Architecture

### 1. Project Architecture
The project follows a full-stack Javascript architecture:
*   **Frontend**: Built with React, Vite, and React Router. Styling uses CSS files (`client/src/styles/`).
*   **Backend**: A Node.js + Express server.
*   **Database**: MongoDB connected using Mongoose (primarily used for authentication and metadata).
*   **Image Processing**: The backend currently processes image manipulations (resizing, cropping, converting, compression) using `sharp`.

### 2. Frontend vs Backend Location
*   **Frontend**: Located in the [client](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/client) directory.
*   **Backend**: Located in the [server](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/server) directory.

### 3. Current Data Flow
For existing image tools:
1. The user uploads images via `FileUploadImage` component in the frontend.
2. The frontend sends a multipart request using `axios` (`imageService.js`) to the backend.
3. The Express backend receives the files, saves them temporarily to `server/uploads/` via Multer, processes them using `sharp`, and writes the output to `server/outputs/`.
4. The backend streams the processed file/ZIP back as a binary response using `res.download()`.
5. The frontend handles the response, creates a downloadable URL using `URL.createObjectURL(blob)`, and resets the uploader when clicked.

### 4. Important Files & Purpose
*   [AppRoutes.jsx](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/client/src/routes/AppRoutes.jsx): Manages route paths for tools.
*   [Home.jsx](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/client/src/pages/Home.jsx): The homepage grid, which already includes a placeholder link for "Remove Background" (`/tools/image/remove-bg`).
*   [ToolsPage.jsx](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/client/src/pages/ToolsPage.jsx): Category page showing tools for the `image` category.
*   [imageRoute.js](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/server/routes/imageRoute.js): Backend router for `/api/image/*` operations.
*   [imageController.js](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/server/controllers/imageController.js): Sharp-based controllers for processing image edits.

---

## Proposed Approaches

We have two main design choices for adding Background Removal:

### Option 1 (Recommended): Client-side Background Removal using `@imgly/background-removal`
Run the AI-based background removal directly in the user's browser using WebAssembly.
*   **Pros**:
    *   **Cost & Server Friendly**: Zero server load. No crashes on Render (which has a strict 512MB RAM limit on the free tier).
    *   **Data Privacy**: Images never leave the client's browser.
    *   **Unlimited & Free**: No third-party API limits or subscription keys.
*   **Cons**:
    *   First-time run requires loading a ~70MB WebAssembly AI model (subsequent loads are cached in browser storage).

### Option 2: Server-side Background Removal via Third-Party API (e.g. Remove.bg / Photoroom)
Send images to a backend controller, which forwards it to a third-party Background Removal API.
*   **Pros**:
    *   Extremely lightweight for the client browser.
    *   Very fast execution.
*   **Cons**:
    *   Requires registering and paying for API keys (e.g. remove.bg is limited to 50 free credits per month).
    *   Data leaves the platform.

> [!TIP]
> **Recommendation**: We recommend **Option 1 (Client-side WASM)**. It fits the "Hundred Tools" philosophy of serverless-style file utilities perfectly, and keeps hosting costs at zero.

---

## Proposed Changes

To implement **Option 1 (Client-side)**, we will modify/add the following files:

### Client

#### [MODIFY] [package.json](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/client/package.json)
Install `@imgly/background-removal` dependency.

#### [NEW] [RemoveBackground.jsx](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/client/src/components/tools/images/RemoveBackground.jsx)
Create a new component that:
1. Renders the user-friendly upload interface using `FileUploadImage`.
2. Handles the background removal asynchronously using the `@imgly` package.
3. Shows a loading bar / custom spinner with status messages ("Loading AI model...", "Removing background...").
4. Generates the final output for download.

#### [MODIFY] [AppRoutes.jsx](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/client/src/routes/AppRoutes.jsx)
1. Import `RemoveBackground`.
2. Add a route for `tools/image/remove-bg` pointing to this component.

#### [MODIFY] [ToolsPage.jsx](file:///c:/Users/yashc/OneDrive/Desktop/Hundred%20Tools/client/src/pages/ToolsPage.jsx)
Add the "Remove Background" tool metadata to `toolsByCategory.image` and `toolsByCategory.all` arrays so it displays on the category list.

---

## Step-by-Step Implementation Plan

1. **Install Library**:
   * Run `npm install @imgly/background-removal` inside the `client/` folder.
2. **Configure Router**:
   * Register the `tools/image/remove-bg` route inside `AppRoutes.jsx`.
3. **Update Category Lists**:
   * Add the Background Remover entry to the category lists inside `ToolsPage.jsx` so it is discoverable.
4. **Develop Component**:
   * Create `RemoveBackground.jsx` under `client/src/components/tools/images/`.
   * Implement status messages to show progress (e.g., "Downloading AI Model (first time only)..." or "Processing image...").
   * Handle the image file state and trigger `removeBackground(file)`.
   * Offer the download action when processing is finished.
5. **Verify**:
   * Run the client locally, upload a photo, confirm that the background is successfully removed, and verify it downloads correctly.

---

## Verification Plan

### Manual Verification
1. Open the app at `http://localhost:5173`.
2. Go to the image tools section or navigate directly to `/tools/image/remove-bg`.
3. Upload an image (e.g., a portrait photo).
4. Monitor the console and progress text as the AI models load and process the image.
5. Verify that the output image is transparent and only contains the subject.
6. Click "Download" and confirm the PNG is successfully downloaded.
