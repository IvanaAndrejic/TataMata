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
    style.setAttribute("data-tatamata-style", "tm3");
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

      .tm-tatamata-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: white;
      }

      .tm-container3 {
        display: flex;
        justify-content: center;
        text-align: center;
        background-color: white;
        padding: 5px;
        border-radius: 8px;
        box-shadow: 0 0 10px #FDC840;
        width: 100%;
        max-width: 1200px;
        margin: 1em 1em;
      }

      .tm-card3 {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 1000px;
        margin: 1em 1em;
        box-shadow: 0 0 10px #0D1E49;
        border-radius: 8px;
        background-color: #f3f4f8;
      }

      .tm-h1, .tm-h3 {
        color: #FDC840;
        margin-bottom: 20px;
      }

      .tm-input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
      }

      .tm-button {
        padding: 10px 15px;
        font-size: 16px;
        background-color: #0D1E49;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 20%;
        margin-top: 20px;
      }

      .tm-button:hover {
        background-color: #29324b;
      }

      .tm-result {
        margin-top: 20px;
        font-size: 18px;
        color: #0D1E49;
      }

      .tm-input-container {
        position: relative;
        width: 100%;
      }

      .tm-input[type="number"] {
        width: 100%;
        max-width: 250px;
        padding: 10px 35px 10px 10px;
        font-size: 14px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }

      .tm-clear-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 18px;
        color: #ccc;
        cursor: pointer;
        background: transparent;
        border: none;
      }

      .tm-clear-btn:hover {
        color: #FDC840;
      }
    `;
    document.head.appendChild(style);
  }

  function showNotification(message, type = 'warning') {
    const notificationContainer = document.createElement("div");
    notificationContainer.classList.add("alert", `alert-${type}`, "alert-dismissible", "fade", "show");
    notificationContainer.setAttribute("role", "alert");

    notificationContainer.innerHTML = `
      <strong>${message}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    notificationContainer.style.position = 'fixed';
    notificationContainer.style.top = '10px';
    notificationContainer.style.right = '10px';
    notificationContainer.style.zIndex = '1050';

    document.body.appendChild(notificationContainer);

    setTimeout(() => {
      notificationContainer.remove();
    }, 3000);
  }

  function initializeContent() {
    const container = document.getElementById("tatamata-content");
    if (!container) return;

    container.innerHTML = '';

    container.innerHTML = `
      <div class="tm-container3 mt-5">
        <div class="tm-card3 p-4">
          <h1 class="tm-h1">Zanimljivosti o brojevima</h1>
          <div class="tm-input-container">
            <input type="number" id="numberInput" class="tm-input" placeholder="Unesite broj" />
            <span id="clearButton" class="tm-clear-btn">&times;</span>
          </div>
          <button id="fetchButton" class="tm-button">Prikaži informaciju</button>
          <div id="result" class="tm-result"></div>
        </div>
      </div>
    `;

    const button = document.getElementById("fetchButton");
    if (button) {
      button.addEventListener("click", () => {
        const number = document.getElementById("numberInput").value;
        if (!number) {
          showNotification("Molimo unesite broj.", "warning");
          return;
        }

        fetch(`http://numbersapi.com/${number}?json`)
          .then((res) => res.json())
          .then((data) => {
            const result = document.getElementById("result");
            result.innerHTML = `
              <h3 class="tm-h3">Informacije o broju ${number}:</h3>
              <p>${data.text}</p>
            `;
          })
          .catch((err) => {
            console.error(err);
            showNotification("Greška pri dohvatanju podataka.", "danger");
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

  addInlineStyles();
  initializeContent();
  window.addEventListener("beforeunload", () => cleanupComponentStyles(["tm3"]));
})();
