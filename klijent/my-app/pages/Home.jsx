import React, { useEffect } from 'react';
import logo from "../images/logo.png";

const Home = () => {
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    
    // Dodajemo @keyframes animacije u prvi stil listu
    styleSheet.insertRule(`
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `, styleSheet.cssRules.length);

    styleSheet.insertRule(`
      @keyframes slideIn {
        0% { transform: translateY(20px); }
        100% { transform: translateY(0); }
      }
    `, styleSheet.cssRules.length);
  }, []);

  return (
    <main>
      <div 
        className="container mt-4 mb-4" 
        style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          boxShadow: '0 0 10px #0D1E49'
        }}
      >
        {/* d-flex i flex-row omogućuju horizontalni raspored */}
        <div
          className="border border-warning p-4 rounded d-flex flex-row justify-content-center align-items-center"
          style={{ borderWidth: '1px', borderColor: '#0D1E49' }}
        >
          {/* Logo */}
          <div className="col-lg-4 text-center mb-4 mb-lg-0">
            <div
              className="border p-1 rounded"
              style={{ borderWidth: '1px', display: 'inline-block' }}
            >
              <img
                src={logo}
                alt="Tatamata"
                className="img-fluid rounded"
                style={{ maxWidth: "250px", height: "auto", borderRadius: "0.25rem" }}
              />
            </div>
          </div>

          {/* Tekst */}
          <div className="col-lg-8 text-center">
            <h2 
              className="mb-4" 
              style={{
                fontSize: '2rem', 
                animation: 'fadeIn 2s ease-out forwards, slideIn 1s ease-out forwards',
                opacity: 0, 
                transform: 'translateY(20px)'
              }}
            >
              Matematika je laka!
            </h2>
            <p className="lead" style={{ fontSize: '1.1rem' }}>
            TataMata aplikacija za učenje matematike osmišljena je da vam pomogne u sticanju novih znanja, proširivanju postojećih, otkrivanju zanimljivih činjenica o brojevima i komunikaciji sa profesorom. 
            Idealna je za sve koji žele da unaprede svoje matematičko znanje kroz zabavu i interaktivne aktivnosti!
            Pridružite se i otkrijte kako matematika može biti zabavna i jednostavna!
            Uživajte u svakom koraku svog matematičkog putovanja!
            </p>
            ;
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
