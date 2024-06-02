import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Uploadpdf() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the file state
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName("");
    }
  };
  const navigate = useNavigate();
  const handleUpload = async () => {
    console.log("message");
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const token = JSON.parse(localStorage.getItem("tokenno"));
    try {
      const response = await axios.post(
        "http://localhost:8083/pdf/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Barrer ${token}`,
          },
        }
      );
      console.log("message");
      alert(response.data);
      navigate("/document   ");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };
  return (
    <>
      <div style={{ marginTop: "5%" }}>
        <h1>Upload PDF</h1>
        <input
          type="file"
          id="file-upload"
          className="input-file"
          onChange={handleFileChange}
          accept="application/pdf"
        />
        <div style={{ padding: "20px" }}>
          {" "}
          <label htmlFor="file-upload" className="upload-label">
            Choose PDF
          </label>
          {fileName && <div id="file-name">Selected file: {fileName}</div>}
          <button onClick={handleUpload} className="upload-label">
            Upload
          </button>
        </div>
      </div>
    </>
  );
}
