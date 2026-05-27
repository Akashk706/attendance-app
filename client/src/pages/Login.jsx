import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

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

          "https://attendance-backend-32mo.onrender.com/api/auth/register",

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

          "https://attendance-backend-32mo.onrender.com/api/auth/login",

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

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9"
      }}
    >

      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          boxShadow:
            "0 0 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >

          {

            isRegister
            ? "Create Account"
            : "Login"

          }

        </h1>

        {

          isRegister && (

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px"
              }}
            />

          )
        }

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
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
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >

          {

            isRegister
            ? "Register"
            : "Login"

          }

        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            cursor: "pointer",
            color: "blue"
          }}
          onClick={() =>
            setIsRegister(!isRegister)
          }
        >

          {

            isRegister
            ? "Already have account?"
            : "Create Account"

          }

        </p>

      </form>

    </div>
  );
}