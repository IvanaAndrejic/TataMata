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
        margin: 0 auto;
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
  
      header, footer {
        height: 3.75rem;
      }
  
      .tm-tatamata-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.625rem;
        background-color: white;
        margin 0 auto;
      }
  
      .tm-container3 {
        display: flex;
        justify-content: center;
        text-align: center;
        background-color: white;
        padding: 0.625rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #FDC840;
        width: 100%;
        max-width: 75rem;
        margin 0 auto;
      }
  
      .tm-card3 {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 62.5rem;
        margin: 1rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        border-radius: 0.5rem;
        background-color: #f3f4f8;
        padding: 2rem;
      }
  
      .tm-h1, .tm-h3 {
        color: #FDC840;
        margin-bottom: 1.5rem;
        font-size: clamp(1.5rem, 5vw, 2.5rem);
      }
  
      .tm-input {
        width: 100%;
        max-width: 15rem;
        padding: 0.75rem 1rem;
        font-size: clamp(0.875rem, 2vw, 1.125rem);
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
  
      .tm-button {
        padding: 0.75rem 1rem;
        font-size: clamp(0.875rem, 2vw, 1.125rem);
        background-color: #0D1E49;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        width: clamp(40%, 20vw, 20%);
        min-width: 8rem;
        max-width: 100%;
        margin-top: 1.5rem;
        transition: background-color 0.3s ease;
      }
  
      .tm-button:hover {
        background-color: #29324b;
      }
  
      .tm-result {
        margin-top: 1.5rem;
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        color: #0D1E49;
      }
  
      .tm-input-container {
        position: relative;
        width: 100%;
      }
  
      .tm-clear-btn {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: clamp(1rem, 2vw, 1.5rem);
        color: #ccc;
        cursor: pointer;
        background: transparent;
        border: none;
      }
  
      .tm-clear-btn:hover {
        color: #FDC840;
      }
  
      @media (max-width: 600px) {
        .tm-container3 {
          margin: 0.5rem;
          padding: 0.5rem;
        }
  
        .tm-card3 {
          padding: 1rem;
        }
  
        .tm-button {
          width: 100%;
        }
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
    notificationContainer.style.top = '0.625rem';
    notificationContainer.style.right = '0.625rem';
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
