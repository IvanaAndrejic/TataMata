(function () {
    const container = document.getElementById("tatamata-content");
    if (!container) return;
  
    container.innerHTML = "";
    container.className = "";
  
    const prevStyles = document.querySelectorAll("style[data-tatamata]");
    prevStyles.forEach((style) => style.remove());
  
    const style = document.createElement("style");
    style.setAttribute("data-tatamata", "tatamata5");
    style.innerHTML = `
      .card-container {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
        padding: 20px;
      }
  
      .card {
        width: 18rem;
      }
    `;
    document.head.appendChild(style);
  
    // SAMO TRI kartice sada
    const cardsData = [
      {
        img: "https://via.placeholder.com/286x180?text=Prva",
        title: "Baza prijemnih ispita iz matematike",
        text: "Uspešno se pripremi za polaganje prijemnog ispita na ETF-u, FON-u, MATF-u ili Građevinskom fakultetu. SREĆNO!",
        buttonText: "Detaljnije",
        link: "https://matemanija.com/prijemni/"
      },
      {
        img: "https://via.placeholder.com/286x180?text=Druga",
        title: "Matematika za IV razred gimnazije",
        text: "Savladaj bez muke matematičke lekcije uz pomoć detaljno obrađenih nastavnih jedinica. ISTRAJ!",
        buttonText: "Pročitaj više",
        link: "https://www.krugizdavackakuca.rs/images/Pripreme/Pripreme%204M.pdf"
      },
      {
        img: "https://via.placeholder.com/286x180?text=Treća",
        title: "Takmičarski zadaci",
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
              <a href="${card.link}" class="btn btn-primary">${card.buttonText}</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  })();
  