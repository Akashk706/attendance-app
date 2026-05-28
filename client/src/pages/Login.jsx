import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  // Backend URL
  const baseURL =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://attendance-backend-32mo.onrender.com");

  // States
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // Submit Function
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

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login Successful");

        navigate("/dashboard");
      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    <div className="page-shell">

      <form
        onSubmit={handleSubmit}
        className="auth-card"
      >

        <h1>
          {isRegister ? "Create Account" : "Login"}
        </h1>

        {/* REGISTER NAME FIELD */}
        {isRegister && (

          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="primary-btn"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* TOGGLE LOGIN/REGISTER */}
        <p
          className="secondary-link"
          onClick={() => setIsRegister(!isRegister)}
          style={{
            cursor: "pointer",
            marginTop: "10px"
          }}
        >

          {isRegister
            ? "Already have an account? Login"
            : "Create Account"}

        </p>

      </form>

    </div>
  );
}