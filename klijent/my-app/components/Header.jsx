import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsBorder } from "react-icons/bs";
import { BiBorderAll } from "react-icons/bi";
import { Collapse } from 'react-bootstrap';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

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

  // Zatvaranje hamburger menija pri promeni širine
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  

  return (
    <header style={{ display: 'flex', justifyContent: 'center', width: '100%', fontFamily: 'Lexend, sans-serif' }}>
      {/* Hamburger meni za manje uređaje */}
      <div 
        className="d-block d-md-none" 
        style={{ 
          marginRight: "15px", 
          cursor: "pointer", 
          color: "#0D1E49" 
        }} 
        onClick={() => setOpen(!open)}
      >
        {open ? <BiBorderAll size={30} /> : <BsBorder size={30} />}
      </div>

      {/* Navigacija za veće uređaje */}
      <Nav
        variant="tabs"
        activeKey={location.pathname}
        className="flex-column flex-sm-row d-none d-md-flex"
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
                    <Nav.Link as={Link} to={path} style={getLinkStyle(path)} onClick={() => setOpen(false)}>
                      {title}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
          </>
        )}

        {user && user.isAdmin && (
          <Nav.Item>
            <Nav.Link as={Link} to="/admin" style={getLinkStyle("/admin")} onClick={() => setOpen(false)}>
              Admin
            </Nav.Link>
          </Nav.Item>
        )}

        {user && (
          <Nav.Item>
            <Nav.Link as={Link} to="/logout" style={getLinkStyle("/logout")} onClick={() => setOpen(false)}>
              Log out
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>

      {/* Collapse */}
      <Collapse in={open}>
        <div>
          <Nav
            variant="tabs"
            activeKey={location.pathname}
            className="flex-column d-md-none"
            style={{
              width: '100%',
              maxWidth: '75rem',
              justifyContent: 'center',
              position: "absolute",
              backgroundColor: "#fff",
              zIndex: 9999,
              top: '50px',
              left: '0',
            }}
          >
            <Nav.Item>
              <Nav.Link as={Link} to="/" style={getLinkStyle("/")} onClick={() => setOpen(false)}>
                Home
              </Nav.Link>
            </Nav.Item>
            {!user && (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/register" style={getLinkStyle("/register")} onClick={() => setOpen(false)}>
                    Register
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login" style={getLinkStyle("/login")} onClick={() => setOpen(false)}>
                    Log in
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            {user && !user.isAdmin && (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/tatamata" style={getLinkStyle("/tatamata")} onClick={() => setOpen(false)}>
                    TataMata
                  </Nav.Link>
                </Nav.Item>
                {isOnTataMataSubpage &&
                  tataMataTitles.map((title, index) => {
                    const path = `/tatamata/${index + 1}`;
                    return (
                      <Nav.Item key={index}>
                        <Nav.Link as={Link} to={path} style={getLinkStyle(path)} onClick={() => setOpen(false)}>
                          {title}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
              </>
            )}
            {user && user.isAdmin && (
              <Nav.Item>
                <Nav.Link as={Link} to="/admin" style={getLinkStyle("/admin")} onClick={() => setOpen(false)}>
                  Admin
                </Nav.Link>
              </Nav.Item>
            )}
            {user && (
              <Nav.Item>
                <Nav.Link as={Link} to="/logout" style={getLinkStyle("/logout")} onClick={() => setOpen(false)}>
                  Log out
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </div>
      </Collapse>
    </header>
  );
};

export default Header;
