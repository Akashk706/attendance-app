import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] =
    useState('');

  const handleSubmit = async () => {

    try {

      if (isRegister) {

        await axios.post(
          'http://localhost:5000/api/auth/register',
          {
            name,
            email,
            password
          }
        );

        alert('Registration Successful');

      } else {

        const res = await axios.post(
          'http://localhost:5000/api/auth/login',
          {
            email,
            password
          }
        );

        localStorage.setItem(
          'user',
          JSON.stringify(res.data.user)
        );

        navigate('/dashboard');
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        'Something went wrong'
      );

    }
  };

  return (

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f5f5f5'
      }}
    >

      <div
        style={{
          width: '350px',
          padding: '20px',
          background: 'white',
          borderRadius: '10px',
          boxShadow:
            '0 0 10px rgba(0,0,0,0.1)'
        }}
      >

        <h2>
          {isRegister
            ? 'Register'
            : 'Login'}
        </h2>

        {isRegister && (

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

        )}

        <input
          type="email"
          placeholder="Email"
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
          onClick={handleSubmit}
          style={buttonStyle}
        >
          {isRegister
            ? 'Register'
            : 'Login'}
        </button>

        <p
          onClick={() =>
            setIsRegister(!isRegister)
          }
          style={{
            marginTop: '15px',
            cursor: 'pointer',
            color: 'blue'
          }}
        >
          {isRegister
            ? 'Already have an account? Login'
            : 'Create Account'}
        </p>

      </div>

    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '10px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '15px',
  background: 'black',
  color: 'white',
  border: 'none',
  cursor: 'pointer'
};