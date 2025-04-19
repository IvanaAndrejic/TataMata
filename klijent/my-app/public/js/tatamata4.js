(function () {
  const container = document.getElementById("tatamata-content");
  if (!container) return;

  container.innerHTML = "";
  container.className = "";

  // Uklanjanje prethodnih stilova
  const prevStyles = document.querySelectorAll("link[data-tatamata-style], style[data-tatamata]");
  prevStyles.forEach((el) => el.remove());

  // Učitavanje integrisanih stilova
  const style = document.createElement("style");
  style.setAttribute("data-tatamata", "tatamata4");

  style.innerHTML = `
    /* Osnovni reset i font */
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

    /* Glavni sadržaj (sadržaj neće preći visinu ekrana) */
    .tm-tatamata-content {
        flex: 1; /* Ovaj deo popunjava preostali prostor */
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 20px;
        margin-bottom: 60px; /* Ostavljamo prostor za footer */
    }

    /* Unutrašnji kontejner (povećana visina) */
    .tm-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px #FDC840;
        width: 60%;
        max-width: 1000px;
        height: 500px; /* Povećana visina kontejnera */
        margin: 0 auto; /* Centriranje */
    }

    /* Kontejner kviza */
    .tm-quiz-container {
        width: 100%;
        max-width: 500px; /* Manja širina kviza */
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px ;
        text-align: center;
        margin: 10px auto;
    }

    /* Naslovi */
    .tm-quiz-container h2 {
        color: #FDC840;
        margin-bottom: 20px;
        font-size: 20px;
    }

    /* Stil za opcije pitanja */
    .tm-question-container {
        text-align: left;
    }

    /* Stil za opcije odgovora */
    .tm-option {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        font-size: 16px;
        color: #0D1E49;
        background-color: #f9f9f9;
        padding: 10px;
        border-radius: 6px;
        transition: background-color 0.2s ease;
        cursor: pointer;
    }

    .tm-option:hover {
        background-color: #f0f0f0;
    }

    .tm-option input[type="radio"] {
        margin-right: 10px;
        accent-color: #FDC840;
        transform: scale(1.2);
    }

    /* Dugmad */
    .tm-button {
        padding: 12px 20px;
        font-size: 16px;
        background-color: #0D1E49;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin: 15px 8px 0;
        transition: background-color 0.3s ease;
        width: 45%;
        max-width: 200px;
    }

    .tm-button:hover {
        background-color: #29324b;
    }

    /* Rezultat */
    .tm-result-container {
        margin-top: 25px;
    }

    .tm-result-text {
        font-size: 18px;
        color: #0D1E49;
        font-weight: bold;
    }

    /* Utility klasa */
    .tm-hidden {
        display: none;
    }
  `;
  document.head.appendChild(style);

  // Kreiranje HTML strukture
  container.innerHTML = `
    <div class="tm-container mt-3">
      <div class="tm-quiz-container">
          <div class="tm-question-container"></div>
          <button class="tm-button" id="answerBtn">Odgovori na pitanje</button>
          <button class="tm-button tm-hidden" id="showResultsBtn">Prikaži rezultat</button>
          <div class="tm-result-container tm-hidden" id="resultContainer">
              <p class="tm-result-text" id="resultText"></p>
          </div>
      </div>
    </div>
  `;

  // Podaci za kviz
  const quizData = [
    {
      question: "Koliko je 2 + 2?",
      a: "3",
      b: "4",
      c: "5",
      d: "6",
      correct: "b",
    },
    {
      question: "Koliko je 5 x 6?",
      a: "30",
      b: "25",
      c: "20",
      d: "35",
      correct: "a",
    },
    {
      question: "Koliko je 12 ÷ 4?",
      a: "3",
      b: "4",
      c: "2",
      d: "5",
      correct: "a",
    },
  ];

  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let totalAnswered = 0;

  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const questionContainer = document.querySelector(".tm-question-container");

    questionContainer.innerHTML = `
      <h2>Pitanje ${currentQuestionIndex + 1} od ${quizData.length}</h2>
      <p>${currentQuestion.question}</p>
      <label class="tm-option">
          <input type="radio" name="answer" value="a" /> ${currentQuestion.a}
      </label>
      <label class="tm-option">
          <input type="radio" name="answer" value="b" /> ${currentQuestion.b}
      </label>
      <label class="tm-option">
          <input type="radio" name="answer" value="c" /> ${currentQuestion.c}
      </label>
      <label class="tm-option">
          <input type="radio" name="answer" value="d" /> ${currentQuestion.d}
      </label>
    `;
  }

  function answerQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
      totalAnswered++;
      if (selectedAnswer.value === quizData[currentQuestionIndex].correct) {
        correctAnswers++;
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < quizData.length) {
        loadQuestion();
      } else {
        document.getElementById("answerBtn").classList.add("tm-hidden");
        document.getElementById("showResultsBtn").classList.remove("tm-hidden");
      }
    } else {
      alert("Molimo vas da odgovorite na pitanje!");
    }
  }

  function showResults() {
    const totalQuestions = quizData.length;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    const resultText = `Vaš rezultat: ${correctAnswers} od ${totalQuestions} tačnih odgovora (${percentage}%)`;

    // Pozivamo funkciju koja je definisana u TataMataPage.jsx
    if (window.showResultModal) {
      window.showResultModal(resultText); // Prikazujemo rezultat u modalnom prozoru
    }

    // Resetujemo kviz
    currentQuestionIndex = 0;
    correctAnswers = 0;
    totalAnswered = 0;

    // Resetovanje dugmadi i pitanja
    document.getElementById("answerBtn").classList.remove("tm-hidden");
    document.getElementById("showResultsBtn").classList.add("tm-hidden");
    loadQuestion();
  }

  document.getElementById("answerBtn").onclick = answerQuestion;
  document.getElementById("showResultsBtn").onclick = showResults;

  loadQuestion();
})();
