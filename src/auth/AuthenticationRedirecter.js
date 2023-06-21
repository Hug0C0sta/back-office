import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthenticationRedirecter = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  if (token === undefined) {
    return "Loading...";
  }
  if (token === null) {
    return <Navigate to="/login" />;
  }
  return children;
};
