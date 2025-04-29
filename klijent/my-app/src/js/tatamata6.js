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
    style.setAttribute("data-tatamata-style", "tm6");
    style.innerHTML = `
      html, body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        font-family: "Lexend", sans-serif; 
        background: #f3f4f8;
      }
  
      #root {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
  
      #tatamata-content {
        flex-grow: 1;
        padding-bottom: 4.375rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
  
      .tm-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 100px);
        padding: 1.25rem 0;
      }
  
      .tm-container {
        width: 60%;
        max-width: 56.25rem;
        margin: 0 auto;
        box-shadow: 0 0 0.625rem #FDC840;
        border-radius: 0.3125rem;
        padding: 1.25rem;
        background: #fff !important;
      }
  
      .tm-card {
        margin-bottom: 1.25rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        border-radius: 0.3125rem;
      }
  
      .tm-card-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #FDC840;
      }
  
      .tm-card-body {
        padding: 1.25rem;
      }
  
      .tm-textarea.form-control {
        width: 100%;
        height: 100px;
        margin-bottom: 1rem;
        padding: 0.75rem;
        border-radius: 0.3125rem;
        border: 0.0625rem solid #ddd;
        background-color: rgba(254, 231, 175, 0.91);
      }
  
      .tm-btn-primary {
        background-color: #ff9800;
        color: white;
        padding: 0.625rem 1.25rem;
        font-size: 1rem;
        border: none;
        border-radius: 0.3125rem;
        cursor: pointer;
      }
  
      .tm-btn-primary:hover {
        background-color: #e68900;
      }
  
      .tm-h5 {
        font-size: 1.2rem;
        color: #0D1E49;
      }
  
      .tm-answer {
        background-color: #f3f4f8;
        box-shadow: none;
        border-radius: 0.3125rem;
      }
  
      footer {
        background: #fff;
      }
  
      /* Responzivnost */
      @media (max-width: 768px) {
        .tm-container {
          width: 90%; 
          padding: 1rem;  
        }
  
        .tm-card-title {
          font-size: 1.2rem;  
        }
  
        .tm-btn-primary {
          width: 100%;  
          padding: 0.75rem;  
        }
  
        .tm-h5 {
          font-size: 1rem; 
        }
  
        .tm-textarea.form-control {
          height: 80px;  
        }
  
        .tm-wrapper {
          padding: 1rem 0;  
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  function initializeContent() {
    const container = document.getElementById("tatamata-content");
    if (!container) return;

    container.innerHTML = `
      <div class="tm-wrapper">
        <div class="tm-container">
          <div class="tm-card shadow-ml mt-2">
            <div class="tm-card-body">
              <h4 class="tm-card-title mb-3">Postavi pitanje profesoru</h4>
              <div class="tm-mb-3">
                <textarea class="tm-textarea form-control" id="questionInput" rows="3" placeholder="Unesite Vaše pitanje...">
                </textarea>
              </div>
              <button class="tm-btn-primary mt-4" id="submitQuestionBtn">Pošaljite pitanje</button>
            </div>
          </div>

          <div class="mt-4">
            <h5 class="tm-h5">Vaša pitanja i odgovori:</h5>
            <div id="messagesList" class="mt-3"></div>
          </div>
        </div>
      </div>
    `;
  }

  //Renderovanje poruka
  function renderMessages() {
    const messagesList = document.getElementById("messagesList");
    if (!messagesList) return;

    fetch('http://localhost:5000/api/questions', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => response.json())
      .then(questions => {
        messagesList.innerHTML = "";
        questions.forEach(({ question, answer }) => {
          messagesList.innerHTML += `
            <div class="tm-card mb-3 tm-answer">
              <div class="tm-card-body">
                <p class="mb-1"><strong>Pitanje:</strong> ${question}</p>
                <p class="mb-0"><strong>Odgovor:</strong> ${answer ? answer : "<em>Još uvek nema odgovora</em>"}</p>
              </div>
            </div>
          `;
        });
      })
      .catch(err => {
        console.error("Greška u renderMessages:", err);
      });
  }

  function showNotification(message, type = 'success') {
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

  cleanupComponentStyles(["tm6"]);
  addInlineStyles();
  initializeContent();
  
  document.getElementById("submitQuestionBtn").addEventListener("click", async () => {
    const questionInput = document.getElementById("questionInput");
    const questionText = questionInput.value.trim();
    if (!questionText) {
      showNotification("Unesite pitanje!", "danger");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      showNotification("Morate biti prijavljeni da biste postavili pitanje.", "danger");
      return;
    }

    //Slanje pitanja adminu
    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ question: questionText }),
      });

      const data = await response.json();
      if (!response.ok) {
        return showNotification(data.message || "Greška pri slanju pitanja", "danger");
      }

      showNotification("Uspesno ste postavili pitanje!", "success");
      questionInput.value = "";
      renderMessages();
    } catch (err) {
      console.error("Greška pri slanju pitanja:", err);
      showNotification("Greška pri slanju pitanja", "danger");
    }
  });

  renderMessages();
})();
