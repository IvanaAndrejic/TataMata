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
      }
      
      header {
        background-color: #0D1E49;
        color: white;
        padding: 5px 20px;
        text-align: center;
        font-size: 1.5rem;
        height: 10px;
        line-height: 10px;
        top: 0;
        width: 100%;
        z-index: 1000;
      }

      main.home-main {
        margin: 0 !important;
        padding-top: 60px;
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
