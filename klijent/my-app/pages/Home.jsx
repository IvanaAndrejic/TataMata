import React, { useEffect } from "react";
import logo from "../images/logo.png";
import { cleanupComponentStyles } from '../src/js/styleCleaner'; 

const Home = () => {
  useEffect(() => {
    
    cleanupComponentStyles(['home']); 

    document.body.classList.add("home-page");
    document.querySelector("main").classList.add("home-main");

    const homeStyle = document.createElement("style");
    homeStyle.setAttribute("data-component-style", "home");
    homeStyle.innerHTML = `
      body.home-page {
        min-height: 100vh;
        background: #f3f4f8;
        font-family: "Lexend", sans-serif; 
      }    

      main.home-main {
        margin: 0 !important;
        padding-top: 3.75rem;
      }

      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      @keyframes slideIn {
        0% { transform: translateY(1.25rem); }
        100% { transform: translateY(0); }
      }

      h2 {
        animation: fadeIn 2s ease-out forwards, slideIn 1s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
        font-family: "Fugaz One", sans-serif;
      }

      .container {
        transition: transform 0.3s ease; /* Tranzicija za transformaciju */
      }

      .container:hover {
        transform: scale(1.03);
      }

      footer {
        background: #f3f4f8 !important;
      }
    `;
    document.head.appendChild(homeStyle);

    return () => {
      
      document.body.classList.remove("home-page");
      document.querySelector("main").classList.remove("home-main");
      document.head.removeChild(homeStyle); // Očisti stilove kada se komponenta ugasi
    };
  }, []);

  return (
    <main>
      <div
        className="container"
        style={{
          maxWidth: "62.5rem",
          margin: "0.5rem auto",
          boxShadow: "0 0 0.625rem #0D1E49",
          borderRadius: "0.5rem",
          padding: "1rem",
          background: "#fff",
        }}
      >
      <div
          className="border border-warning p-3 rounded d-flex flex-row justify-content-center align-items-center"
          style={{
            borderWidth: "0.0625rem",
            borderColor: "#0D1E49",
            background: "rgba(254, 231, 175, 0.91)",
            margin: "0",
            color: " #0D1E49"
          }}
      >
      <div className="col-lg-4 text-center mb-4 mb-lg-0">
          <div
              className="border p-1 rounded"
                style={{
                  borderWidth: "0.0625rem",
                  display: "inline-block",
                  marginRight: "0.625rem",
                }}
          >
          <img
              src={logo}
              alt="Tatamata"
              className="rounded"
              style={{
                maxWidth: "31.25rem",
                width: "100%",
                height: "auto",
                borderRadius: "0.25rem",
              }}
              />
            </div>
          </div>

          <div className="col-lg-8 text-center">
            <h2
              className="mb-4"
              style={{
                fontSize: "2rem",
                animation:
                  "fadeIn 2s ease-out forwards, slideIn 1s ease-out forwards",
                opacity: 0,
                transform: "translateY(1.25rem)",
              }}
            >
              Matematika je laka!
            </h2>
            <p className="lead" style={{ fontSize: "1.1rem" }}>
              TataMata aplikacija za učenje matematike osmišljena je da vam
              pomogne u sticanju novih znanja, proširivanju postojećih,
              otkrivanju zanimljivih činjenica o brojevima. Idealna je za sve koji žele da unaprede svoje
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
