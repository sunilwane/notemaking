import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Themecontext } from "./privateRoute/Contextapi";

export default function Login() {
  const [loginuser, setLoginUser] = useState({
    email: "",
    pass: "",
  });
  const navigte = useNavigate();

  const { login } = useContext(Themecontext);
  const handlechanges = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginuser, [name]: value });
  };

  const handlesubmit = () => {
    fetch("http://localhost:8083/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginuser),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("tokenno", JSON.stringify(res.token));
        login();
        navigte("/story");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App" style={{ marginTop: "5%" }}>
      <h1>Login page</h1>
      <div className="loginp">
        <input
          onChange={handlechanges}
          name="email"
          value={loginuser.email}
          type="text"
          placeholder="email"
        />
        <input
          onChange={handlechanges}
          name="pass"
          value={loginuser.pass}
          type="password"
          placeholder="password"
        />
        <button onClick={handlesubmit} style={{ marginTop: "20px" }}>
          login
        </button>
        <p className="mt-3" style={{ marginTop: "20px" }}>
          Create New Account ?{" "}
          <Link to="/">
            <a
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Sign Up
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
