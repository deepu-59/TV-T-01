const allQuestions = [
  { question: "What is the largest continent by area?", options: ["Africa", "Asia", "North America", "Europe"], answer: "Asia" },
  { question: "Which is the longest river in the world?", options: ["Amazon", "Yangtze", "Mississippi", "Nile"], answer: "Nile" },
  { question: "Mount Everest is located in which mountain range?", options: ["Andes", "Rockies", "Alps", "Himalayas"], answer: "Himalayas" },
  { question: "Which country has the most natural lakes?", options: ["USA", "Russia", "Canada", "India"], answer: "Canada" },
  { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
  { question: "Which desert is the largest in the world?", options: ["Gobi", "Kalahari", "Sahara", "Antarctic Desert"], answer: "Antarctic Desert" },
  { question: "Which ocean lies on the east coast of the United States?", options: ["Indian", "Pacific", "Arctic", "Atlantic"], answer: "Atlantic" },
  { question: "Which country has the highest population?", options: ["India", "USA", "China", "Indonesia"], answer: "China" },
  { question: "What is the smallest country in the world?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], answer: "Vatican City" },
  { question: "Which continent is known as the 'Dark Continent'?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
  { question: "Which is the largest ocean on Earth?", options: ["Indian", "Atlantic", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "Which city is known as the 'City of Canals'?", options: ["Venice", "Amsterdam", "Bangkok", "Bruges"], answer: "Venice" },
  { question: "Which two countries share the longest international border?", options: ["Russia-China", "Canada-USA", "Argentina-Chile", "India-Bangladesh"], answer: "Canada-USA" },
  { question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], answer: "Brasília" },
  { question: "Which river flows through Paris?", options: ["Thames", "Danube", "Rhine", "Seine"], answer: "Seine" },
  { question: "Which U.S. state is the largest by area?", options: ["Texas", "California", "Alaska", "Montana"], answer: "Alaska" },
  { question: "Which continent is completely in the Southern Hemisphere?", options: ["Africa", "Australia", "Asia", "Europe"], answer: "Australia" },
  { question: "Which African country has the highest population?", options: ["Kenya", "South Africa", "Nigeria", "Egypt"], answer: "Nigeria" },
  { question: "Which mountain is the highest in Africa?", options: ["Mount Kenya", "Mount Elgon", "Mount Kilimanjaro", "Drakensberg"], answer: "Mount Kilimanjaro" },
  { question: "The Great Barrier Reef is located in which country?", options: ["Fiji", "Australia", "New Zealand", "Indonesia"], answer: "Australia" }
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
  startTimer(600); // 10 minutes
});
