import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";




const Header = () => {

    return (
        <Nav variant="tabs" activeKey="/">
      <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/register">Register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
       <Nav.Link as={Link} to="/login">Log in</Nav.Link>
      </Nav.Item>
    </Nav>
    )

}

export default Header;
