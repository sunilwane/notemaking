import React from "react";
import "../App.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
export default function VIewDetails({ tempdata, viewdata }) {
  console.log(tempdata);
  const handelclik = () => {
    viewdata();
  };
  return (
    <div style={{ marginTop: "5%" }} className="mainbody">
      <h1>view details</h1>
      <h1>{tempdata.Auther}</h1>
      <div className="bodyview">
        <p className="bodywidthdata">{tempdata.body}</p>
      </div>

      <button
        className="addimg"
        onClick={() => handelclik()}
        style={{ marginTop: "2%", cursor: "pointer" }}
      >
        Back
      </button>
      {/* </Link> */}
    </div>
  );
}
