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
      }

      .tm-tatamata-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 1rem;
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
        width: calc(33.33% - 1rem);
        max-width: 18.75rem;
      }

      .tm-card {
        max-width: 15rem;
        min-height: 15rem;
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
      }

      .tm-card-image {
        width: 100%;
        display: block;
        border-radius: 0.25rem;
        height: auto;
      }

      footer {
        background-color: #f3f4f8 !important;
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
