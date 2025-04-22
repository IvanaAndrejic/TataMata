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
        font-family: Arial, sans-serif;
      }

      #root {
        min-height: 100%;
        display: flex;
        flex-direction: column;
      }

      header {
        height: 3.75rem;
        flex-shrink: 0;
      }

      footer {
        height: 3.75rem;
        flex-shrink: 0;
      }

      #tatamata-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 1.25rem;
        background-color: white;
        overflow-y: auto;
        box-sizing: border-box;
      }

      .tm5-card-container {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #FDC840;
        background: #fff;
        width: 100%;
        max-width: 90rem;
        box-sizing: border-box;
      }

      .card5 {
        width: 15rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        border-radius: 0.5rem;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
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
        width: 50%;
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

      <div class="tm5-card-container">
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
  }

  cleanupComponentStyles(["tm5"]);
  addInlineStyles();
  initializeContent();

  window.addEventListener("beforeunload", () => cleanupComponentStyles(["tm5"]));
})();
