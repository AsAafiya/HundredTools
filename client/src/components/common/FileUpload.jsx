
import { TbUpload } from "react-icons/tb";
import "../../styles/fileUpload.css";

function FileUpload() {

  return (
    <div className="upload-container">

      <div className="upload-card">

        <div
          className="upload-box"
        >

          <div className="upload-icon">
            <TbUpload />
          </div>

          <h3>Drag & Drop Files Here</h3>

          <p>or click to browse from your computer</p>

          <label className="upload-btn">
            Select Files
            <input
              type="file"
            />
          </label>

        </div>


      </div>

    </div>
  );
}

export default FileUpload;