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
    // Dodavanje CSS fajla ako nije već učitan
    const existingStyle = document.getElementById("tatamata-style");
    if (!existingStyle) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/css/tatamata2.css"; // Putanja do vašeg CSS fajla
      link.id = "tatamata-style";
      document.head.appendChild(link);
    }
  }

  // Funkcija za dodavanje skripti
  function addScript() {
    // Dodavanje JS fajla ako nije već učitan
    const existingScript = document.getElementById("tatamata-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "tatamata-script";
      script.src = "/js/tatamata2.js"; // Putanja do vašeg JS fajla
      script.async = true;
      document.body.appendChild(script);
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
          <h1 class="text-center mb-4">Matematička šala za danas</h1>
          <p id="date" class="text-center mb-3" style="font-size: 1.2em;"></p>
          <p id="fact" class="text-center" style="font-size: 1.5em; color: #0D1E49;"></p>
          <hr class="my-4" />
        </div>
      </div>
    `;

    // Dodajemo stilove i skripte
    addStyles();
    addScript();

    // Dodavanje trenutnog datuma
    const today = new Date();
    const formattedToday = today.toLocaleDateString();
    document.getElementById("date").innerHTML = `Danas je: ${formattedToday}`;
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

  // Pokreni učitavanje odmah
  initializeContent();

  // Dodajemo event listener da uklonimo resurse prilikom napuštanja stranice
  window.addEventListener("beforeunload", removeResources);
})();
