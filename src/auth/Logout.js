import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token");
    setLoggedOut(true);
  }, []);

  if (loggedOut) return <Navigate to="/login" />;

  return "Logged out";
};
