// Proveravamo da li funkcija 'reloadScripts' već postoji
if (typeof window.reloadScripts === 'undefined') {
  window.reloadScripts = () => {
    const existingScripts = document.querySelectorAll('script[src]');
    existingScripts.forEach(script => script.remove());

    loadExternalScripts().then(() => {
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

if (typeof window.initializeContent === 'undefined') {
  window.initializeContent = function () {
    const container = document.getElementById('tatamata-content');
    if (!container) return;

    container.innerHTML = '';
    container.classList.remove('border', 'border-primary');

    container.innerHTML = `
      <div id="tatamata-root">
        <main>
          <div class="container mt-5 mb-5" style="z-index: 1;">
            <div class="row p-4 mt-4 mb-4">
              <!-- Kalkulator -->
              <div class="col-md-6">
                <div class="card shadow p-4">
                  <h1 class="mb-4 text-center text-warning">Unesite matematički izraz</h1>
                  <input type="text" id="math-expression" class="form-control mb-3" placeholder="npr. 2 + 2 * 3" />
                  <button class="btn btn-secondary w-25 mb-4 mx-auto" onclick="calculateExpression()">Izračunaj</button>
                  <button class="btn btn-warning w-25 mb-4 mx-auto" onclick="resetContent()">Resetuj</button>
                </div>
              </div>

              <!-- Grafikon -->
              <div class="col-md-6">
                <div class="card shadow p-4">
                  <h1 class="mb-4 text-center text-warning">Unesite funkciju za grafikon</h1>
                  <input type="text" id="function-input" class="form-control mb-3" placeholder="npr. x^2 + 2*x + 1" />
                  <button class="btn btn-secondary w-25 mb-4 mx-auto" onclick="drawGraph()">Nacrtaj</button>
                  <button class="btn btn-warning w-25 mb-4 mx-auto" onclick="resetContent()">Resetuj</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;

    // Funkcija za izračunavanje izraza i slanje ka modalu
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
        let calculatedResult = math.evaluate(expression);
        if (typeof window.showResultModal === 'function') {
          window.showResultModal(calculatedResult);
        }
      } catch (error) {
        if (typeof window.showErrorModal === 'function') {
          window.showErrorModal("Greška u izrazu: " + error.message);
        }
      }
    };

    // Funkcija za crtanje grafikona
    window.drawGraph = function () {
      let functionInput = document.getElementById('function-input').value;

      if (!functionInput) {
        if (typeof window.showErrorModal === 'function') {
          window.showErrorModal();
        }
        return;
      }

      try {
        math.evaluate(functionInput, { x: 0 });

        if (typeof window.handleShowGraphModal === 'function') {
          window.handleShowGraphModal();

          setTimeout(() => {
            const graphContainer = document.getElementById('graph-modal-container');
            if (!graphContainer) {
              console.error("Graph container nije pronađen.");
              return;
            }

            graphContainer.innerHTML = '';

            let xValues = [], yValues = [];
            for (let x = -10; x <= 10; x += 0.1) {
              xValues.push(x);
              try {
                let y = math.evaluate(functionInput, { x });
                yValues.push(y);
              } catch (error) {
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
              title: `y = ${functionInput}`,
              xaxis: { title: 'x' },
              yaxis: { title: 'y' }
            };

            Plotly.newPlot('graph-modal-container', [trace], layout);
          }, 100);
        }
      } catch (error) {
        console.log("Greška u funkciji:", error);
        if (typeof window.showErrorModal === 'function') {
          window.showErrorModal();
        }
      }
    };

    // Funkcija za resetovanje sadržaja
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

// Pokretanje
window.reloadScripts?.();
