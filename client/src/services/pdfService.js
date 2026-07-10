import api from "./api";

// Merge PDF
export const mergePDF = async (files) => {
  return await mergePDFWithProgress(files);
};

export const mergePDFWithProgress = async (files, onUploadProgress) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post("/pdf/merge", formData, {
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

// PDF to Word
export const pdfToWord = async (file) => {
  return await pdfToWordWithProgress(file);
};

export const pdfToWordWithProgress = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/pdf/pdf-to-word", formData, {
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

// Add Page Numbers
export const addPageNumbers = async (
  file,
  position = "bottom-center"
) => {
  return await addPageNumbersWithProgress(file, position);
};

export const addPageNumbersWithProgress = async (
  file,
  position = "bottom-center",
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("position", position);

  const response = await api.post(
    "/pdf/add-page-numbers",
    formData,
    {
      responseType: "blob",
      headers: { "Content-Type": "multipart/form-data" },
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

// Word to PDF
export const wordToPdf = async (file) => {
  return await wordToPdfWithProgress(file);
};

export const wordToPdfWithProgress = async (
  file,
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/pdf/word-to-pdf", formData, {
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

// PDF to JPG
export const convertPdfToJpg = async (file) => {
  return await convertPdfToJpgWithProgress(file);
};

export const convertPdfToJpgWithProgress = async (
  file,
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/pdf/pdf-to-jpg", formData, {
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

// Add Watermark
export const addWatermark = async (file, text) => {
  return await addWatermarkWithProgress(file, text);
};

export const addWatermarkWithProgress = async (
  file,
  text,
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("text", text);

  const response = await api.post("/pdf/add-watermark", formData, {
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

// JPG to PDF
export const convertJpgToPdf = async (files) => {
  return await convertJpgToPdfWithProgress(files);
};

export const convertJpgToPdfWithProgress = async (
  files,
  onUploadProgress
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post("/pdf/jpg-to-pdf", formData, {
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

// Split PDF
export const splitPDF = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/pdf/split", formData, {
    responseType: "blob",
  });

  return response.data;
};

// Compress PDF
export const compressPDF = async (file) => {
  return await compressPDFWithProgress(file);
};

export const compressPDFWithProgress = async (
  file,
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/pdf/compress", formData, {
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
