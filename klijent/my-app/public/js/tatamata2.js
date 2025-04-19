(function () {
  function removeResources() {
    document.querySelectorAll('style[data-tatamata-style="tm2"]').forEach(el => el.remove());
  }

  function addInlineStyles() {
    const style = document.createElement("style");
    style.setAttribute("data-tatamata-style", "tm2");
    style.innerHTML = `
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: Arial, sans-serif;
      }

      #root {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      header {
        height: 60px;
      }

      footer {
        height: 60px;
      }

      #tatamata-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: white;
      }

      .tm2-container {
        display: flex;
        justify-content: center;
        text-align: center;
        background-color: white;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 0 10px #FDC840;
        width: 100%;
        max-width: 1200px;
        margin-top: 3rem;
      }

      .tm2-card {
        padding: 1.5em;
        width: 100%;
        max-width: 1000px;
        margin: 1em;
        box-shadow: 0 0 10px #0D1E49;
        background-color: #f3f4f8;
        border-radius: 8px;
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

  removeResources();
  addInlineStyles();
  initializeContent();
  window.addEventListener("beforeunload", removeResources);
})();
