// import React from "react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import { Themecontext } from "./privateRoute/Contextapi";

export default function Navbar() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { show, logout } = useContext(Themecontext);
  const handleChange = (option) => {
    setSelectedOption(option);
    console.log(`Option selected:`, option);
  };
  const tokoenno = localStorage.getItem("tokenno");
  let storeitem = localStorage.getItem("tokenno");
  const [loginshow, setloginShow] = useState(() => {
    const savedItems = localStorage.getItem("cartData");
    return savedItems ? true : false;
  });
  const handleChangevalue = () => {
    logout();
    localStorage.removeItem("tokenno");
  };
  return (
    <div>
      <nav>
        <h4 style={{ color: "#303030", padding: "10px" }}>
          E-Document Locker System
        </h4>

        <ul>
          <li>
            <Link to="/story" className="contacttext">
              {" "}
              {/* <HomeIcon /> */}
              Story
            </Link>
          </li>
          {/* <li>
              <Link to="/aboutpage" className="contacttext">
                <InfoIcon /> About
              </Link>
            </li> */}
          <li>
            <Link to="/document" className="contacttext">
              {/* <LocalPostOfficeIcon />  */}
              Document
            </Link>
          </li>
          <li>
            <Link to="/images" className="contacttext">
              {/* <ShoppingCartIcon /> */}
              {/* <span className="actualdata"> {data}</span> */}
              Images
            </Link>
          </li>
          <li onClick={() => handleChangevalue()}>
            {/* <ShoppingCartIcon /> */}
            {/* <span className="actualdata"> {data}</span> */}
            {tokoenno ? "Logout" : ""}
          </li>

          {/* <button onClick={handlechange}>Sign out</button> */}
        </ul>
      </nav>
    </div>
  );
}
