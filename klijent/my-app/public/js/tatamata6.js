(function () {
    const container = document.getElementById("tatamata-content");
    if (!container) return;
  
    container.innerHTML = `
      <div class="container mt-5" style="max-width: 700px;">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="card-title mb-3">Postavi pitanje adminu</h4>
            <div class="mb-3">
              <textarea class="form-control" id="questionInput" rows="3" placeholder="Unesite vaše pitanje..."></textarea>
            </div>
            <button class="btn btn-primary" id="submitQuestionBtn">Pošaljite pitanje</button>
          </div>
        </div>
  
        <div class="mt-4">
          <h5>Vaša pitanja i odgovori:</h5>
          <div id="messagesList" class="mt-3"></div>
        </div>
      </div>
    `;
  
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
          alert(error.message || "Greška pri učitavanju pitanja");
          return;
        }
  
        const questions = await response.json();
        messagesList.innerHTML = "";
        questions.forEach(({ question, answer }) => {
          messagesList.innerHTML += `
            <div class="card mb-3">
              <div class="card-body">
                <p class="mb-1"><strong>Pitanje:</strong> ${question}</p>
                <p class="mb-0"><strong>Odgovor:</strong> ${answer ? answer : "<em>Još uvek nema odgovora</em>"}</p>
              </div>
            </div>
          `;
        });
      } catch (err) {
        console.error("Greška u renderMessages:", err);
        alert("Greška pri komunikaciji sa serverom");
      }
    }
  
    document.getElementById("submitQuestionBtn").addEventListener("click", async () => {
      const questionInput = document.getElementById("questionInput");
      const questionText = questionInput.value.trim();
      if (!questionText) return alert("Unesite pitanje!");
  
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Morate biti prijavljeni da biste postavili pitanje.");
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
          return alert(data.message || "Greška pri slanju pitanja");
        }
  
        questionInput.value = "";
        renderMessages();
      } catch (err) {
        console.error("Greška pri slanju pitanja:", err);
        alert("Greška pri slanju pitanja");
      }
    });
  
    renderMessages();
  })();
  