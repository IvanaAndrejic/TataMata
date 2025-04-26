import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cleanupComponentStyles } from '../src/js/styleCleaner';
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    year: "",
  });

  const navigate = useNavigate();

  const recaptchaRef = useRef(null);


  useEffect(() => {

    cleanupComponentStyles(['register']); //Čisti stilove da ne bi dolazilo do mešanja

    const registerStyle = document.createElement("style");
    registerStyle.setAttribute("data-component-style", "register"); //BITNO!

    registerStyle.innerHTML = `
      body {
        font-family: "Lexend", sans-serif; 
      }

      .register-container {
        width: 25rem;
        max-width: 62.5rem;
        min-width: 20rem;
        padding-top: 0.5rem;
        padding-bottom: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        text-align: center;
        margin: 0 auto;
        margin-top: 0.5rem;
        background: #f3f4f8;
        overflow: visible;
        min-height: 30rem; 
      }

      .register-title {
        color: #FDC840;
        margin-top: 1rem;
        margin-bottom: 1rem;
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
        margin-top: 1rem;
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

    const recaptchaValue = recaptchaRef.current.getValue();
    console.log("ReCAPTCHA Token:", recaptchaValue); // Dodaj ovu liniju

    if (!recaptchaValue) {
      toast.error("Molimo Vas da potvrdite da niste robot.");
      return;
    }  

    if (
          isNaN(userData.year) ||
          userData.year < 1930 ||
          userData.year > new Date().getFullYear()
    ) {
      toast.error("Neispravan unos godine!");
      return;
    }

    try {
      const payload = {
        ...userData,
        recaptchaToken: recaptchaValue, 
      };

      await axios.post("http://localhost:5000/api/auth/register", payload);
      toast.success("Uspešna registracija!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Greška kod registracije!");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title mt-1">Unesite podatke</h2>
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
            <Form.Label className="mt-1 register-label">Password</Form.Label>
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
            <Form.Label className="mt-1 register-label">Name</Form.Label>
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
            <Form.Label className="mt-1 register-label">Year</Form.Label>
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
          <div className="mt-3 d-flex justify-content-center" style={{ minHeight: "5rem" }}>
            <ReCAPTCHA
              sitekey="6LchlyIrAAAAAM0DIIzNOQRZKahUXiW39e5FbxY7"
              ref={recaptchaRef}
            />
          </div>
          <Button type="submit" className="register-btn" variant="warning">
            Registruj se
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
