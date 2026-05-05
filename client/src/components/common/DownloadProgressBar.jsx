import "../../styles/downloadProgress.css";

function DownloadProgressBar({ progress, isDownloading }) {
  if (!isDownloading && progress === 0) return null;

  return (
    <div className="download-progress-wrap" role="status" aria-live="polite">
      <div className="download-progress-container">
        <p className="download-progress-label">Downloading...</p>
        <div className="download-progress-bar">
          <span 
            className="download-progress-fill" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <p className="download-progress-percent">{progress}%</p>
      </div>
    </div>
  );
}

export default DownloadProgressBar;
