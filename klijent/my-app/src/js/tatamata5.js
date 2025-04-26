(function () {

  function cleanupComponentStyles(except = []) {
    const removeStyles = (attrName) => {
      const styles = document.querySelectorAll(`style[${attrName}]`);
      styles.forEach(style => {
        const name = style.getAttribute(attrName);
        if (!except.includes(name)) {
          if (style.parentNode) {
            style.parentNode.removeChild(style);
          }
        }
      });
    };

    removeStyles('data-tatamata-style');
    removeStyles('data-component-style');
  }

  function addInlineStyles() {
    const style = document.createElement("style");
    style.setAttribute("data-tatamata-style", "tm5");
    style.innerHTML = `
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: "Lexend", sans-serif; 
        background: #f3f4f8 !important;
      }

      #root {
        min-height: 100%;
        display: flex;
        flex-direction: column;
      }


      #tatamata-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 1.25rem;
        overflow-y: auto;
        box-sizing: border-box;
      }

      .tm5-card-container {
        display: flex;
        justify-content: center;
        gap: 3rem;
        flex-wrap: wrap;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #FDC840;
        background: #f3f4f8;
        width: 100%;
        max-width: 80rem;
        box-sizing: border-box;
      }

      .card5 {
        width: 16rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        border-radius: 0.5rem;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        transition: transform 0.3s ease;
        font-family: "Lexend", sans-serif; 
      }

      .card5:hover {
        transform: scale(1.03);
      }

      .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.25rem;
      }

      .btn {
        margin-top: auto;
        margin-bottom: 0.625rem;
        width: 60%;
      }
    `;
    document.head.appendChild(style);
  }

  function initializeContent() {
    const container = document.getElementById("tatamata-content");
    if (!container) return;

    const cardsData = [
      {
        img: "/images/card1.png",
        title: "PRIJEMNI ISPIT",
        text: "Uspešno se pripremi za polaganje prijemnog ispita na ETF-u, FON-u, MATF-u i Građevinskom fakultetu. SREĆNO!",
        buttonText: "Detaljnije",
        link: "https://matemanija.com/prijemni/"
      },
      {
        img: "/images/card2.png",
        title: "GRADIVO",
        text: "Savladaj bez muke matematičke lekcije uz pomoć detaljno obrađenih nastavnih jedinica. ISTRAJ!",
        buttonText: "Nauči više",
        link: "https://www.krugizdavackakuca.rs/images/Pripreme/Pripreme%204M.pdf"
      },
      {
        img: "/images/card3.png",
        title: "TAKMIČENJE",
        text: "Nadogradi svoje znanje i proveri svoju logiku kroz zadatke za učenike koji žele da znaju više. BRAVO!",
        buttonText: "Saznaj više",
        link: "https://imomath.com/srb/index.cgi?page=zadaciSaTakmichenja"
      }
    ];

    container.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

      <div class="tm5-card-container">
        ${cardsData.map(card => `
          <div class="card5">
            <img src="${card.img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title mb-2">${card.title}</h5>
              <p class="card-text">${card.text}</p>
              <a href="${card.link}" class="btn btn-warning">${card.buttonText}</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  cleanupComponentStyles(["tm5"]);
  addInlineStyles();
  initializeContent();

  window.addEventListener("beforeunload", () => cleanupComponentStyles(["tm5"]));
})();
