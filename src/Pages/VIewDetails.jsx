import React from "react";
import "../App.css";
export default function VIewDetails({ tempdata }) {
  console.log(tempdata);
  return (
    <div style={{ marginTop: "5%" }}>
      <h1>view details</h1>
      <h1>{tempdata.Auther}</h1>
      <div className="bodyview">
        <p className="" style={{ width: "100%" }}>
          {tempdata.body}
        </p>
      </div>
    </div>
  );
}
