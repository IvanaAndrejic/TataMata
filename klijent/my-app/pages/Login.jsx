import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { cleanupComponentStyles } from '../src/js/styleCleaner';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    cleanupComponentStyles(['login']); //Čisti stilove

    const loginStyle = document.createElement("style");
    loginStyle.setAttribute("data-component-style", "login"); 

    loginStyle.innerHTML = `
      #login-page {
        width: 500px;
        max-width: 1000px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px #0D1E49;
        text-align: center;
        margin: 0 auto;
        margin-top: 10px;
        background: #f3f4f8;
      }

      #login-page .login-title {
        color: #FDC840;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        font-size: 2rem;
        font-weight: bold;
      }

      #login-page .login-form {
        margin-top: 20px;
      }

      #login-page .login-form-group {
        margin-bottom: 15px;
      }

      #login-page .login-label {
        font-weight: bold;
        color: #0d1e49;
      }

      #login-page .login-control {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-top: 10px;
      }

      #login-page .login-btn {
        margin-top: 1rem;
        background-color: #FDC840 !important;
        border-color: #FDC840 !important;
        font-size: 1rem;
        cursor: pointer;
      }

      #login-page .login-btn:hover {
        background-color: #f0a500 !important;
        border-color: #f0a500 !important;
      }
    `;
    document.head.appendChild(loginStyle);

    return () => {
      document.head.removeChild(loginStyle);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      login(res.data.user, res.data.token);

      axios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      toast.success(`Korisnik ${res.data.user.name} je ulogovan!`, {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/");

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warn(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.warn("Greška prilikom logovanja!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div id="login-page">
      <h2 className="login-title">Unesite podatke</h2>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Group className="login-form-group display-flex justify-content-center">
          <Form.Label className="login-label">Email</Form.Label>
          <Form.Control
            className="login-control"
            type="email"
            value={email}
            style={{
              width: "80%",
              margin: "0 auto",
              display: "block",
              textAlign: "center",
            }}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="login-form-group">
          <Form.Label className="login-label mt-3">Password</Form.Label>
          <Form.Control
            className="login-control"
            type="password"
            value={password}
            style={{
              width: "80%",
              margin: "0 auto",
              display: "block",
              textAlign: "center",
            }}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="login-btn" variant="warning">Uloguj se</Button>
      </Form>
    </div>
  );
};

export default Login;
