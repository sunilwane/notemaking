import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Createnotes() {
  const tokenvalue = JSON.parse(localStorage.getItem("tokenno"));
  const [createnotes, setCreateNotes] = useState({
    title: "",
    body: "",
    category: "",
  });
  const navigate = useNavigate();
  const handlechanges = (e) => {
    const { name, value } = e.target;

    setCreateNotes({ ...createnotes, [name]: value });
  };

  const handleclick = () => {
    fetch("http://localhost:8083/notes/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Barrer ${tokenvalue}`,
      },
      body: JSON.stringify(createnotes),
    })
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: `New story Added`,
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/notespage");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ marginTop: "5%" }}>
      <h1>create notes </h1>

      <div className="loginp">
        <h3>New Story</h3>
        <input
          onChange={handlechanges}
          type="text"
          placeholder="title"
          name="title"
          value={createnotes.title}
        />
        <textarea
          onChange={handlechanges}
          className="txtar"
          type="text"
          name="body"
          placeholder="body"
          value={createnotes.body}
        />
        <input
          onChange={handlechanges}
          type="text"
          placeholder="category"
          name="category"
          value={createnotes.category}
        />
        <button
          onClick={handleclick}
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          add notes
        </button>
      </div>
    </div>
  );
}
