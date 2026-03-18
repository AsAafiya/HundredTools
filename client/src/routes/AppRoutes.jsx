import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyFiles from "../pages/MyFiles";
import Profile from "../pages/Profile";
import ToolsPage from "../pages/ToolsPage";
import About from "../pages/About";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Support from "../pages/Support";

import MergePdf from "../components/tools/MergePdf";
import SplitPdf from "../components/tools/SplitPdf";
import CompressPdf from "../components/tools/CompressPdf";
import PdfToJpg from "../components/tools/PdfToJpg";
import JpgToPdf from "../components/tools/JpgToPdf";
import AddPageNumbers from "../components/tools/AddPageNumbers";
import CompressImage from "../components/tools/images/CompressImage";
import ResizeImage from "../components/tools/images/ResizeImage";
import ConvertImage from "../components/tools/images/ConvertImage";
import CropImage from "../components/tools/images/CropImage";

import ScrollToTop from "../components/common/ScrollToTop";
import PdfToWord from "../components/tools/PdfToWord";
import WordToPdf from "../components/tools/WordToPdf";
import AddWatermark from "../components/tools/AddWatermark";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />

          {/* Individual PDF Tools */}

          <Route path="tools/merge-pdf" element={<MergePdf />} />
          <Route path="tools/split-pdf" element={<SplitPdf />} />
          <Route path="tools/compress-pdf" element={<CompressPdf />} />
          <Route path="tools/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="tools/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="tools/add-page-numbers" element={<AddPageNumbers />} />
          <Route path="tools/image/compress-image" element={<CompressImage />} />
          <Route path="tools/image/resize-image" element={<ResizeImage />} />
          <Route path="tools/image/convert-image" element={<ConvertImage />} />
          <Route path="tools/image/crop-image" element={<CropImage />} />

        <Route path="tools/pdf-to-word" element={<PdfToWord />} />
        <Route path="tools/word-to-pdf" element={<WordToPdf />} />
        <Route path="tools/add-watermark" element={<AddWatermark />} />

          {/* Category page */}
          <Route path="tools/:category" element={<ToolsPage />} />

          {/* Other pages */}

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="my-files" element={<MyFiles />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="support" element={<Support />} />

        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;