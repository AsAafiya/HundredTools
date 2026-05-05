import api from "./api";

export const compressImageAPI = async (files, quality, onUploadProgress) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("level", quality); // IMPORTANT

  const response = await api.post(`/image/compress`, formData, {
    responseType: "blob",
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onUploadProgress && e.lengthComputable) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onUploadProgress(percent);
      }
    },
  });

  return response.data;
};

//resize tool

export const resizeImageAPI = async (files, width, height, onUploadProgress) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("width", width);
  formData.append("height", height);

  const response = await api.post(`/image/resize`, formData, {
    responseType: "blob",
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onUploadProgress && e.lengthComputable) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onUploadProgress(percent);
      }
    },
  });

  return response.data;
};


//crop tool
export const cropImageAPI = async (files, cropData, onUploadProgress) => {
  const formData = new FormData();

  for (let file of files) {
    formData.append("file", file);
  }

  formData.append("x", cropData.x);
  formData.append("y", cropData.y);
  formData.append("width", cropData.width);
  formData.append("height", cropData.height);

  const response = await api.post(`/image/crop`, formData, {
    responseType: "blob",
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onUploadProgress && e.lengthComputable) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onUploadProgress(percent);
      }
    },
  });

  return response.data;
};

//convert tool
export const convertImageAPI = async (files, format, onUploadProgress) => {
  const formData = new FormData();

  for (let file of files) {
    formData.append("file", file);
  }

  formData.append("format", format);

  const response = await api.post(`/image/convert`, formData, {
    responseType: "blob",
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onUploadProgress && e.lengthComputable) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onUploadProgress(percent);
      }
    },
  });

  return response.data;
};