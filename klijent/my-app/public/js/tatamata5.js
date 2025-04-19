(function () {
  const container = document.getElementById("tatamata-content");
  if (!container) return;

  container.innerHTML = "";
  container.className = "";

  // Uklanjanje prethodnih stilova
  const prevStyles = document.querySelectorAll("style[data-tatamata]");
  prevStyles.forEach((style) => style.remove());

  // Učitavanje stilova direktno u JS fajl
  const style = document.createElement("style");
  style.setAttribute("data-tatamata", "tatamata5");
  style.innerHTML = `
    /* Osnovni reset i font */
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: Arial, sans-serif;
    }

    /* Glavni kontejner koji sadrži sve */
    #root {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    #tatamata-content {
      flex: 1; /* Ovaj deo popunjava preostali prostor */
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
    }

    .card5-container {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px #FDC840;
      margin-top: 20px;
      height: 550px;
    }

    .card5 {
      width: 18rem;
      box-shadow: 0 0 10px #0D1E49;
      border-radius: 8px;
      padding: 20px 20px;
      display: flex;
  flex-direction: column;
  justify-content: space-between;
    }
  .card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  }

    .btn {
    margin-top: auto;
  margin-bottom: 10px;
  width: 50%;
  }
  `;
  document.head.appendChild(style);

  // SAMO TRI kartice sada
  const cardsData = [
    {
      img: "/images/card1.png",
      title: "Baza prijemnih ispita iz matematike",
      text: "Uspešno se pripremi za polaganje prijemnog ispita na ETF-u, FON-u, MATF-u i Građevinskom fakultetu. SREĆNO!",
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

    <div class="card5-container">
      ${cardsData.map(card => `
        <div class="card5">
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
