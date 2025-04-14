import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function TataMataPage() {
  const { id } = useParams();

  useEffect(() => {
    const container = document.getElementById('tatamata-content');

    // Očisti sadržaj
    if (container) {
      container.innerHTML = '';
    }

    // Ukloni stare skripte
    const oldScript = document.getElementById('tatamata-script');
    if (oldScript) oldScript.remove();

    // Ukloni sve stilove koje su druge skripte možda dodale
    const oldStyles = document.querySelectorAll('style[data-tatamata], style#tatamata-style');
    oldStyles.forEach((style) => style.remove());

    // Kreiraj i dodaj novu skriptu
    const script = document.createElement('script');
    script.id = 'tatamata-script';
    script.src = `/js/tatamata${id}.js`;
    script.async = true;

    script.onload = () => {
      console.log(`tatamata${id}.js učitan`);
    };

    script.onerror = (err) => {
      console.error(`Greška prilikom učitavanja tatamata${id}.js`, err);
    };

    document.body.appendChild(script);

    // Cleanup pri odlasku sa stranice
    return () => {
      if (container) container.innerHTML = '';
      const script = document.getElementById('tatamata-script');
      if (script) script.remove();

      const cleanupStyles = document.querySelectorAll('style[data-tatamata], style#tatamata-style');
      cleanupStyles.forEach((s) => s.remove());
    };
  }, [id]);

  return <div id="tatamata-content"></div>;
}
