import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import TataMataGraphModal from '../modals/TataMataGraphModal';
import TataMataResultModal from '../modals/TataMataResultModal';
import TataMataModalError from '../modals/TataMataModalError';  // Novi modal za greške

export default function TataMataPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false); // State za prikazivanje modala greške
  const [errorMessage, setErrorMessage] = useState(''); // Poruka greške
  const [showGraphModal, setShowGraphModal] = useState(false); // State za prikazivanje modala sa grafikom
  const [showResultModal, setShowResultModal] = useState(false); // State za prikazivanje modala sa rezultatom

  useEffect(() => {
    // Očistimo prethodni sadržaj i sve resurse
    const container = document.getElementById('tatamata-content');
    if (container) {
      container.innerHTML = '';
    }

    // Uklanjamo prethodne stilove i skripte
    const oldStyles = document.querySelectorAll('link[data-tatamata]');
    oldStyles.forEach((style) => style.remove());

    const oldScript = document.getElementById('tatamata-script');
    if (oldScript) oldScript.remove();

    // Dodavanje novog CSS fajla za trenutni id
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/css/tatamata${id}.css`; // Putanja do specifičnog CSS-a za trenutnu komponentu
    link.id = `tatamata-style-${id}`;
    link.setAttribute('data-tatamata', 'true');
    document.head.appendChild(link);

    // Učitavanje specifičnog JS fajla za trenutnu komponentu
    const script = document.createElement('script');
    script.id = 'tatamata-script';
    script.src = `/js/tatamata${id}.js`; // Putanja do specifičnog JS-a
    script.async = true;

    const start = Date.now();

    script.onload = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(500 - elapsed, 0);
      setTimeout(() => setLoading(false), delay);
    };

    script.onerror = (err) => {
      console.error(`Greška prilikom učitavanja tatamata${id}.js`, err);
      setLoading(false);
    };

    document.body.appendChild(script);

    // Postavljamo globalne funkcije na window objektu
    window.showErrorModal = (message) => {
      setErrorMessage(message);
      setShowErrorModal(true);
    };

    window.showResultModal = (result) => {
      setResult(result);
      setShowResultModal(true);
    };

    window.handleShowGraphModal = () => {
      setShowGraphModal(true);
    };

    // Čišćenje kada se komponenta unmount-uje
    return () => {
      // Čišćenje pri promeni rute
      if (container) container.innerHTML = '';
      
      const cleanupScript = document.getElementById('tatamata-script');
      if (cleanupScript) cleanupScript.remove();

      const cleanupStyles = document.querySelectorAll('link[data-tatamata]');
      cleanupStyles.forEach((s) => s.remove());

      // Čišćenje globalnih funkcija
      delete window.showErrorModal;
      delete window.showResultModal;
      delete window.handleShowGraphModal;
    };
  }, [id]); // useEffect se pokreće svaki put kad se id promeni

  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center align-items-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Kontener za sadržaj TataMata */}
      <div id="tatamata-content" style={{ display: loading ? 'none' : 'block' }}></div>

      {/* Modal za grafikon */}
      <TataMataGraphModal
        show={showGraphModal}
        handleClose={() => setShowGraphModal(false)}
        message="Grafikon funkcije"
      />

      {/* Modal za rezultat izraza */}
      <TataMataResultModal
        show={showResultModal}
        handleClose={() => setShowResultModal(false)}
        result={result}
      />

      {/* Modal za greške */}
      <TataMataModalError
        show={showErrorModal}
        handleClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />
    </>
  );
}
