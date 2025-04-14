(function () {
  const container = document.getElementById("tatamata-content");
  if (!container) return;

  container.innerHTML = "";
  container.className = "";

  const prevStyles = document.querySelectorAll("style[data-tatamata]");
  prevStyles.forEach((style) => style.remove());

  const style = document.createElement("style");
  style.setAttribute("data-tatamata", "tatamata4");
  style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        text-align: center;
        margin: 0;
        padding: 0;
    }

    #quizContainer {
        width: 80%;
        margin: 20px auto;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    button {
        margin: 10px;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }

    .hidden {
        display: none;
    }
  `;
  document.head.appendChild(style);

  container.innerHTML = `
    <div id="quizContainer">
        <div id="questionContainer"></div>
        <button id="answerBtn">Odgovori na pitanje</button>
        <button id="showResultsBtn" class="hidden">Prikazi rezultat</button>
        <div id="resultContainer" class="hidden">
            <p id="resultText"></p>
        </div>
    </div>
  `;

  const quizData = [
    {
      question: "Koliko je 2 + 2?",
      a: "3",
      b: "4",
      c: "5",
      d: "6",
      correct: "b", // Ispravan odgovor je 'b'
    },
    {
      question: "Koliko je 5 x 6?",
      a: "30",
      b: "25",
      c: "20",
      d: "35",
      correct: "a", // Ispravan odgovor je 'a'
    },
    {
      question: "Koliko je 12 ÷ 4?",
      a: "3",
      b: "4",
      c: "2",
      d: "5",
      correct: "a", // Ispravan odgovor je 'a'
    },
  ];

  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let totalAnswered = 0;

  function loadQuestion() {
    console.log(`Loading question ${currentQuestionIndex + 1}`);
    const currentQuestion = quizData[currentQuestionIndex];
    const questionContainer = document.getElementById("questionContainer");

    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <label>
            <input type="radio" name="answer" value="a"> ${currentQuestion.a}
        </label><br>
        <label>
            <input type="radio" name="answer" value="b"> ${currentQuestion.b}
        </label><br>
        <label>
            <input type="radio" name="answer" value="c"> ${currentQuestion.c}
        </label><br>
        <label>
            <input type="radio" name="answer" value="d"> ${currentQuestion.d}
        </label><br>
    `;
  }

  function answerQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (selectedAnswer) {
      totalAnswered++;
      console.log("Selected Answer:", selectedAnswer.value);
      console.log("Correct Answer:", quizData[currentQuestionIndex].correct);

      if (selectedAnswer.value === quizData[currentQuestionIndex].correct) {
        correctAnswers++;
      }

      console.log("Correct Answers:", correctAnswers);
      console.log("Total Answered:", totalAnswered);

      currentQuestionIndex++;

      // Proveri da li je poslednje pitanje
      if (currentQuestionIndex < quizData.length) {
        loadQuestion();
      } else {
        document.getElementById("answerBtn").classList.add("hidden"); // Skriva dugme za odgovaranje
        document.getElementById("showResultsBtn").classList.remove("hidden"); // Prikazuje dugme za rezultat
      }
    } else {
      alert("Molimo vas da odgovorite na pitanje!");
    }
  }

  function showResults() {
    const resultContainer = document.getElementById("resultContainer");
    const resultText = document.getElementById("resultText");

    const totalQuestions = quizData.length;

    console.log("Final Correct Answers:", correctAnswers);
    console.log("Total Answered Questions:", totalAnswered);

    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    console.log("Calculated Percentage:", percentage);

    resultText.innerHTML = `Vaš rezultat: ${correctAnswers} od ${totalQuestions} tačnih odgovora (${percentage}%)`;

    resultContainer.classList.remove("hidden"); // Prikazivanje rezultata
  }

  document.getElementById("answerBtn").onclick = answerQuestion;
  document.getElementById("showResultsBtn").onclick = showResults;

  loadQuestion();
})();
