function cleanupComponentStyles(excludePrefixes = []) {
  const styles = document.querySelectorAll('[data-tatamata-style]');
  styles.forEach(style => {
    const stylePrefix = style.getAttribute('data-tatamata-style');
    if (!excludePrefixes.includes(stylePrefix)) {
      style.remove();
    }
  });
}

//Resetovanje 
if (typeof window.reloadScripts === 'undefined') {
  window.reloadScripts = () => {
    cleanupComponentStyles(['tm1']);

    document.querySelectorAll('script[src]').forEach(script => script.remove());

    loadExternalScripts().then(() => {
      injectTatamata1Styles();
      initializeContent();
    }).catch(error => {
      console.error("Greška pri učitavanju skripti: ", error);
    });
  };
}

//Dinamičko kreiranje script taga
if (typeof window.loadScript === 'undefined') {
  window.loadScript = function (src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
}

//Učitavanje eksternih biblioteka
if (typeof window.loadExternalScripts === 'undefined') {
  window.loadExternalScripts = function () {
    return Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.6.4/math.min.js'),
      loadScript('https://cdn.plot.ly/plotly-latest.min.js')
    ]);
  };
}

function injectTatamata1Styles() {
  const style = document.createElement('style');
  style.setAttribute('data-tatamata-style', 'tm1');
  style.innerHTML = `
    html, body {
      margin: 0;
      padding: 0;
      height: 100vh;
      background-color: #f3f4f8 !important;
      font-family: "Lexend", sans-serif;
    }

    #root {
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    #tatamata-content {
      flex: 1;
      width: 100%;
      min-height: 100%;
      background-color: #f3f4f8 !important;
      z-index: 0;
      padding: 2rem;
      box-sizing: border-box;
    }

    .tm1-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      text-align: center;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 1rem #0D1E49;
      width: 100%;
      max-width: 75rem;
      background-color: rgba(254, 231, 175, 0.91);
      margin: 0 auto;
    }

    .tm1-card {
      padding: 1.5em;
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      border-radius: 0.5rem;
      box-shadow: 0 0 1rem #FDC840;
      background-color: #f3f4f8;
    }

    .tm1-input {
      width: 100%;
      padding: 0.625rem;
      font-size: 0.875rem;
      margin-bottom: 1.25rem;
      border: 0.125rem solid #ddd;
      border-radius: 0.3125rem;
      max-width: 100%;
    }

    .tm1-button {
      padding: 0.625rem 1.25rem;
      background-color: #0D1E49;
      color: white;
      margin-right: 0.625rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      width: 40%;
      min-width: 120px;
    }

    .tm1-button:hover {
      background-color: #29324b;
    }

    .tm1-graph {
      width: 100%;
      height: 18.75rem;
      margin-top: 1.25rem;
      border: 0.0625rem solid #ddd;
      border-radius: 0.5rem;
    }

    h1 {
      color: #0D1E49;
    }

    /* Responzivnost */
    @media (max-width: 1024px) {
      .tm1-container {
        grid-template-columns: 1fr; 
        padding: 2rem 1rem;
        gap: 1rem; 
        width: 60%
      }

      .tm1-button {
        width: 100%;
        font-size: 0.875rem;
      }

      .tm1-card {
        padding: 1rem;
      }
    }

    @media (max-width: 768px) {
      footer {
        display: none;
      }

      .tm1-container {
        padding: 1.5rem;
        width: 100%;
      }

      .tm1-card {
        padding: 1rem;
      }
    }
  `;
  document.head.appendChild(style);
}

if (typeof window.initializeContent === 'undefined') {
  window.initializeContent = function () {
    const container = document.getElementById('tatamata-content');
    if (!container) return;

    container.innerHTML = `
      <div id="tatamata-root">
        <main>
          <div class="tm1-container mt-4 mb-2" style="z-index: 1;">
            <div class="tm1-card">
              <h1 class="mb-2 text-center">Unesite izraz</h1>
              <input type="text" id="math-expression" class="tm1-input" placeholder="npr. 2 + 2 * 3" />
              <button class="tm1-button mb-2" onclick="calculateExpression()">Izračunaj</button>
              <button class="tm1-button" onclick="resetContent()">Resetuj</button>
            </div>
            <div class="tm1-card">
              <h1 class="mb-2 text-center">Unesite funkciju</h1>
              <input type="text" id="function-input" class="tm1-input" placeholder="npr. x^2 + 2*x + 1" />
              <button class="tm1-button mb-2" onclick="drawGraph()">Nacrtaj</button>
              <button class="tm1-button" onclick="resetContent()">Resetuj</button>
            </div>
          </div>
        </main>
      </div>
    `;

    window.calculateExpression = function () {
      let expression = document.getElementById('math-expression').value;
      const expressionRegex = /^[\d+\-*/^().\s]+$/;
      if (!expressionRegex.test(expression)) {
        if (typeof window.showErrorModal === 'function') {
          window.showErrorModal("Neispravan izraz. Dozvoljeni su samo brojevi i osnovne operacije.");
        }
        return;
      }
      try {
        let result = math.evaluate(expression);
        if (typeof window.showResultModal === 'function') {
          window.showResultModal(result);
        }
      } catch (error) {
        if (typeof window.showErrorModal === 'function') {
          window.showErrorModal("Greška u izrazu: " + error.message);
        }
      }
    };

    window.drawGraph = function () {
      let fn = document.getElementById('function-input').value;
      if (!fn) {
        if (typeof window.showErrorModal === 'function') {
          window.showErrorModal();
        }
        return;
      }

      try {
        math.evaluate(fn, { x: 0 });

        if (typeof window.handleShowGraphModal === 'function') {
          window.handleShowGraphModal();

          setTimeout(() => {
            const graphContainer = document.getElementById('graph-modal-container');
            if (!graphContainer) return;
            graphContainer.innerHTML = '';

            let xValues = [], yValues = [];
            for (let x = -10; x <= 10; x += 0.1) {
              xValues.push(x);
              try {
                yValues.push(math.evaluate(fn, { x }));
              } catch {
                yValues.push(NaN);
              }
            }

            const trace = {
              x: xValues,
              y: yValues,
              type: 'scatter',
              mode: 'lines',
              line: { color: 'blue' }
            };

            const layout = {
              title: `y = ${fn}`,
              xaxis: { title: 'x' },
              yaxis: { title: 'y' }
            };

            Plotly.newPlot('graph-modal-container', [trace], layout);
          }, 100);
        }
      } catch (error) {
        if (typeof window.showErrorModal === 'function') {
          window.showErrorModal("Greška u funkciji: " + error.message);
        }
      }
    };

    window.resetContent = function () {
      document.getElementById('math-expression').value = '';
      document.getElementById('function-input').value = '';

      const resultEl = document.getElementById('result');
      if (resultEl) resultEl.innerText = '';

      const graphContainer = document.getElementById('graph-modal-container');
      if (graphContainer) graphContainer.innerHTML = '';
    };
  };
}

window.reloadScripts?.();