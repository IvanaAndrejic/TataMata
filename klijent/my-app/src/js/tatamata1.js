//PROBLEMATIKA SA MEŠANJEM STILOVA
function cleanupComponentStyles(excludePrefixes = []) {
  const styles = document.querySelectorAll('[data-tatamata-style]');
  styles.forEach(style => {
    const stylePrefix = style.getAttribute('data-tatamata-style');
    if (!excludePrefixes.includes(stylePrefix)) {
      style.remove();
    }
  });
}

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

if (typeof window.loadExternalScripts === 'undefined') {
  window.loadExternalScripts = function () {
    return Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.6.4/math.min.js'),
      loadScript('https://cdn.plot.ly/plotly-latest.min.js')
    ]);
  };
}

//Uklapanje stilova direktno u JS zbog problematike sa mešanjem stilova
function injectTatamata1Styles() {
  const style = document.createElement('style');
  style.setAttribute('data-tatamata-style', 'tm1');
  style.innerHTML = `
    html, body {
      margin: 0; 
      padding: 0; 
      height: 100%; 
      font-family: Arial, sans-serif;
      background: #f3f4f8;     
    }
    #root {
      height: 100%; 
      display: flex; 
      flex-direction: column;
    }
    header, footer {
      height: 3.75rem;
    }
    #tatamata-content {
      flex: 1; 
      display: flex; 
      justify-content: center; 
      align-items: center;
      padding: 0.0625rem; 
      
    }
    .tm1-container {
      text-align: center; 
      
      padding: 0.625rem;
      border-radius: 0.5rem; 
      box-shadow: 0 0 0.625rem #0D1E49;
      width: 100%; 
      max-width: 75rem;
      background-color: rgba(254, 231, 175, 0.91);
    }
    .tm1-row {
      display: flex; 
      justify-content: space-between; 
      gap: 1.25rem;
    }
    .tm1-col-md-6 {
      flex: 1; 
      max-width: 48%; 
      box-sizing: border-box;
    }
    .tm1-card {
      padding: 1.5em; 
      width: 100%; 
      max-width: 31.25rem; 
      margin: 0 auto;
      border-radius: 0.5rem; 
      box-shadow: 0 0 0.625rem #FDC840; 
      background-color: #f3f4f8;
    }
    .tm1-input {
      width: 100%; 
      padding: 0.625rem; 
      font-size: 0.875rem; 
      margin-bottom: 1.25rem;
      border: 0.125rem solid #ddd; 
      border-radius: 0.3125rem;
    }
    .tm1-button {
      padding: 0.625rem 1.25rem; 
      background-color: #0D1E49; 
      color: white; 
      margin-right: 0.625rem;
      border: none; 
      border-radius: 0.3125rem; 
      font-size: 1rem; 
      cursor: pointer;
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
  `;
  document.head.appendChild(style);
}

if (typeof window.initializeContent === 'undefined') {
  window.initializeContent = function () {
    const container = document.getElementById('tatamata-content');
    if (!container) return;

    container.innerHTML = '';

    container.innerHTML = `
      <div id="tatamata-root">
        <main>
          <div class="tm1-container mt-4 mb-4" style="z-index: 1;">
            <div class="tm1-row p-4 mt-1 mb-1">
              <div class="tm1-col-md-6">
                <div class="tm1-card">
                  <h1 class="mb-4 text-center">Unesite izraz</h1>
                  <input type="text" id="math-expression" class="tm1-input" placeholder="npr. 2 + 2 * 3" />
                  <button class="tm1-button w-25 mb-2" onclick="calculateExpression()">Izračunaj</button>
                  <button class="tm1-button w-25" onclick="resetContent()">Resetuj</button>
                </div>
              </div>
              <div class="tm1-col-md-6">
                <div class="tm1-card">
                  <h1 class="mb-4 text-center">Unesite funkciju</h1>
                  <input type="text" id="function-input" class="tm1-input" placeholder="npr. x^2 + 2*x + 1" />
                  <button class="tm1-button w-25 mb-2" onclick="drawGraph()">Nacrtaj</button>
                  <button class="tm1-button w-25" onclick="resetContent()">Resetuj</button>
                </div>
              </div>
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
