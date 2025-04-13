import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TataMataPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Očisti prethodni sadržaj ako postoji
    const existing = document.getElementById('tatamata-content');
    if (existing) {
      existing.innerHTML = '';
    }

    // Ukloni stari script tag ako postoji
    const oldScript = document.getElementById('tatamata-script');
    if (oldScript) {
      oldScript.remove();
    }

    // Učitaj novi script
    const script = document.createElement('script');
    script.id = 'tatamata-script';
    script.src = `/js/tatamata${id}.js`; // Proveri da li koristiš relativnu ili apsolutnu putanju
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Očisti pri unmountu
      if (script) script.remove();
      if (existing) existing.innerHTML = '';
    };
  }, [id]);

  return (
    <div className="container mt-5 text-center">
      <div id="tatamata-content" style={{ zIndex: 1 }}></div>
    </div>
  );
}
