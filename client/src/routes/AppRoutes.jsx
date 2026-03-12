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

import MergePdf from "../components/tools/MergePdf";
import SplitPdf from "../components/tools/SplitPdf";
import CompressPdf from "../components/tools/CompressPdf";
import PdfToJpg from "../components/tools/pdf/PdfToJpg";
import JpgToPdf from "../components/tools/pdf/JpgToPdf";
import PdfToWord from "../components/tools/pdf/PdfToWord";
import WordToPdf from "../components/tools/pdf/WordToPdf";
import RotatePDF from "../components/tools/pdf/RotatePDF";
import AddWatermark from "../components/tools/pdf/AddWatermark";

import ScrollToTop from "../components/common/ScrollToTop";

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
          <Route path="tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="tools/word-to-pdf" element={<WordToPdf />} />
          <Route path="tools/add-page-numbers" element={<RotatePDF />} />
          <Route path="tools/rotate-pdf" element={<RotatePDF />} />
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

        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;