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
    style.setAttribute("data-tatamata-style", "tm2");
    style.innerHTML = `
      html, body {
        margin: 0;
        padding: 0;
        height: 100vh;
        font-family: "Lexend", sans-serif; 
        background: #f3f4f8 !important;
      }

      #root {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      header {
        height: 3.75rem;
      }

      footer {
        height: 3.75rem;
      }

      #tatamata-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.625rem;
      }

      .tm2-container {
        display: flex;
        justify-content: center;
        align-items: center; 
        text-align: center;
        background-color: rgba(254, 231, 175, 0.91);
        padding: 0.625rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        width: 100%;
        max-width: 75rem;
        margin-top: 2rem;
        box-sizing: border-box;
      }

      .tm2-card {
        padding: 1.5em;
        width: 100%;
        max-width: 62.5rem;
        margin: 1em;
        box-shadow: 0 0 0.625rem #FDC840;
        background-color: #f3f4f8;
        border-radius: 0.5rem;
        box-sizing: border-box;
      }

      .tm2-card h1 {
        color: #FDC840;
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .tm2-card p {
        text-align: center;
        font-size: 1.5em;
        color: #0D1E49;
      }

      .tm2-card #tm2-date {
        font-size: 1.2em;
        margin-bottom: 1rem;
        color: #333;
      }

      .tm2-card hr {
        margin: 2rem 0 1rem;
      }

      /* Responzivnost */
      @media (max-width: 768px) {
        .tm2-container {
          flex-direction: column;
          padding: 1rem;
        }

        .tm2-card {
          margin: 0.5rem;
          padding: 1rem;
        }

        .tm2-card p {
          font-size: 1.2em;
        }
      }

      @media (max-width: 480px) {
        .tm2-card p {
          font-size: 1em;
        }

        .tm2-card h1 {
          font-size: 1.5em;
        }

        .tm2-container {
          max-width: 90%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initializeContent() {
    const container = document.getElementById("tatamata-content");
    if (!container) return;

    container.innerHTML = `
      <div class="tm2-container">
        <div class="tm2-card">
          <h1>Matematička šala za danas</h1>
          <p id="tm2-date"></p>
          <p id="tm-fact"></p>
          <hr />
        </div>
      </div>
    `;

    const today = new Date();
    const formattedToday = today.toLocaleDateString();
    document.getElementById("tm2-date").innerHTML = `Danas je: ${formattedToday}`;
    document.getElementById("tm-fact").textContent = getMathJoke();
  }

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

  cleanupComponentStyles(["tm2"]);
  addInlineStyles();
  initializeContent();
  window.addEventListener("beforeunload", () => cleanupComponentStyles(["tm2"]));
})();
