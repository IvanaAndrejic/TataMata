(function () {
  const container = document.getElementById("tatamata-content");
  if (!container) return;

  function cleanupComponentStyles(except = []) {
    const removeStyles = (attrName) => {
      const styles = document.querySelectorAll(`style[${attrName}]`, `link[${attrName}]`);
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

  cleanupComponentStyles();

  container.innerHTML = "";
  container.className = "";

  const style = document.createElement("style");
  style.setAttribute("data-tatamata-style", "tatamata4");


  style.innerHTML = `

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: Arial, sans-serif;
        background: #f3f4f8;
    }

    #root {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .tm-tatamata-content {
        flex: 1; 
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 1.25rem;
        margin-bottom: 3.75rem;
    }

    .tm-container4 {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #FDC840;
        width: 60%;
        max-width: 62.5rem;
        height: 31.25rem; 
        margin: 0 auto; 
        background: #fff;
    }

    .tm-quiz-container {
        width: 100%;
        max-width: 31.25rem; 
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        text-align: center;
        margin: 0 auto;
        background-color: rgba(254, 231, 175, 0.91);

    }

    .tm-quiz-container h2 {
        color: #0D1E49;
        margin-bottom: 1.25rem;
        font-size: 1.25rem;
    }

    .tm-question-container {
        text-align: left;
    }

    .tm-option {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        font-size: 1rem;
        color: #0D1E49;
        background-color: #f9f9f9;
        padding: 0.625rem;
        border-radius: 0.375rem;
        transition: background-color 0.2s ease;
        cursor: pointer;
    }

    .tm-option:hover {
        background-color: #f0f0f0;
    }

    .tm-option input[type="radio"] {
        margin-right: 0.625rem;
        accent-color: #0D1E49;
        transform: scale(1.2);
    }

    .tm-button4 {
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
        background-color: #0D1E49;
        color: white;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        margin: 0.9375rem 0.5rem 0;
        transition: background-color 0.3s ease;
        width: 45%;
        max-width: 12.5rem;
    }

    .tm-button4:hover {
        background-color: #29324b;
    }

    .tm-result-container {
        margin-top: 1.5625rem;
    }

    .tm-result-text {
        font-size: 1.125rem;
        color: #0D1E49;
        font-weight: bold;
    }

    .tm-hidden {
        display: none;
    }
    
    #quizProgressBar {
        background-color: #FDC840;
        color: #0D1E49;
        font-weight: bold;
        font-size: 0.875rem;
        transition: width 0.4s ease;
    }

    .tm-quiz-container .progress {
        background-color: #fff6dc;
        border-radius: 0.375rem;
        overflow: hidden;
        box-shadow: inset 0 0 0.25rem rgba(0,0,0,0.1);
    }
  ;`
  document.head.appendChild(style);

  container.innerHTML = `
    <div class="tm-container4 mt-3">
      <div class="tm-quiz-container">
          <div class="progress mb-3" style = "height: 1.5rem;">
            <div id="quizProgressBar" class="progress-bar" role="progressbar" style="width: 0%";aria-valuenow="0"
              aria-valuemin="0" aria-valuemax="100">0%</div>
          </div>
          <div class="tm-question-container"></div>
          <button class="tm-button4" id="answerBtn">Odgovori na pitanje</button>
          <button class="tm-button4 tm-hidden" id="showResultsBtn">Prikaži rezultat</button>
          <div class="tm-result-container tm-hidden" id="resultContainer">
              <p class="tm-result-text" id="resultText"></p>
          </div>
      </div>
    </div>
    `
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

  function updateProgressBar() {
    const progress = Math.round((totalAnswered / quizData.length) * 100);
    const bar = document.getElementById("quizProgressBar");
    bar.style.width = `${progress}%`;
    bar.setAttribute("aria-valuenow", progress);
    bar.textContent = `${progress}%`;
  }
  

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
    `
  }

  function answerQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
      totalAnswered++;
      updateProgressBar();
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
        showNotification("Niste odgovorili na pitanje!", "warning");
    }
  }

  function showResults() {
    const totalQuestions = quizData.length;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    const resultText = `Vaš rezultat: ${correctAnswers} od ${totalQuestions} tačnih odgovora (${percentage}%)`;

    if (window.showResultModal) {
      window.showResultModal(resultText); 
    }

    const progressBar = document.getElementById("quizProgressBar");
    if (progressBar) {
      progressBar.style.width = "0%";
      progressBar.innerText = "0%";
    }

    currentQuestionIndex = 0;
    correctAnswers = 0;
    totalAnswered = 0;

    document.getElementById("answerBtn").classList.remove("tm-hidden");
    document.getElementById("showResultsBtn").classList.add("tm-hidden");
    loadQuestion();
  }

  document.getElementById("answerBtn").onclick = answerQuestion;
  document.getElementById("showResultsBtn").onclick = showResults;

  loadQuestion();
})();
