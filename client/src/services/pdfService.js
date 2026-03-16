import api from "./api";

// Merge PDF
export const mergePDF = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post("/pdf/merge", formData, {
    responseType: "blob",
  });

  return response.data;
};

// PDF to Word
export const pdfToWord = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/pdf-to-word", formData, {
    responseType: "blob",
  });

  return response.data;
};

// Add Page Numbers
export const addPageNumbers = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/add-page-numbers", formData, {
    responseType: "blob",
  });

  return response.data;
};

// Word to PDF
export const wordToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/word-to-pdf", formData, {
    responseType: "blob",
  });

  return response.data;
};

// PDF to JPG
export const convertPdfToJpg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/pdf-to-jpg", formData, {
    responseType: "blob",
  });

  return response.data;
};

// Add Watermark
export const addWatermark = async (file, text) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("text", text);

  const response = await api.post("/pdf/add-watermark", formData, {
    responseType: "blob",
  });

  return response.data;
};

// JPG to PDF
export const convertJpgToPdf = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post("/pdf/jpg-to-pdf", formData, {
    responseType: "blob",
  });

  return response.data;
};