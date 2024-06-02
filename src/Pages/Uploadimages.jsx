import React, { useState } from "react";
import "../App.css";
export default function Uploadimages() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
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
    </div>
  );
}
