import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/logo/logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./styles.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Load stored email and password on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email: email,
          password: password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      // Save email and password to localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      navigate("/"); // Navigate to the desired page after successful authentication
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setEmailError(true);
        setPasswordError(true);
      } else {
        console.error("Authentication failed:", error.response.data.error);
      }
    }
  };

  return (
    <>
      <div className="containerLogin">
        <div className="form">
          <h1
            style={{
              width: "100%",
              fontWeight: "bold",
              fontSize: "30px",
              marginLeft: "100px",
              marginBottom: "40px",
            }}
          >
            Login
          </h1>
          <img style={{ marginBottom: "40px", width: "90px" }} src={Logo} />
          <h1
            style={{
              fontWeight: "lighter",
              fontSize: "33px",
              marginBottom: "40px",
            }}
          >
            DWS
          </h1>
          <input
            type="email"
            placeholder="Digite o seu email!"
            style={{
              width: "220px",
              border: emailError ? "3px solid red" : "3px solid white",
              borderRadius: "10px",
              padding: "10px",
              color: "white",
              backgroundColor: "transparent",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ height: "30px" }}></div>
          <div style={{ position: "relative" }}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Digite a sua password!"
              style={{
                width: "190px",
                border: passwordError ? "3px solid red" : "3px solid white",
                borderRadius: "10px",
                padding: "10px",
                color: "white",
                backgroundColor: "transparent",
                paddingRight: "40px",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordVisible ? (
              <VisibilityOffIcon
                onClick={() => setPasswordVisible(false)}
                style={{
                  color: "white",
                  cursor: "pointer",
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              />
            ) : (
              <VisibilityIcon
                onClick={() => setPasswordVisible(true)}
                style={{
                  color: "white",
                  cursor: "pointer",
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </div>
          <div style={{ height: "30px" }}></div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleLogin}
          >
            Login
          </button>
          {passwordError && (
            <p style={{ color: "red" }}>Credenciais Não Encontradas</p>
          )}
          <p
            style={{
              fontSize: "10px",
              paddingBottom: "4px",
              alignSelf: "flex-end",
              display: "flex",
              width: "100%",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Proj4 2022/2023 IPVC-ESTG
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
