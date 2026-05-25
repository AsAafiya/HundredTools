import "../files.css";
import { FaDownload, FaTrash } from "react-icons/fa";
import { PiImageSquare } from "react-icons/pi";
import { IoVideocamOutline } from "react-icons/io5";
import { LuFileSliders} from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

function Files() {
  const files = [
    {
      name: "Project_Proposal.pdf",
      user: "John Smith",
      tool: "Merge PDF",
      size: "2.4 MB",
      status: "Completed",
      type: "pdf",
      time: "2026-03-19 10:30",
    },
    {
      name: "Marketing_Banner.png",
      user: "Sarah Johnson",
      tool: "Compress Image",
      size: "1.8 MB",
      status: "Completed",
      type: "image",
      time: "2026-03-19 10:25",
    },
    {
      name: "Product_Demo.mp4",
      user: "Mike Davis",
      tool: "Compress Video",
      size: "15.2 MB",
      status: "Processing",
      type: "video",
      time: "2026-03-19 10:20",
    },
  ];

  const getIcon = (type) => {
    if (type === "pdf") return <LuFileSliders className="file-icon pdf" />;
    if (type === "image") return <PiImageSquare className="file-icon image" />;
    if (type === "video") return < IoVideocamOutline  className="file-icon video" />;
    return <MdOutlineInsertDriveFile className="file-icon" />;
  };

  return (
    <div className="files">

      {/* HEADER */}
      <div className="files-header">
        <div>
          <h1>Files Monitoring</h1>
          <p>Track and manage all file processing activities</p>
        </div>
      </div>

      {/* STATS */}
      <div className="files-stats">
        <div className="file-card active">
          <h2>6</h2>
          <p>Total Files</p>
        </div>
        <div className="file-card">
          <h2>3</h2>
          <p>PDF Files</p>
        </div>
        <div className="file-card">
          <h2 className="green">2</h2>
          <p>Images</p>
        </div>
        <div className="file-card">
          <h2 className="orange">1</h2>
          <p>Videos</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <FiSearch />
        <input placeholder="Search files, users, or tools..." />
      </div>

      {/* TABLE */}
      <div className="file-table">

        {/* HEADER */}
        <div className="table-header">
          <span className="col-file">File Name</span>
          <span className="col-user">User</span>
          <span className="col-tool">Tool Used</span>
          <span className="col-size">Size</span>
          <span className="col-status">Status</span>
          <span className="col-actions">Actions</span>
        </div>

        {files.map((file, i) => (
          <div className="table-row" key={i}>

            {/* FILE */}
            <div className="col-file file-info">
              {getIcon(file.type)}
              <div>
                <div className="file-name">{file.name}</div>
                <div className="file-time">{file.time}</div>
              </div>
            </div>

            {/* USER */}
            <div className="col-user user-cell">
              <AiOutlineUser />
              <span>{file.user}</span>
            </div>

            {/* TOOL */}
            <div className="col-tool">
              <span className="tool-badge">{file.tool}</span>
            </div>

            {/* SIZE */}
            <div className="col-size">{file.size}</div>

            {/* STATUS */}
            <div className="col-status">
              <span className={`status ${file.status.toLowerCase()}`}>
                {file.status}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="col-actions actions">
              <FaDownload />
              <FaTrash />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Files;