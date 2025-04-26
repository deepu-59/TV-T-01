const allQuestions = [
    { question: "What is the value of (3 + 2) × 4?", options: ["20", "10", "12", "16"], answer: "20" },
    { question: "If x = 3 and y = 4, what is x² + y²?", options: ["12", "25", "5", "7"], answer: "25" },
    { question: "What is 20% of 150?", options: ["25", "20", "30", "15"], answer: "30" },
    { question: "A train travels 120 km in 2 hours. What is its speed?", options: ["60 km/h", "50 km/h", "70 km/h", "80 km/h"], answer: "60 km/h" },
    { question: "What is the next number in the sequence: 2, 4, 8, 16, ?", options: ["18", "32", "20", "24"], answer: "32" },
    { question: "What is the simple interest on ₹1000 at 5% for 2 years?", options: ["₹100", "₹50", "₹200", "₹150"], answer: "₹100" },
    { question: "Solve for x: 2x + 3 = 11", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "If 5 pens cost ₹100, what is the cost of 1 pen?", options: ["₹15", "₹20", "₹25", "₹30"], answer: "₹20" },
    { question: "What is the area of a rectangle with length 5 cm and breadth 4 cm?", options: ["10 cm²", "15 cm²", "20 cm²", "25 cm²"], answer: "20 cm²" },
    { question: "A car travels 180 km in 3 hours. What is the average speed?", options: ["60 km/h", "70 km/h", "50 km/h", "80 km/h"], answer: "60 km/h" },
    { question: "What is 3/4 of 100?", options: ["25", "75", "50", "60"], answer: "75" },
    { question: "How many sides does a hexagon have?", options: ["4", "5", "6", "7"], answer: "6" },
    { question: "The square of 9 is?", options: ["18", "27", "81", "72"], answer: "81" },
    { question: "Which of these is a prime number?", options: ["9", "15", "17", "21"], answer: "17" },
    { question: "If a = 2 and b = 3, what is ab + ba?", options: ["12", "13", "17", "15"], answer: "17" },
    { question: "If 1 kg of rice costs ₹60, what will 2.5 kg cost?", options: ["₹120", "₹150", "₹140", "₹160"], answer: "₹150" },
    { question: "What is 10% of 250?", options: ["20", "25", "30", "15"], answer: "25" },
    { question: "The average of 10, 20 and 30 is?", options: ["25", "20", "30", "15"], answer: "20" },
    { question: "What is the perimeter of a square of side 4 cm?", options: ["12 cm", "16 cm", "20 cm", "10 cm"], answer: "16 cm" },
    { question: "What is the cube of 3?", options: ["9", "27", "18", "24"], answer: "27" }
  ];
  
  let questions = [];
  let currentQuestion = 0;
  let userAnswers = [];
  let timerInterval;
  
  function shuffleQuestions() {
    return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
  }
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question-number").innerText = `Question ${currentQuestion + 1}`;
    document.getElementById("question-text").innerText = q.question;
  
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
  
    q.options.forEach((opt) => {
      const label = document.createElement("label");
      const isChecked = userAnswers[currentQuestion] === opt ? "checked" : "";
      label.innerHTML = `<input type="radio" name="option" value="${opt}" ${isChecked}/> ${opt}`;
      optionsContainer.appendChild(label);
    });
  }
  
  function getSelectedOption() {
    const options = document.getElementsByName("option");
    for (let opt of options) {
      if (opt.checked) return opt.value;
    }
    return null;
  }
  
  function nextQuestion() {
    const selected = getSelectedOption();
    if (selected) userAnswers[currentQuestion] = selected;
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    }
  }
  
  function prevQuestion() {
    const selected = getSelectedOption();
    if (selected) userAnswers[currentQuestion] = selected;
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  }
  
  function saveAndNext() {
    nextQuestion();
  }
  
  function submitQuiz() {
    clearInterval(timerInterval);
    const selected = getSelectedOption();
    if (selected) userAnswers[currentQuestion] = selected;
  
    let correct = 0;
    userAnswers.forEach((ans, i) => {
      if (ans === questions[i].answer) correct++;
    });
    const incorrect = questions.length - correct;
    const scoreText = `You scored ${correct} out of ${questions.length}`;
    const analysis =
      correct === 10 ? "Excellent!" :
      correct >= 7 ? "Good job!" :
      correct >= 4 ? "Fair. Keep practicing." : "Needs improvement.";
  
    document.getElementById("quiz-container").style.display = "none";
    document.querySelector(".quiz-buttons").style.display = "none";
    document.getElementById("result-container").style.display = "flex";
  
    document.getElementById("score-text").innerText = scoreText;
    document.getElementById("analysis-text").innerText = analysis;
  
    const ctx = document.getElementById("result-chart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Correct", "Incorrect"],
        datasets: [{
          data: [correct, incorrect],
          backgroundColor: ["#28a745", "#dc3545"]
        }]
      }
    });
  }
  
  function retryQuiz() {
    location.reload();
  }
  
  function startTimer(duration) {
    let timer = duration;
    timerInterval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      document.getElementById("timer").innerText = `Time Left: ${minutes}:${seconds.toString().padStart(2, "0")}`;
      if (--timer < 0) {
        clearInterval(timerInterval);
        alert("Time's up!");
        submitQuiz();
      }
    }, 1000);
  }
  
  function goBackToQuizzes() {
    window.location.href = "quizzes.html";
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    questions = shuffleQuestions();
    userAnswers = new Array(questions.length).fill(null);
    loadQuestion();
    startTimer(600); // 10 min
  });
  