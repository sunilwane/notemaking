import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Uploadimages() {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      setFileName("");
      setSelectedFile(null);
    }
  };
  const token = JSON.parse(localStorage.getItem("tokenno"));
  const navigate = useNavigate();
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:8083/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Barrer ${token}`,
              // Add any additional headers or authentication tokens if needed
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        Swal.fire({
          title: "Success!",
          text: `New Image Added`,
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/images");
        // Add any additional logic, such as displaying a success message or updating state
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error, display error message, or update state accordingly
      }
    } else {
      console.warn("No file selected.");
      // Display a warning message or handle the case when no file is selected
    }
  };
  return (
    <div style={{ marginTop: "5%" }}>
      <h1>Upload Image</h1>
      <input
        type="file"
        id="file-upload"
        className="input-file"
        onChange={handleFileChange}
        accept="image/*"
      />
      <label htmlFor="file-upload" className="upload-label">
        Choose Image
      </label>
      {fileName && <div id="file-name">Selected file: {fileName}</div>}

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
