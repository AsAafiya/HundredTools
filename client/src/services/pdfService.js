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