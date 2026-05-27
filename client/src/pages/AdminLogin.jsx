import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");






  const handleLogin = (e) => {

    e.preventDefault();




    // ADMIN LOGIN
    if (

      email === "admin@gmail.com" &&

      password === "admin123"

    ) {

      localStorage.setItem(
        "admin",
        "true"
      );

      navigate("/admin");

    }

    else {

      alert(
        "Invalid Admin Credentials"
      );
    }
  };








  return (

    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <form
        onSubmit={handleLogin}
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          color: "white"
        }}
      >

        <h1>
          Admin Login
        </h1>

        <br />






        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />






        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />






        <button
          type="submit"
          style={buttonStyle}
        >
          Login
        </button>

      </form>

    </div>
  );
}






const inputStyle = {

  width: "100%",

  padding: "12px",

  marginBottom: "15px",

  borderRadius: "10px",

  border: "none"
};




const buttonStyle = {

  width: "100%",

  padding: "12px",

  background: "#10b981",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer"
};