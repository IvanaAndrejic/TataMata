(function () {
  // Očisti prethodni stil ako postoji
  const oldStyle = document.getElementById("tatamata-style");
  if (oldStyle) oldStyle.remove();

  // Uklanjanje flag-a koji sprečava višestruko učitavanje
  window.tatamata2Loaded = false;

  // Funkcija za inicijalizaciju sadržaja
  function initializeContent() {
    const container = document.getElementById("tatamata-content");
    if (!container) return;

    // Očistimo prethodni sadržaj
    container.innerHTML = '';

    // Dodajemo novi sadržaj
    container.innerHTML = `
      <div class="container mt-5">
        <div class="card shadow p-4">
          <h1 class="text-center mb-4" style="color: #4CAF50;">Matematička šala za danas</h1>
          <p id="date" class="text-center mb-3" style="font-size: 1.2em;"></p>
          <p id="fact" class="text-center" style="font-size: 1.5em; color: #007BFF;"></p>
          <hr class="my-4" style="border-color: #007BFF;" />
        </div>
      </div>
    `;

    const today = new Date();
    const formattedToday = today.toLocaleDateString();
    document.getElementById("date").textContent = `Danas je: ${formattedToday}`;
    document.getElementById("fact").textContent = getMathJoke();
  }

  // Funkcija koja vraća matematičke šale
  function getMathJoke() {
    const jokes = [
      "Why was the equal sign so humble? Because it knew it wasn’t less than or greater than anyone else.",
      "Parallel lines have so much in common. It’s a shame they’ll never meet.",
      "Why don’t calculus majors throw house parties? Because you should never drink and derive.",
      "I’m afraid for the calendar. Its days are numbered.",
      "Why did the two fours skip lunch? Because they already eight!",
      "What’s the official animal of Pi day? The Pi-thon."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Funkcija za učitavanje skripti
  function reloadScripts() {
    const container = document.getElementById("tatamata-content");
    if (!container) return;

    // Uklanjanje prethodnog sadržaja
    container.innerHTML = '';

    // Učitavanje novog sadržaja
    initializeContent();
  }

  // Funkcija za dodavanje stilova sa ID-jem za kasnije uklanjanje
  function addStyles() {
    const style = document.createElement('style');
    style.id = 'tatamata-style';
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

      .card {
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #4CAF50;
      }

      p {
        font-size: 1.5em;
        color: #007BFF;
      }

      hr {
        border-color: #007BFF;
      }
    `;
    document.head.appendChild(style);
  }

  // Dodavanje stilova
  addStyles();

  // Pokretanje učitavanja
  reloadScripts();
})();
