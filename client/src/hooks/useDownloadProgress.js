import { useState, useCallback } from "react";

export const useDownloadProgress = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadWithProgress = useCallback((downloadUrl, fileName, onComplete) => {
    if (!downloadUrl) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    const triggerDownload = (url) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    if (downloadUrl.startsWith("blob:") || downloadUrl.startsWith("data:")) {
      triggerDownload(downloadUrl);
      setDownloadProgress(100);
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
        if (onComplete) onComplete();
      }, 300);
      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setDownloadProgress(Math.round(percentComplete));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const blob = xhr.response;
        const url = window.URL.createObjectURL(blob);

        triggerDownload(url);
        window.URL.revokeObjectURL(url);

        setDownloadProgress(100);
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
          if (onComplete) onComplete();
        }, 300);
      } else {
        setIsDownloading(false);
        setDownloadProgress(0);
        console.error("Download failed", xhr.status, xhr.statusText);
      }
    });

    xhr.addEventListener("error", () => {
      setIsDownloading(false);
      setDownloadProgress(0);
      console.error("Download failed");
    });

    xhr.open("GET", downloadUrl);
    xhr.responseType = "blob";
    xhr.send();
  }, []);

  return {
    downloadProgress,
    isDownloading,
    downloadWithProgress,
    resetProgress: () => {
      setDownloadProgress(0);
      setIsDownloading(false);
    },
  };
};
