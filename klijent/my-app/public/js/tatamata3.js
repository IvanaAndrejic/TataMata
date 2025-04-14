(function () {
  // Očisti prethodni stil ako postoji
  const oldStyle = document.getElementById("tatamata-style");
  if (oldStyle) oldStyle.remove();

  // Funkcija za inicijalizaciju sadržaja
  function initializeContent() {
    const container = document.getElementById("tatamata-content");
    if (!container) return;

    // Očistimo prethodni sadržaj
    container.innerHTML = '';

    // Dodajemo novi sadržaj
    container.innerHTML = `
      <div class="container">
        <h1>Numbers API</h1>
        <input type="number" id="numberInput" placeholder="Unesite broj" />
        <button id="fetchButton">Prikaži informaciju</button>
        <div id="result"></div>
      </div>
    `;

    // Event listener za dugme
    const button = document.getElementById("fetchButton");
    if (button) {
      button.addEventListener("click", () => {
        const number = document.getElementById("numberInput").value;
        if (!number) {
          alert("Molimo unesite broj!");
          return;
        }

        // Dohvatanje podataka sa Numbers API
        fetch(`http://numbersapi.com/${number}?json`)
          .then((res) => res.json())
          .then((data) => {
            const result = document.getElementById("result");
            result.innerHTML = `
              <h3>Informacije o broju ${number}:</h3>
              <p>${data.text}</p>
            `;
          })
          .catch((err) => {
            console.error(err);
            alert("Greška pri dohvatanju podataka.");
          });
      });
    }
  }

  // Funkcija za dodavanje stilova sa ID-jem za kasnije uklanjanje
  function addStyles() {
    const style = document.createElement('style');
    style.id = 'tatamata-style';
    style.innerHTML = `
      .container {
        text-align: center;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 300px;
        margin: 50px auto;
      }

      input {
        width: 100%;
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
        width: 100%;
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
  }

  // Dodavanje stilova
  addStyles();

  // Pokretanje učitavanja
  initializeContent();
})();
