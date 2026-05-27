import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    // ADMIN LOGIN

    if (

      email.trim() ===
        "akashk@damcogroup.com"

      &&

      password.trim() ===
        "Akash@123"

    ) {

      localStorage.setItem(
        "admin",
        "true"
      );

      navigate("/admin");

    } else {

      alert("Invalid Credentials");
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "#020617"
      }}
    >

      <form
        onSubmit={handleLogin}
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "20px",
          width: "400px"
        }}
      >

        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

      </form>

    </div>
  );
}