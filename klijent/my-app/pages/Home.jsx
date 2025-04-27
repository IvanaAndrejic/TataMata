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
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        padding-top: 5rem;
      }

      main.home-main {
        margin: 0 !important;
        padding-top: 3.75rem; /* Dodajemo padding-top da se ne bi preklapao sa menijem */    
        min-height: 100vh;
        z-index: 1; 
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
        transition: transform 0.3s ease;
        box-shadow: 0 0 0.625rem #0D1E49;
        border-radius: 0.5rem;
        background: #fff;
        padding: 1rem;
        width: 100%;
        max-width: 56.25rem; 
        margin: 0 auto; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: left; 
      }

      .container:hover {
        transform: scale(1.03);
      }

      footer {
        background: #f3f4f8 !important;
      }

      /* Responzivnost */
      @media (max-width: 768px) {
        main.home-main {
          padding-top: 4rem; /* Osiguravamo da div ne preklapa hamburger meni */
        }

        .container {
          padding: 1rem;
          width: 100%;
          max-width: 100%;
          text-align: center;
          margin: 0;
        }

        .col-lg-4, .col-lg-8 {
          width: 100%;
          text-align: center;
        }

        h2 {
          font-size: 1.5rem;
        }

        .lead {
          font-size: 1rem;
        }

        body.home-page {
          padding: 0.5rem;
        }

        .logo {
          display: none;
        }
      }

      @media (min-width: 480px) and (max-width: 768px) {
        .logo {
          display: block; 
        }
      }

      @media (min-width: 768px) {
        .logo {
          display: block;
        }
      }

      body.home-page {
        display: flex;
        justify-content: center;
      }
      @media (max-width: 480px) {
        h2 {
          font-size: 1.25rem;
          margin-right: 1.5rem;
        }

        .lead {
          font-size: 0.95rem;
          margin-right: 1rem;
        }
      }
    ;`
    document.head.appendChild(homeStyle);

    return () => {
      document.body.classList.remove("home-page");
      document.querySelector("main").classList.remove("home-main");
      document.head.removeChild(homeStyle);
    };
  }, []);

  return (
    <main>
      <div className="container">
        <div
          className="border border-warning p-3 rounded d-flex flex-row justify-content-center align-items-center"
          style={{
            borderWidth: "0.0625rem",
            borderColor: "#0D1E49",
            background: "rgba(254, 231, 175, 0.91)",
            margin: "0",
            color: "#0D1E49",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="col-lg-4 text-center mb-4 mb-lg-0">
            <div
              className="border p-1 rounded logo"
              style={{
                borderWidth: "0.0625rem",
                display: "flex",  
                justifyContent: "center",  
                alignItems: "center",  
                marginRight: "0.625rem",
              }}
            >
              <img
                src={logo}
                alt="Tatamata"
                className="rounded"
                style={{
                  maxWidth: "100%",  
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
                animation: "fadeIn 2s ease-out forwards, slideIn 1s ease-out forwards",
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
