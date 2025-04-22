import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cleanupComponentStyles } from '../src/js/styleCleaner';

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    year: "",
  });

  const navigate = useNavigate();

  useEffect(() => {

    cleanupComponentStyles(['register']); //Čisti stilove da ne bi dolazilo do mešanja

    const registerStyle = document.createElement("style");
    registerStyle.setAttribute("data-component-style", "register"); //BITNO!

    registerStyle.innerHTML = `
      .register-container {
        width: 31.25rem;
        max-width: 62.5rem;
        padding: 1.25rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        text-align: center;
        margin: 0 auto;
        margin-top: 0.625rem;
        background: #f3f4f8;
      }

      .register-title {
        color: #FDC840;
        margin-top: 2rem;
        margin-bottom: 1.5rem;
        font-weight: bold;
      }

      .register-btn {
        margin-top: 1rem;
        background-color: #FDC840;
        border-color: #FDC840;
      }

      .register-btn:hover {
        background-color: #f0a500 !important;
        border-color: #f0a500 !important;
      }

      .register-label {
        font-weight: bold;
        color: #0D1E49;
        margin-top: 1.5rem;
      }

      body, main {
        margin: 0;
        padding: 0;
      }

      main {
        padding-top: 5rem; /* Prilagođavanje paddinga */
      }
    `;
    document.head.appendChild(registerStyle);

    return () => {
      document.head.removeChild(registerStyle);
    };
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
          isNaN(userData.year) ||
          userData.year < 1930 ||
          userData.year > new Date().getFullYear()
    ) {
      toast.error("Neispravan unos godine!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", userData);
      toast.success("Uspešna registracija!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Greška kod registracije!");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title mt-3">Registracija novih korisnika</h2>
      <div className="row">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="display-flex justify-content-center">
            <Form.Label className="register-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              style={{
                width: "80%",
                margin: "0 auto",
                display: "block",
                textAlign: "center",
                marginBottom: "0.8rem"
              }}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2 register-label">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              style={{
                width: "80%",
                margin: "0 auto",
                display: "block",
                textAlign: "center",
                marginBottom: "0.8rem"
              }}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2 register-label">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              style={{
                width: "80%",
                margin: "0 auto",
                display: "block",
                textAlign: "center",
                marginBottom: "0.8rem"
              }}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2 register-label">Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              style={{
                width: "50%",
                margin: "0 auto",
                display: "block",
                textAlign: "center",
              }}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="register-btn" variant="warning">
            Registruj se
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
