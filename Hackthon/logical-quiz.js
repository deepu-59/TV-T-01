const allQuestions = [
  { question: "What comes next in the series: 2, 4, 8, 16, ?", options: ["18", "20", "24", "32"], answer: "32" },
  { question: "Which number replaces the question mark: 3, 6, 11, 18, 27, ?", options: ["36", "38", "41", "48"], answer: "38" },
  { question: "If TOMATO is 123123, what is MOTO?", options: ["3123", "2312", "1321", "3213"], answer: "3123" },
  { question: "Odd one out: Circle, Triangle, Sphere, Square", options: ["Circle", "Sphere", "Triangle", "Square"], answer: "Sphere" },
  { question: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?", options: ["Yes", "No", "Cannot be determined", "Only some"], answer: "Yes" },
  { question: "Find missing: 1, 4, 9, 16, ?", options: ["20", "25", "30", "36"], answer: "25" },
  { question: "Which is not a prime number?", options: ["2", "3", "5", "9"], answer: "9" },
  { question: "If CAT = 3120, DOG = ?", options: ["4157", "4715", "4158", "4716"], answer: "4715" },
  { question: "Which letter is next: A, C, F, J, ?", options: ["K", "L", "N", "O"], answer: "O" },
  { question: "Which word doesn't belong?", options: ["Apple", "Banana", "Carrot", "Grapes"], answer: "Carrot" },
  { question: "Next in the sequence: 1, 3, 7, 15, ?", options: ["30", "31", "32", "33"], answer: "31" },
  { question: "Complete the analogy: Pen : Write :: Knife : ?", options: ["Cut", "Peel", "Sharpen", "Point"], answer: "Cut" },
  { question: "If A = 1, Z = 26, then J + L = ?", options: ["20", "21", "22", "23"], answer: "22" },
  { question: "Mirror image of 3:15 will be?", options: ["8:45", "9:45", "10:45", "11:45"], answer: "8:45" },
  { question: "5 kids eat 5 burgers in 5 minutes. How many kids to eat 100 burgers in 100 mins?", options: ["5", "10", "20", "100"], answer: "5" },
  { question: "Logical pair: Hand : Fingers :: Foot : ?", options: ["Toes", "Heel", "Ankle", "Shoe"], answer: "Toes" },
  { question: "Statement: All men are mortal. Socrates is a man. Conclusion?", options: ["Socrates is mortal", "Socrates is immortal", "Unclear", "Socrates is unknown"], answer: "Socrates is mortal" },
  { question: "Code: If ROSE = 6821, how is SORE coded?", options: ["8621", "8126", "8261", "8612"], answer: "8621" },
  { question: "What is the angle between hands at 3:00?", options: ["90°", "75°", "60°", "45°"], answer: "90°" },
  { question: "How many squares in a 3x3 grid?", options: ["9", "14", "16", "18"], answer: "14" }
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