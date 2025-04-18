(function () {
  const container = document.getElementById("tatamata-content");
  if (!container) return;

  container.innerHTML = `
    <div class="container mt-2" style="max-width: 600px;">
      <div class="card shadow-ml mt-4">
        <div class="card-body">
          <h4 class="card-title mb-3">Postavi pitanje profesoru</h4>
          <div class="mb-3">
            <textarea class="form-control" id="questionInput" rows="3" placeholder="Unesite Vaše pitanje..."></textarea>
          </div>
          <button class="btn btn-warning mt-4" id="submitQuestionBtn">Pošaljite pitanje</button>
        </div>
      </div>

      <div class="mt-4">
        <h5>Vaša pitanja i odgovori:</h5>
        <div id="messagesList" class="mt-3"></div>
      </div>
    </div>
  `;

  // Učitavamo stilove putem linka
  const link = document.createElement("link");
  link.setAttribute("data-tatamata", "tatamata6");
  link.rel = "stylesheet";
  link.href = "/public/css/tatamata6.css"; // Putanja do novog CSS fajla
  document.head.appendChild(link);

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
          <div class="card mb-3 answer">
            <div class="card-body">
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
