import React from "react";

const Footer = ({ isAdmin }) => {
  return (
    <footer
      style={{
        backgroundColor: "white",
        padding: "0",
        height: "60px",
        textAlign: "center",
        color: "#0D1E49",
        lineHeight: "60px", 
        position: isAdmin ? "static" : "fixed",  
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1030,
      }}
    >
      &copy; {new Date().getFullYear()} TataMata
    </footer>
  );
};

export default Footer;
