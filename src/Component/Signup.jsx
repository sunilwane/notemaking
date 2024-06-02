import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Signup() {
  const [userdata, setUserData] = useState({
    name: "",
    mobile: "",
    email: "",
    pass: "",
  });
  const navigate = useNavigate();
  const handlehanges = (e) => {
    const { value, name } = e.target;

    setUserData({ ...userdata, [name]: value });
  };

  const handlesbt = () => {
    fetch("http://localhost:8083/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success!",
          text: `New user Registered`,
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="maincont" style={{ marginTop: "5%" }}>
      <h1>Sign up Page</h1>
      <div className="loginp">
        <input
          onChange={handlehanges}
          value={userdata.name}
          name="name"
          type="text"
          placeholder="name"
        />
        <input
          onChange={handlehanges}
          value={userdata.mobile}
          name="mobile"
          type="number"
          placeholder="mobile"
        />
        <input
          onChange={handlehanges}
          value={userdata.email}
          name="email"
          type="text"
          placeholder="email"
        />
        <input
          onChange={handlehanges}
          value={userdata.pass}
          name="pass"
          type="text"
          placeholder="password"
        />
        <button onClick={handlesbt} style={{ marginTop: "20px" }}>
          submit
        </button>
        <p className="mt-3" style={{ marginTop: "40px" }}>
          Already Have Account ?{" "}
          <Link to="/login">
            <a
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Sign in
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
