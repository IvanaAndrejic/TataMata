const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  };
  
  Promise.all([
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.6.4/math.min.js'),
    loadScript('https://cdn.plot.ly/plotly-latest.min.js')
  ]).then(() => {
    // Ubacujemo HTML u poseban div
    const container = document.getElementById('tatamata-content');
    if (!container) return;
  
    // Očistimo prethodni sadržaj
    container.innerHTML = '';
  
    // Uklonimo bilo koje klase koje dodaju border
    container.classList.remove('border', 'border-primary');
  
    // Dodajemo novi sadržaj bez border-a
    container.innerHTML = `
      <div class="container mt-5 mb-5" style="z-index: 1;">
        <div class="row p-4">
          <!-- Kalkulator -->
          <div class="col-md-6 mb-4">
            <div class="card shadow p-4">
              <h1 class="mb-4 text-center">Unesite matematički izraz</h1>
              <input type="text" id="math-expression" class="form-control mb-3" placeholder="npr. 2 + 2 * 3" />
              <button class="btn btn-success w-25 mb-3 mx-auto" onclick="calculateExpression()">Izračunaj</button>
              <h2 class="text-center">Rezultat: <span id="result"></span></h2>
            </div>
          </div>
  
          <!-- Grafikon -->
          <div class="col-md-6 mb-4">
            <div class="card shadow p-4">
              <h1 class="mb-4 text-center">Unesite funkciju za grafikon</h1>
              <input type="text" id="function-input" class="form-control mb-3" placeholder="npr. x^2 + 2*x + 1" />
              <button class="btn btn-primary w-50 mb-4 mx-auto" onclick="drawGraph()">Prikazivanje grafikona</button>
              <div id="graph" style="height: 400px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // Funkcija za izračunavanje izraza
    window.calculateExpression = function () {
      let expression = document.getElementById('math-expression').value;
      try {
        let result = math.evaluate(expression);
        document.getElementById('result').innerText = result;
      } catch (error) {
        document.getElementById('result').innerText = "Greška u izrazu!";
      }
    };
  
    // Funkcija za crtanje grafikona
    window.drawGraph = function () {
      let func = document.getElementById('function-input').value;
      let xValues = [], yValues = [];
  
      for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        try {
          let y = math.evaluate(func, { x });
          yValues.push(y);
        } catch (error) {
          yValues.push(NaN);
        }
      }
  
      let trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'blue' }
      };
  
      let layout = {
        title: 'Grafikon funkcije: y = ' + func,
        xaxis: { title: 'x' },
        yaxis: { title: 'y' }
      };
  
      Plotly.newPlot('graph', [trace], layout);
    };
  
    // Dodavanje stilova (ako su ti i dalje potrebni)
    const style = document.createElement('style');
    style.innerHTML = `
      .container {
        text-align: center;
        background-color: white;
        padding: 5px;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        width: 90%;
        z-index: 1;
      }
  
      .row {
        border: none; /* Ovdje osiguravamo da nema border-a */
        border-radius: 10px;
      }
  
      .card {
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
  
      input {
        width: 80%;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 20px;
        border: 2px solid #ddd;
        border-radius: 5px;
      }
  
      button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
      }
  
      button:hover {
        background-color: #45a049;
      }
  
      #graph {
        width: 100%;
        height: 400px;
        margin-top: 30px;
      }
    `;
    document.head.appendChild(style);
  });
  