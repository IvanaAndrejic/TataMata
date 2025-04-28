import React from "react";

const Footer = ({ isAdmin, bgColor }) => {
  const footerStyle = {
    backgroundColor: bgColor || "#fff !important",
    fontFamily: "Lexend, sans-serif",
    padding: "0",
    height: "3.5rem",
    textAlign: "center",
    color: "#0D1E49",
    lineHeight: "3.5rem",
    position: isAdmin ? "static" : "fixed", // za pitanja/odgovore korisnika/admina
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1030,
    fontSize: "1rem", 
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            footer {
              height: 3rem;
              line-height: 3rem;
              font-size: 0.875rem;
            }
          }
          @media (max-width: 480px) {
            footer {
              height: 2.5rem;
              line-height: 2.5rem;
              font-size: 0.75rem;
            }
          }
        `}
      </style>
      <footer style={footerStyle}>
        &copy; {new Date().getFullYear()} TataMata
      </footer>
    </>
  );
};

export default Footer;
