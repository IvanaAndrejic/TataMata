import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsBorder } from "react-icons/bs";
import { BiBorderAll } from "react-icons/bi";

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();

  const tataMataTitles = [
    "Graph Mind",
    "Fun With Math",
    "What's your number?",
    "Test",
    "Lessons",
    "Q&A"
  ];

  const getLinkStyle = (path) => ({
    backgroundColor: location.pathname === path ? "#0D1E49" : "transparent",
    color: location.pathname === path ? "#FDC840" : "#0D1E49",
    fontWeight: location.pathname === path ? "bold" : "normal",
    borderRadius: "0.325rem",
    transition: "all 0.1s ease",
  });

  const isOnTataMataSubpage = location.pathname.startsWith("/tatamata/");

  return (
    <header style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
      <Nav
        variant="tabs"
        activeKey={location.pathname}
        className="flex-column flex-sm-row"   
        style={{ borderBottom: "none", width: '100%', maxWidth: '75rem', justifyContent: 'center' }}
      >
        <Nav.Item>
          <Nav.Link as={Link} to="/" style={getLinkStyle("/")}>
            Home
          </Nav.Link>
        </Nav.Item>

        {!user && (
          <>
            <Nav.Item>
              <Nav.Link as={Link} to="/register" style={getLinkStyle("/register")}>
                Register
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login" style={getLinkStyle("/login")}>
                Log in
              </Nav.Link>
            </Nav.Item>
          </>
        )}

        {user && !user.isAdmin && (
          <>
            <Nav.Item>
              <Nav.Link as={Link} to="/tatamata" style={getLinkStyle("/tatamata")}>
                TataMata
              </Nav.Link>
            </Nav.Item>

            {isOnTataMataSubpage &&
              tataMataTitles.map((title, index) => {
                const path = `/tatamata/${index + 1}`;
                return (
                  <Nav.Item key={index}>
                    <Nav.Link as={Link} to={path} style={getLinkStyle(path)}>
                      {title}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
          </>
        )}

        {user && user.isAdmin && (
          <Nav.Item>
            <Nav.Link as={Link} to="/admin" style={getLinkStyle("/admin")}>
              Admin
            </Nav.Link>
          </Nav.Item>
        )}

        {user && (
          <Nav.Item>
            <Nav.Link as={Link} to="/logout" style={getLinkStyle("/logout")}>
              Log out
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </header>
  );
};

export default Header;
