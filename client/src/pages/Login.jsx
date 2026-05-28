import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const baseURL =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "");

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // REGISTER

      if (isRegister) {

        await axios.post(

          `${baseURL}/api/auth/register`,

          {
            name,
            email,
            password
          }
        );

        alert("Registration Successful");

        setIsRegister(false);

      } else {

        // LOGIN

        const res = await axios.post(

          `${baseURL}/api/auth/login`,

          {
            email,
            password
          }
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        navigate("/dashboard");
      }

    } catch (error) {

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="page-shell">
      <form onSubmit={handleSubmit} className="auth-card">
        <h1>{isRegister ? "Create Account" : "Login"}</h1>

        {isRegister && (
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onPaste={(e) => setName(e.clipboardData.getData("text"))}
            className="input-field"
          />
        )}

        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Email"
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
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          className="secondary-link"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Create Account"}
        </p>
      </form>
    </div>
  );
}