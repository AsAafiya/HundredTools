import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyFiles from "../pages/MyFiles";
import Profile from "../pages/Profile";

import MergePdf from "../components/tools/MergePdf";
import SplitPdf from "../components/tools/SplitPdf";
import CompressPdf from "../components/tools/CompressPdf";
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

        <Route path="pdf-tools" element={<Home />} />

        <Route path="tools/merge-pdf" element={<MergePdf />} />
        <Route path="tools/split-pdf" element={<SplitPdf />} />
        <Route path="tools/compress-pdf" element={<CompressPdf />} />
        <Route path="tools/pdf-to-word" element={<PdfToWord />} />
        <Route path="tools/word-to-pdf" element={<WordToPdf />} />
        <Route path="tools/add-watermark" element={<AddWatermark />} />

        <Route path="image-tools" element={<Home />} />
        <Route path="video-tools" element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="my-files" element={<MyFiles />} />
        <Route path="profile" element={<Profile />} />

      </Route>
    </Routes>
    </>
  );
};

export default AppRoutes;