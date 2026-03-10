import "../styles/myfiles.css";

import { LuFileSliders, LuFileText } from "react-icons/lu";
import { PiImageSquare } from "react-icons/pi";
import { IoVideocamOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

function MyFiles() {
  const files = [
    {
      name: "Project_Proposal.pdf",
      type: "PDF",
      size: "2.4 MB",
      status: "Ready",
    },
    {
      name: "Product_Demo.mp4",
      type: "Video",
      size: "15.2 MB",
      status: "Processing",
    },
    {
      name: "Contract_Signed.pdf",
      type: "PDF",
      size: "890 KB",
      status: "Ready",
    },
  ];
  return (
    <div className="files-page">
      <h1>My Files</h1>
      <p className="subtitle">Manage all your converted files in one place</p>

      <div className="stats-container">
        <div className="stat-card">
          <div className="card-icon">
            <LuFileSliders />
          </div>
          <h2>5</h2>
          <p>Total Files</p>
        </div>

        <div className="stat-card">
          <div className="card-icon">
            <LuFileSliders />
          </div>
          <h2>2</h2>
          <p>PDF Files</p>
        </div>

        <div className="stat-card">
          <div className="card-icon">
            <PiImageSquare />
          </div>
          <h2>2</h2>
          <p>Images</p>
        </div>

        <div className="stat-card">
          <div className="card-icon">
            <IoVideocamOutline />
          </div>
          <h2>1</h2>
          <p>Videos</p>
        </div>
      </div>

      <div className="search-box">
        <FiSearch className="search-icon" />

        <input type="text" placeholder="Search files..." />
      </div>

      <table className="files-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {files.map(function (file, index) {
            let icon;

            if (file.type === "PDF") {
              icon = <LuFileText />;
            } else if (file.type === "Image") {
              icon = <PiImageSquare />;
            } else {
              icon = <IoVideocamOutline />;
            }

            return (
              <tr key={index} className="file-row">
                <td className="file-name">
                  <span className="file-icon">{icon}</span>
                  {file.name}
                </td>

                <td>
                  <span className={"type " + file.type.toLowerCase()}>
                    {file.type}
                  </span>
                </td>

                <td>{file.size}</td>

                <td>
                  <span className={"status " + file.status.toLowerCase()}>
                    {file.status}
                  </span>
                </td>

                <td className="actions">
                  <FiDownload className="download-icon" />
                  <FiTrash2 className="delete-icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyFiles;