import { useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../../styles/resume.css";

export default function ResumeBuilder() {

  const resumeRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    objective: "",
    skills: "",
    projects: ""
  });

  const [photo, setPhoto] = useState(null);

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoto = (e) => {

    const file = e.target.files[0];

    if (file) {

      setPhoto(URL.createObjectURL(file));
    }
  };

  const generateResume = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/resume/generate",
        form
      );

      setResult(res.data.result);

    } catch (err) {

      console.log(err);

      alert("Failed");

    } finally {

      setLoading(false);
    }
  };

  const downloadPDF = async () => {

    const element = resumeRef.current;

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    const imgWidth = 190;

    const pageHeight = 295;

    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    while (heightLeft >= 0) {

      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        10,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;
    }

    pdf.save("resume.pdf");
  };

  return (

    <div className="resume-page">

      <div className="resume-form">

        <h1>AI Resume Builder</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          onChange={handleChange}
        />

        <textarea
          name="objective"
          placeholder="Career Objective"
          rows="4"
          onChange={handleChange}
        />

        <textarea
          name="skills"
          placeholder="Skills"
          rows="4"
          onChange={handleChange}
        />

        <textarea
          name="projects"
          placeholder="Projects"
          rows="4"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handlePhoto}
        />

        <button onClick={generateResume}>
          {
            loading
              ? "Generating..."
              : "Generate Resume"
          }
        </button>

      </div>
<div
  className="resume-preview classic-resume"
  ref={resumeRef}
>

  <div className="resume-header">

    {
      photo && (
        <img
          src={photo}
          alt="profile"
          className="profile-img"
        />
      )
    }

    <h1>
      {form.name || "YOUR NAME"}
    </h1>

    <p>
      {form.email}
      {" | "}
      {form.phone}
    </p>

    <p>
      {form.linkedin}
    </p>

  </div>

  <hr />

  <div className="resume-section">

    <h2>OBJECTIVE</h2>

    <p>
      {form.objective}
    </p>

  </div>

  <div className="resume-section">

    <h2>SKILLS</h2>

    <ul>
      {
        form.skills
          .split(",")
          .map((skill, index) => (

            <li key={index}>
              {skill}
            </li>
          ))
      }
    </ul>

  </div>

  <div className="resume-section">

    <h2>PROJECTS</h2>

    <p>
      {form.projects}
    </p>

  </div>

  <div className="resume-section">

    <h2>PROFESSIONAL SUMMARY</h2>

    <div className="ai-result">
      {result.replace(/\*\*/g, "")}
    </div>

  </div>

  {
    result && (

      <button
        className="download-btn"
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    )
  }

</div>

    </div>
  );
}