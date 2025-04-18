(function () {
  // Funkcija za uklanjanje stila i skripti kada napustimo stranicu
  function removeResources() {
    const oldStyle = document.getElementById("tatamata-style");
    if (oldStyle) oldStyle.remove();

    const oldScript = document.getElementById("tatamata-script");
    if (oldScript) oldScript.remove();
  }

  // Funkcija za dodavanje stilova
  function addStyles() {
    const existingStyle = document.getElementById("tatamata-style");
    if (!existingStyle) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/css/tatamata3.css";
      link.id = "tatamata-style";
      document.head.appendChild(link);
    }
  }

  // Funkcija za inicijalizaciju sadržaja
  function initializeContent() {
    const container = document.getElementById("tatamata-content");
    if (!container) return;

    // Očistimo prethodni sadržaj
    container.innerHTML = '';

    // Dodajemo novi sadržaj
    container.innerHTML = `
      <div class="container mt-5">
        <div class="card p-4">
          <h1>Zanimljivosti o brojevima</h1>
          <div class="input-container">
            <input type="number" id="numberInput" placeholder="Unesite broj" />
            <span id="clearButton" class="clear-btn">&times;</span>
          </div>
          <button id="fetchButton">Prikaži informaciju</button>
          <div id="result"></div>
        </div>
      </div>
    `;

    // Event listener za dugme za prikaz podataka
    const button = document.getElementById("fetchButton");
    if (button) {
      button.addEventListener("click", () => {
        const number = document.getElementById("numberInput").value;
        if (!number) {
          if (window.showErrorModal) {
            window.showErrorModal("Molimo unesite broj.");
          }
          return;
        }

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

    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        document.getElementById("numberInput").value = '';
        document.getElementById("result").innerHTML = '';
      });
    }
  }

  // Dodajemo stilove
  addStyles();

  // Pokrećemo učitavanje sadržaja
  initializeContent();

  // Uklanjamo stilove i skripte kada se stranica napusti
  window.addEventListener("beforeunload", removeResources);
})();
