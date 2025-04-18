(function () {
  const container = document.getElementById("tatamata-content");
  if (!container) return;

  container.innerHTML = "";
  container.className = "";

  // Uklanjanje prethodnih stilova
  const prevStyles = document.querySelectorAll("style[data-tatamata]");
  prevStyles.forEach((style) => style.remove());

  // Učitavanje stilova putem linka
  const link = document.createElement("link");
  link.setAttribute("data-tatamata", "tatamata5");
  link.rel = "stylesheet";
  link.href = "/css/tatamata5.css"; // Putanja do novog CSS fajla
  document.head.appendChild(link);

  // SAMO TRI kartice sada
  const cardsData = [
    {
      img: "/images/card1.png",
      title: "Baza prijemnih ispita iz matematike",
      text: "Uspešno se pripremi za polaganje prijemnog ispita na ETF-u, FON-u, MATF-u... SREĆNO!",
      buttonText: "Detaljnije",
      link: "https://matemanija.com/prijemni/"
    },
    {
      img: "/images/card2.png",
      title: "Matematika za četvrti razred gimnazije",
      text: "Savladaj bez muke matematičke lekcije uz pomoć detaljno obrađenih nastavnih jedinica. ISTRAJ!",
      buttonText: "Pročitaj više",
      link: "https://www.krugizdavackakuca.rs/images/Pripreme/Pripreme%204M.pdf"
    },
    {
      img: "/images/card3.png",
      title: "Baza takmičarskih zadataka",
      text: "Nadogradi svoje znanje i proveri svoju logiku kroz zadatke za učenike koji žele da znaju više. BRAVO!",
      buttonText: "Saznaj više",
      link: "https://imomath.com/srb/index.cgi?page=zadaciSaTakmichenja"
    }
  ];

  container.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <div class="card-container">
      ${cardsData.map(card => `
        <div class="card">
          <img src="${card.img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text">${card.text}</p>
            <a href="${card.link}" class="btn btn-warning">${card.buttonText}</a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
})();
