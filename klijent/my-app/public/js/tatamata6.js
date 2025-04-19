(function () {
  // Kreiraj i dodaj style tag u head
  const style = document.createElement('style');
  style.innerHTML = `
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
      flex-grow: 1; /* Ovaj deo se širi da popuni raspoloživi prostor */
      padding-bottom: 70px; /* Padding za izbegavanje preklapanja sa footerom */
      justify-content: center; /* Centriranje vertikalno */
      align-items: center; /* Centriranje horizontalno */
    }

    .tm-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px); /* izbegava preklapanje sa header/footer */
  padding: 20px 0;
}

    /* Stil za karticu koja sadrži pitanje i odgovor */
   .tm-container {
   width: 60%;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 0 10px #FDC840;
    border-radius: 5px;
  padding: 20px;
}

    .tm-card {
      margin-bottom: 20px;
      box-shadow: 0 0 10px #0D1E49;
    border-radius: 5px;

    }

    .tm-card-title {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .tm-card-body {
      padding: 20px;
    }

    .tm-mb-3 {
      margin-bottom: 1rem;
    }

    .tm-mt-4 {
      margin-top: 1.5rem;
    }

    .tm-textarea.form-control {
      width: 100%;
      height: 100px;
      margin-bottom: 1rem;
      padding: 0.75rem;
      border-radius: 5px;
      border: 1px solid #ddd;
    }

    .tm-btn-primary {
      background-color: #ff9800;
      color: white;
      padding: 10px 20px;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .tm-btn-primary:hover {
      background-color: #e68900;
    }

    .tm-card.mb-3 {
      margin-bottom: 1rem;
    }

    .tm-card-body p {
      margin: 0;
    }

    .tm-answer {
      background-color: #f3f4f8;
      box-shadow: none;
    border-radius: 5px;

    }
  `;

  document.head.appendChild(style); // Dodajemo style tag u head sekciju

  const container = document.getElementById("tatamata-content");
  if (!container) return;

  container.innerHTML = `
  <div class="tm-wrapper">
    <div class="tm-container">
      <div class="tm-card shadow-ml mt-2">
        <div class="tm-card-body">
          <h4 class="tm-card-title mb-3">Postavi pitanje profesoru</h4>
          <div class="tm-mb-3">
            <textarea class="tm-textarea form-control" id="questionInput" rows="3" placeholder="Unesite Vaše pitanje..."></textarea>
          </div>
          <button class="tm-btn-primary mt-4" id="submitQuestionBtn">Pošaljite pitanje</button>
        </div>
      </div>

      <div class="mt-4">
        <h5>Vaša pitanja i odgovori:</h5>
        <div id="messagesList" class="mt-3"></div>
      </div>
    </div>
   </div> 
  `;

  // Dodavanje kontenera za notifikacije
  const notificationContainer = document.createElement("div");
  notificationContainer.setAttribute("id", "notificationContainer");
  notificationContainer.style.position = "fixed";
  notificationContainer.style.top = "10px";
  notificationContainer.style.right = "10px";
  notificationContainer.style.zIndex = "9999"; // Osiguraj da je obaveštenje iznad ostalih elemenata
  document.body.appendChild(notificationContainer);

  const messagesList = document.getElementById("messagesList");

  async function renderMessages() {
    console.log("Pozivam server da dohvati pitanja...");
    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        showNotification(error.message || "Greška pri učitavanju pitanja", "danger");
        return;
      }

      const questions = await response.json();
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
    } catch (err) {
      console.error("Greška u renderMessages:", err);
      showNotification("Greška pri komunikaciji sa serverom", "danger");
    }
  }

  // Funkcija za prikazivanje toast notifikacija
  function showNotification(message, type = 'success') {
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", `alert-${type}`, "alert-dismissible", "fade", "show");
    alertElement.setAttribute("role", "alert");

    alertElement.innerHTML = `
      <strong>${message}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    notificationContainer.appendChild(alertElement);

    // Automatsko uklanjanje obaveštenja nakon 5 sekundi
    setTimeout(() => {
      alertElement.remove();
    }, 5000);
  }

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
