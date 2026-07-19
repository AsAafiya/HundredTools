import api from "./api";

export const transcribeAudio = async (audioBlob, onUploadProgress) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "speech.webm");

  const response = await api.post("/speech/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      if (onUploadProgress && event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onUploadProgress(percent);
      }
    },
  });

  return response.data;
};
