import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cleanupComponentStyles } from '../src/js/styleCleaner';
import Spinner from 'react-bootstrap/Spinner';
import Footer from '../components/Footer';

const TataMata = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cleanupComponentStyles(['tm-tatamata']);

    const style = document.createElement('style');
    style.setAttribute('data-component-style', 'tm-tatamata');
    style.innerHTML = `
      body {
        background-color: #f3f4f8 !important;
        font-family: "Lexend", sans-serif; 
      }

      .tm-tatamata-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 1rem;
        margin: 0 auto;
      }

      .tm-card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 3rem;
        width: 100%;
        max-width: 81.25rem; 
        box-sizing: border-box;
        margin-left: 2.5rem;
      }

      .tm-card-link {
        text-decoration: none;
        width: calc(33.33% - 1rem); /* 3 kartice po redu */
        max-width: 18.75rem; /* Max širina kartice */
      }

      .tm-card {
        width: 100%; 
        aspect-ratio: 1; /* Kvadratne kartice */
        max-width: 15rem; 
        margin-bottom: 1rem;
        box-shadow: 0 0 0.625rem #0d1e49;
        border-radius: 0.5rem;
        overflow: hidden;
        transition: transform 0.3s ease;
      }

      .tm-card:hover {
        transform: scale(1.03);
      }

      .tm-card-body {
        background-color: rgba(254, 231, 175, 0.91);
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .tm-card-image {
        width: 100%;
        height: 100%; 
        object-fit: cover; 
        border-radius: 0.25rem;
      }

      footer {
        background-color: #f3f4f8 !important;
      }

      /* Mobilni prikaz - od 768px do 486px */
      @media (max-width: 768px) {
        .tm-card-container {
          margin-left: 0;
        }
        .tm-card-link {
          width: calc(50% - 1rem); /* 2 kartice po redu */
        }
      }

      /* Mobilni prikaz - od 485px do 320px */
      @media (max-width: 485px) {
        .tm-card-link {
          width: 100%; /* 1 kartica po redu */
        }
      }
    `;
    document.head.appendChild(style);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => {
      clearTimeout(timeout);
      cleanupComponentStyles(['tm-tatamata']);
      document.head.removeChild(style);
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="tm-tatamata-container">
        <div className="tm-card-container">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Link to={`/tatamata/${idx + 1}`} className="tm-card-link" key={idx}>
              <div className="tm-card">
                <div className="tm-card-body">
                  <img
                    className="tm-card-image"
                    src={`/images/img${idx + 1}.png`}
                    alt={`img${idx + 1}`}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer bgColor="#f3f4f8" />
    </>
  );
};

export default TataMata;
