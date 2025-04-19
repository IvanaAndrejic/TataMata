import React, { useEffect } from "react";
import logo from "../images/logo.png";

const Home = () => {
  useEffect(() => {
    const headerStyle = document.createElement("style");
    headerStyle.innerHTML = `
      header {
        background-color: #0D1E49;
        color: white;
        padding: 5px 20px;
        text-align: center;
        font-size: 1.5rem;
        height: 60px;
        line-height: 50px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
      }

      body {
        margin: 0 !important;
        padding: 0 !important;
      }

      main {
        margin: 0 !important;
        padding-top: 60px; /* prostor ispod hedera */
      }

      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      @keyframes slideIn {
        0% { transform: translateY(20px); }
        100% { transform: translateY(0); }
      }

      h2 {
        animation: fadeIn 2s ease-out forwards, slideIn 1s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
      }
    `;
    document.head.appendChild(headerStyle);

    return () => {
      document.head.removeChild(headerStyle);
    };
  }, []);

  return (
    <main>
      <div
        className="container"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          boxShadow: "0 0 10px #0D1E49",
          borderRadius: "8px",
          padding: "5px",
          
        }}
      >
        <div
          className="border border-warning p-3 rounded d-flex flex-row justify-content-center align-items-center"
          style={{
            borderWidth: "1px",
            borderColor: "#0D1E49",
            margin: "0",
          }}
        >
          {/* Logo */}
          <div className="col-lg-4 text-center mb-4 mb-lg-0">
            <div
              className="border p-1 rounded"
              style={{
                borderWidth: "1px",
                display: "inline-block",
                marginRight: "10px",
              }}
            >
              <img
                src={logo}
                alt="Tatamata"
                className="rounded"
                style={{
                  maxWidth: "500px",
                  width: "100%",
                  height: "auto",
                  borderRadius: "0.25rem",
                }}
              />
            </div>
          </div>

          {/* Tekst */}
          <div className="col-lg-8 text-center">
            <h2
              className="mb-4"
              style={{
                fontSize: "2rem",
                animation:
                  "fadeIn 2s ease-out forwards, slideIn 1s ease-out forwards",
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              Matematika je laka!
            </h2>
            <p className="lead" style={{ fontSize: "1.1rem" }}>
              TataMata aplikacija za učenje matematike osmišljena je da vam
              pomogne u sticanju novih znanja, proširivanju postojećih,
              otkrivanju zanimljivih činjenica o brojevima i komunikaciji sa
              profesorom. Idealna je za sve koji žele da unaprede svoje
              matematičko znanje kroz zabavu i interaktivne aktivnosti!
              Pridružite se i otkrijte kako matematika može biti zabavna i
              jednostavna! Uživajte u svakom koraku svog matematičkog
              putovanja!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
