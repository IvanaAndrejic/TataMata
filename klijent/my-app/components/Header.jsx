import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Header = () => {

    const { user } = useAuth();
    //const isDisabled = !user;
    const isDisabled = false;

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
      <Nav.Item>
        <Nav.Link as={Link} to={isDisabled ? "#" : "/tatamata"} 
                           disabled = {isDisabled} 
                           style = {{
                              pointerEvents: isDisabled ? "none" : "auto",
                              opacity: isDisabled ? 0.5 : 1, 
                           }}>
                           TataMata
        </Nav.Link>
      </Nav.Item>
    </Nav>
    )

}

export default Header;
