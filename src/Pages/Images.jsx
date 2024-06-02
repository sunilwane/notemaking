import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
export default function Images() {
  const navigate = useNavigate();
  return (
    <div className="" style={{ marginTop: "5%" }}>
      <h3>Images</h3>
      <button className="addimg" onClick={() => navigate("/addimg")}>
        Add Images
      </button>
    </div>
  );
}
