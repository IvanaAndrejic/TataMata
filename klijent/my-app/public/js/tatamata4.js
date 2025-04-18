(function () {
  const container = document.getElementById("tatamata-content");
  if (!container) return;

  container.innerHTML = "";
  container.className = "";

  // Uklanjanje prethodnih stilova
  const prevStyles = document.querySelectorAll("link[data-tatamata-style], style[data-tatamata]");
  prevStyles.forEach((el) => el.remove());

  // Učitavanje tatamata4.css
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/public/css/tatamata4.css"; // Ažuriraj ako je path drugačiji
  link.setAttribute("data-tatamata-style", "tatamata4");
  document.head.appendChild(link);

  // Kreiranje HTML strukture
  container.innerHTML = `
  <div class="container mt-3">
    <div id="quizContainer">
        <div id="questionContainer"></div>
        <button id="answerBtn">Odgovori na pitanje</button>
        <button id="showResultsBtn" class="hidden">Prikaži rezultat</button>
        <div id="resultContainer" class="hidden">
            <p id="resultText"></p>
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
    const questionContainer = document.getElementById("questionContainer");

    questionContainer.innerHTML = `
      <h2>Pitanje ${currentQuestionIndex + 1} od ${quizData.length}</h2>
      <p>${currentQuestion.question}</p>
      <label class="option">
          <input type="radio" name="answer" value="a" /> ${currentQuestion.a}
      </label>
      <label class="option">
          <input type="radio" name="answer" value="b" /> ${currentQuestion.b}
      </label>
      <label class="option">
          <input type="radio" name="answer" value="c" /> ${currentQuestion.c}
      </label>
      <label class="option">
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
        document.getElementById("answerBtn").classList.add("hidden");
        document.getElementById("showResultsBtn").classList.remove("hidden");
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

    // Takođe resetujemo kviz
    currentQuestionIndex = 0;
    correctAnswers = 0;
    totalAnswered = 0;

    // Ako treba, resetuj pitanje nakon što se rezultat prikaže
    loadQuestion();
  }

  document.getElementById("answerBtn").onclick = answerQuestion;
  document.getElementById("showResultsBtn").onclick = showResults;

  loadQuestion();
})();
