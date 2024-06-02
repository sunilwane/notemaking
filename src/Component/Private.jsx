import { ThemeContext } from "@emotion/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Private(props) {
  const { show, changetheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return <>{show ? navigate("/login") : navigate("/login")}</>;
}
