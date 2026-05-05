import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadImage from "../../common/FileUploadImage";
import Features from "../../common/Features";
import { cropImageAPI } from "../../../services/imageService";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "../../../styles/tool.css";
import { useError } from "../../../context/ErrorContext";

function CropImage() {

  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [processComplete, setProcessComplete] = useState(false);
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
   const { showError } = useError();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 0,
    y: 0,
    width: 200,
    height: 200
  });

  // show uploaded image in crop area
  useEffect(() => {

    if (files.length > 0) {

      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result);
      };

      reader.readAsDataURL(files[0]);

    }

  }, [files]);



  const handleCrop = async () => {

    if (files.length === 0) {
     showError("Upload an image first!");
      return;
    }

    try {

      const cropData = {
        x: crop.x,
        y: crop.y,
        width: crop.width,
        height: crop.height
      };

      const blob = await cropImageAPI(files, cropData, (p) => setUploadProgress(p));

      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setProcessComplete(true);

      setFileName("Nexora_cropImage.jpg");

    } catch (error) {

      console.error(error);
      showError("Error cropping image");

    }
  };


  const resetTool = () => {

    setFiles([]);
    setDownloadUrl(null);
    setProcessComplete(false);
    setFileName("");
    setImageSrc(null);
    setUploadProgress(0);

  };


  return (

    <div className="tool-page">

      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <h1>Crop Image</h1>
      <p className="subtitle">
        Select an area of the image to crop
      </p>


      {/* Crop UI */}

      {imageSrc && !processComplete && (

        <div className="crop-container">

          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
          >

            <img src={imageSrc} alt="crop preview" />

          </ReactCrop>

        </div>

      )}


      <FileUploadImage
        accept="image/*"
        maxFiles={1}
        files={files}
        setFiles={setFiles}
        onProcess={handleCrop}
        processComplete={processComplete}
        downloadUrl={downloadUrl}
        outputFileName={fileName}
        processLabel="Crop Image"
        successMessage="Cropped successfully!!!"
        onReset={resetTool}
        processing={processComplete ? false : uploadProgress > 0}
        uploadProgress={uploadProgress}
      />

      <Features />

    </div>

  );
}

export default CropImage;