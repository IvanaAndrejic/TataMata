// HTML sadržaj u JS-u
document.body.innerHTML = `
  <div class="container mt-5">
    <h1 class="text-center mb-4">Numbers API</h1>
    <div class="card shadow p-4">
      <div class="mb-3">
        <input type="number" id="numberInput" class="form-control" placeholder="Unesite broj" />
      </div>
      <button id="fetchButton" class="btn btn-primary w-100 mb-3">Prikazi informacija</button>
      <div id="result" class="mt-3"></div>
    </div>
  </div>
`;

// Stilovi za JS
const style = document.createElement('style');
style.innerHTML = `
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f4f4f9;
  }

  .container {
    text-align: center;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
  }

  input {
    width: 80%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 10px 15px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

  #result {
    margin-top: 20px;
    font-size: 18px;
    color: #333;
  }
`;
document.head.appendChild(style);

// Event listener za dugme
document.getElementById("fetchButton").addEventListener("click", function () {
    const number = document.getElementById("numberInput").value;

    if (!number) {
        alert("Molimo unesite broj!");
        return;
    }

    // API endpoint
    const apiUrl = `http://numbersapi.com/${number}?json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Prikazivanje informacija
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `
                <h3>Informacije o broju ${number}:</h3>
                <p>${data.text}</p>
            `;
        })
        .catch(error => {
            console.error("Greška prilikom preuzimanja podataka:", error);
            alert("Došlo je do greške prilikom preuzimanja informacija.");
        });
});
