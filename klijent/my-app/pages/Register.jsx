import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    year: "",
  });

  const navigate = useNavigate();

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
      toast.warn("Greška kod registracije!");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <div className="row">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit">Registruj se</Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
