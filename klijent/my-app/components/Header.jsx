import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NavItem } from "react-bootstrap";

const Header = () => {
  const { user } = useAuth(); // Dohvatamo korisnika iz AuthContext

  return (
    <Nav variant="tabs" activeKey="/">
      <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item>

      {/* Proveravamo da li je korisnik ulogovan i ne prikazujemo Register i Login stranice */}
      {!user && (
        <>
          <Nav.Item>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/login">Log in</Nav.Link>
          </Nav.Item>
        </>
      )}

      {/* TataMata se prikazuje uvek, ali je disabled ako korisnik nije ulogovan */}
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          to="/tatamata" 
          disabled={!user} 
          style={{
            pointerEvents: !user ? "none" : "auto", // Onemogućava klik ako korisnik nije ulogovan
            opacity: !user ? 0.5 : 1, // Smanjuje opacitet kad je disabled
          }}
        >
          TataMata
        </Nav.Link>
      </Nav.Item>

      {/*Prikazujemo admin tab samo ako je korisnik admin */}
      {user && user.isAdmin && (
        <Nav.Item>
          <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
        </Nav.Item>
      )}

      {/* Proveravamo da li je korisnik ulogovan i prikazujemo Loguout samo ukoliko je korisnik ulogovan */}
      {user && (
        <>
          <Nav.Item>
            <Nav.Link as={Link} to="/logout">Log out</Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>

  );
}

export default Header;
