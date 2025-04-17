import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "60px",
        textAlign: "center",
        color: "#0D1E49",
        zIndex: 1030,
      }}
    >
      &copy; {new Date().getFullYear()} TataMata
    </footer>
  );
};

export default Footer;
