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
import GrammarChecker from "../components/tools/GrammerChecker";
import PromptBuilder from "../components/tools/PromptBuilder";
import InvoiceGenerator from "../components/tools/InvoiceGenerator";
import NotFound from "../pages/NotFound";

import ResumeBuilder from "../components/tools/ResumeBuilder";

import MergePdf from "../components/tools/MergePdf";
import SplitPdf from "../components/tools/SplitPdf";
import CompressPdf from "../components/tools/CompressPdf";
import PdfToJpg from "../components/tools/PdfToJpg";
import JpgToPdf from "../components/tools/JpgToPdf";
import AddPageNumbers from "../components/tools/AddPageNumbers";
import PdfToWord from "../components/tools/PdfToWord";
import WordToPdf from "../components/tools/WordToPdf";
import AddWatermark from "../components/tools/AddWatermark";

import CompressImage from "../components/tools/images/CompressImage";
import ResizeImage from "../components/tools/images/ResizeImage";
import ConvertImage from "../components/tools/images/ConvertImage";
import CropImage from "../components/tools/images/CropImage";

import ScrollToTop from "../components/common/ScrollToTop";

import LoanCalculator from "../components/tools/LoanCalculator";
import GoogleAnalytics from "../components/common/GoogleAnalytics";
import PdfToWord from "../components/tools/PdfToWord";
import WordToPdf from "../components/tools/WordToPdf";
import AddWatermark from "../components/tools/AddWatermark";

import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import Users from "../admin/pages/Users";
import Files from "../admin/pages/Files";
import Analytics from "../admin/pages/Analytics";
import Settings from "../admin/pages/Settings";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <GoogleAnalytics />

      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* PDF Tools */}
          <Route path="tools/merge-pdf" element={<MergePdf />} />
          <Route path="tools/split-pdf" element={<SplitPdf />} />
          <Route path="tools/compress-pdf" element={<CompressPdf />} />
          <Route path="tools/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="tools/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="tools/add-page-numbers" element={<AddPageNumbers />} />
          <Route path="tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="tools/word-to-pdf" element={<WordToPdf />} />
          <Route path="tools/add-watermark" element={<AddWatermark />} />

          {/* Image Tools */}
          <Route
            path="tools/image/compress-image"
            element={<CompressImage />}
          />
          <Route path="tools/image/resize-image" element={<ResizeImage />} />
          <Route path="tools/image/convert-image" element={<ConvertImage />} />
          <Route path="tools/image/crop-image" element={<CropImage />} />

          {/* Resume Builder */}
          <Route path="resume-builder" element={<ResumeBuilder />} />

          {/* Grammar Tools */}
          <Route
            path="tools/text/grammar-checker"
            element={<GrammarChecker />}
          />
          <Route path="grammar-checker" element={<GrammarChecker />} />

          <Route path="/prompt-builder" element={<PromptBuilder />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />

          {/* Finance Tools */}
          <Route path="tools/loan-calculator" element={<LoanCalculator />} />
<Route
  path="tools/invoice-generator"
  element={<InvoiceGenerator />}
/>
<Route
  path="/invoice-generator"
  element={<InvoiceGenerator />}
/>
          {/* Category Page */}
          <Route path="tools/:category" element={<ToolsPage />} />

          {/* Other Pages */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="my-files" element={<MyFiles />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="files" element={<Files />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
