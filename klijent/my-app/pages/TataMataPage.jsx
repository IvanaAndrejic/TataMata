import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import TataMataGraphModal from '../modals/TataMataGraphModal';
import TataMataResultModal from '../modals/TataMataResultModal';
import TataMataModalError from '../modals/TataMataModalError';

export default function TataMataPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    const container = document.getElementById('tatamata-content');
    if (container) {
      container.innerHTML = '';
    }

    const oldStyles = document.querySelectorAll('link[data-tatamata]');
    oldStyles.forEach((style) => style.remove());

    const oldScript = document.getElementById('tatamata-script');
    if (oldScript) oldScript.remove();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/css/tatamata${id}.css`;
    link.id = `tatamata-style-${id}`;
    link.setAttribute('data-tatamata', 'true');
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.id = 'tatamata-script';
    script.src = `/js/tatamata${id}.js`;
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

    window.showResultModal = (result) => {
      setResult(result);
      setShowResultModal(true);
    };

    window.showErrorModal = (message) => {
      setErrorMessage(message);
      setShowErrorModal(true);
    };

    window.handleShowGraphModal = () => {
      setShowGraphModal(true);
    };

    return () => {
      if (container) container.innerHTML = '';
      const cleanupScript = document.getElementById('tatamata-script');
      if (cleanupScript) cleanupScript.remove();
      const cleanupStyles = document.querySelectorAll('link[data-tatamata]');
      cleanupStyles.forEach((s) => s.remove());

      delete window.showErrorModal;
      delete window.showResultModal;
      delete window.handleShowGraphModal;
    };
  }, [id]);

  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center align-items-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <div id="tatamata-content" style={{ display: loading ? 'none' : 'block' }}></div>

      <TataMataGraphModal show={showGraphModal} handleClose={() => setShowGraphModal(false)} message="Grafikon funkcije" />
      <TataMataResultModal show={showResultModal} handleClose={() => setShowResultModal(false)} result={result} />
      <TataMataModalError show={showErrorModal} handleClose={() => setShowErrorModal(false)} message={errorMessage} />
    </>
  );
}
