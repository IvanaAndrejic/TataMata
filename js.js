function calculate() {
    // Uzmi unos iz input polja
    let expression = document.getElementById('math-expression').value;
  
    try {
      // Koristi Math.js za evaluaciju izraza
      let result = math.evaluate(expression);
  
      // Prikaz rezultata
      document.getElementById('result').innerText = result;
    } catch (error) {
      // Ako dođe do greške (npr. pogrešan izraz)
      document.getElementById('result').innerText = "Greška u izrazu!";
    }
  }
  
  function drawGraph() {
    // Uzmi unos funkcije iz input polja
    let func = document.getElementById('function-input').value;
  
    // Generišemo niz vrednosti x i y na osnovu funkcije
    let xValues = [];
    let yValues = [];
    
    for (let x = -10; x <= 10; x += 0.1) {
      xValues.push(x);
      try {
        // Evaluiramo funkciju za svaki x
        let y = math.evaluate(func, {x: x});
        yValues.push(y);
      } catch (error) {
        yValues.push(NaN); // Ako postoji greška u funkciji, stavimo NaN
      }
    }
  
    // Konfigurišemo grafikon
    let trace = {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines',
      line: {color: 'blue'}
    };
  
    let layout = {
      title: 'Grafikon funkcije: y = ' + func,
      xaxis: {title: 'x'},
      yaxis: {title: 'y'}
    };
  
    // Prikazivanje grafikona u div elementu
    Plotly.newPlot('graph', [trace], layout);
  }
  