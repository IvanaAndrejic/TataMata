import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Spremanje korisničkog podatka i tokena u localStorage
      login(res.data.user, res.data.token);

      // Dodavanje tokena u Authorization header za sve buduće zahteve
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
    <div className="container mb-4 mt-4" style={{
      width: '500px',
      maxWidth: '1000px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px #0D1E49', // zuti box-shadow
      textAlign: 'center',
      margin: '0 auto',
      background: '#f3f4f8'
    }}>
      <h2 className="mt-2 mb-4" style={{color:'#FDC840'}}>Unesite podatke</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-4" variant="warning">Uloguj se</Button>
      </Form>
    </div>
  );
};

export default Login;
