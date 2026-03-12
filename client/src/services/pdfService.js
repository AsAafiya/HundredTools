// Merge PDF :

import api from "./api";

export const mergePDF = async (files) => {

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post("/pdf/merge", formData, {
    responseType: "blob"
  });

  return response.data;
};


// Pdf to Word:
export const pdfToWord = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/pdf-to-word", formData, {
    responseType: "blob"
  });

  return response.data;
};

//Word to PDF:
export const wordToPdf = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/word-to-pdf", formData, {
    responseType: "blob"
  });

  return response.data;
};

//Add Watermark:
export const addWatermark = async (file, text) => {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("text", text);

  const response = await api.post("/pdf/add-watermark", formData, {
    responseType: "blob"
  });

  return response.data;
};