// MERGE

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


//  ADD PAGE NUMBERS
export const addPageNumbers = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/add-page-numbers", formData, {
    responseType: "blob"
  });

  return response.data;
};



//  PDF TO JPG
export const convertPdfToJpg = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/pdf-to-jpg", formData, {
    responseType: "blob"
  });

  return response.data;
};


// JPG TO PDF
export const convertJpgToPdf = async (files) => {

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post("/pdf/jpg-to-pdf", formData, {
    responseType: "blob"
  });

  return response.data;
};