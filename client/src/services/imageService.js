import api from "./api";

// Compress Image
export const compressImageAPI = async (
  files,
  quality,
  onUploadProgress
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("level", quality);

  const response = await api.post(
    "/image/compress",
    formData,
    {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (e) => {
        if (onUploadProgress && e.lengthComputable) {
          const percent = Math.round(
            (e.loaded * 100) / e.total
          );
          onUploadProgress(percent);
        }
      },
    }
  );

  return response.data;
};

// Resize Image
export const resizeImageAPI = async (
  files,
  width,
  height
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("width", width);
  formData.append("height", height);

  const response = await api.post(
    "/image/resize",
    formData,
    {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Crop Image
export const cropImageAPI = async (
  files,
  cropData
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("x", cropData.x);
  formData.append("y", cropData.y);
  formData.append("width", cropData.width);
  formData.append("height", cropData.height);

  const response = await api.post(
    "/image/crop",
    formData,
    {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Convert Image
export const convertImageAPI = async (
  files,
  format
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("format", format);

  const response = await api.post(
    "/image/convert",
    formData,
    {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Remove Background
export const removeBackgroundAPI = async (
  file,
  onUploadProgress
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/image/remove-background",
    formData,
    {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (e) => {
        if (onUploadProgress && e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total);
          onUploadProgress(percent);
        }
      },
    }
  );

  return response.data;
};