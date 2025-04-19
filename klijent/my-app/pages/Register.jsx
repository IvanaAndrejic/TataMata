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
      toast.error(error.response?.data?.message || "Greška kod registracije!");
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
      <h2 className="mt-2 mb-4" style={{color:'#FDC840'}}>Registracija novih korisnika</h2>
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
          <Button type="submit" className="mt-4" variant="warning">Registruj se</Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
