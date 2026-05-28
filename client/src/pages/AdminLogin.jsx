import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const cleanInput = (value) =>
    value.replace(/\s+/g, "").trim();

  const handleLogin = (e) => {

    e.preventDefault();

    // ADMIN LOGIN

    if (

      cleanInput(email).toLowerCase() ===
        "akashk@damcogroup.com"

      &&

      cleanInput(password) ===
        "Akash@#123"

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
    <div className="page-shell">
      <form onSubmit={handleLogin} className="auth-card">
        <h1>Admin Login</h1>

        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onPaste={(e) => {
            e.preventDefault();
            setEmail(e.clipboardData.getData("text").trim());
          }}
          className="input-field"
        />

        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPaste={(e) => {
            e.preventDefault();
            setPassword(e.clipboardData.getData("text").trim());
          }}
          className="input-field"
        />

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
    </div>
  );
}