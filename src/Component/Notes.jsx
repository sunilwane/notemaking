import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import VIewDetails from "../Pages/VIewDetails";
import "../App.css";
export default function Notes() {
  const tokenvalue = JSON.parse(localStorage.getItem("tokenno"));
  const [notesdata, setNotesData] = useState([]);
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const getdata = async () => {
    try {
      const response = await fetch("http://localhost:8083/notes", {
        method: "GET",
        headers: {
          Authorization: `Barrer ${tokenvalue}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setNotesData(data);
    } catch (Err) {
      console.log(Err);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const handledelete = (id) => {
    fetch(`http://localhost:8083/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Barrer ${tokenvalue}`,
      },
    })
      .then((res) => {
        console.log(res);
        getdata();
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  const [temp, setTemp] = useState([]);
  const handlepage = (data) => {
    setView(!view);
    setTemp(data);
  };
  return (
    <>
      {/* <Navbar /> */}
      {view ? (
        <VIewDetails tempdata={temp} viewdata={handlepage} />
      ) : (
        <>
          <h1 style={{ marginTop: "5%" }}> Story</h1>
          <Link to="/crnotes">
            <button
              className="addbtn"
              style={{
                backgroundColor: "rgb(250, 108, 108)",
                color: "#fff",
              }}
            >
              Add Story
            </button>
          </Link>

          <div className="containe">
            {notesdata.map((curr, index) => (
              <div className="card">
                <h3>Auther : {curr.Auther}</h3>
                <h4> Title: {curr.title}</h4>
                {/* <h4> Body: {curr.body}</h4> */}
                <h4> category :{curr.category}</h4>
                <div style={{ marginRight: "70%", padding: "5px" }}>
                  <button
                    onClick={() => handlepage(curr)}
                    className="redmore"
                    style={{
                      backgroundColor: "green",
                      color: "#fff",
                      height: "45px",
                    }}
                  >
                    Read More
                  </button>
                  <button
                    onClick={() => handledelete(curr._id)}
                    style={{
                      color: "#fff",
                      height: "45px",
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
