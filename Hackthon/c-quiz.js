// All 20 questions
const questions = [
  { question: "What is the output of printf(\"%d\", (5 + 2) * 3);?", options: ["21", "17", "15", "Error"], answer: "21" },
  { question: "Which keyword is used to declare a constant in C?", options: ["constant", "const", "final", "static"], answer: "const" },
  { question: "Which operator is used to access the value at a pointer?", options: ["&", "*", "%", "#"], answer: "*" },
  { question: "What is the size of int in C (typically)?", options: ["2 bytes", "4 bytes", "8 bytes", "Depends on compiler"], answer: "4 bytes" },
  { question: "Which loop runs at least once in C?", options: ["for", "while", "do-while", "None"], answer: "do-while" },
  { question: "Which function is used to read a character in C?", options: ["getchar()", "get()", "read()", "getc()"], answer: "getchar()" },
  { question: "What does 'void' mean in a function declaration?", options: ["Returns a value", "No return type", "Variable", "None"], answer: "No return type" },
  { question: "Which symbol is used for single-line comments in C?", options: ["//", "#", "--", "/* */"], answer: "//" },
  { question: "Which header file includes printf()?", options: ["stdlib.h", "string.h", "stdio.h", "math.h"], answer: "stdio.h" },
  { question: "What is the value of an uninitialized int variable?", options: ["0", "Garbage", "NULL", "1"], answer: "Garbage" },
  { question: "Which data type is used to store characters?", options: ["int", "float", "char", "double"], answer: "char" },
  { question: "Which loop is entry controlled?", options: ["while", "do-while", "goto", "None"], answer: "while" },
  { question: "What is the correct file extension for a C source file?", options: [".cp", ".c", ".cpp", ".h"], answer: ".c" },
  { question: "Which function terminates a program in C?", options: ["exit()", "end()", "terminate()", "stop()"], answer: "exit()" },
  { question: "What does 'break' do in C?", options: ["Skips iteration", "Ends loop", "Ends program", "None"], answer: "Ends loop" },
  { question: "Which operator is used to compare two values?", options: ["=", "==", "&&", "<>"], answer: "==" },
  { question: "How do you start a multi-line comment in C?", options: ["/*", "//", "#", "'''"], answer: "/*" },
  { question: "Which memory allocation function is used in C?", options: ["alloc()", "malloc()", "new()", "create()"], answer: "malloc()" },
  { question: "What is the use of sizeof() operator?", options: ["Assign size", "Compare sizes", "Return data type size", "None"], answer: "Return data type size" },
  { question: "Which function compares two strings in C?", options: ["strcmp()", "strcat()", "strcpy()", "strlength()"], answer: "strcmp()" }
];

// Select random 10 questions
const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);

// Variables
let currentQuestion = 0;
let userAnswers = new Array(selectedQuestions.length).fill(null);
let score = 0;

// DOM Elements
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsList = document.getElementById("options");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const reviewSection = document.getElementById("review-section");
const scoreDisplay = document.getElementById("score");
const reattemptBtn = document.getElementById("reattempt-btn");

// Load a question
function loadQuestion(index) {
  const q = selectedQuestions[index];
  questionNumber.innerText = `Question ${index + 1} of ${selectedQuestions.length}`;
  questionText.innerText = q.question;
  optionsList.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.innerText = option;
    li.onclick = () => selectOption(li);
    if (userAnswers[index] === option) li.classList.add("selected");
    optionsList.appendChild(li);
  });

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === selectedQuestions.length - 1;
}

// Select an option
function selectOption(selectedLi) {
  document.querySelectorAll("#options li").forEach(li => li.classList.remove("selected"));
  selectedLi.classList.add("selected");
  userAnswers[currentQuestion] = selectedLi.innerText;
}

// Buttons
prevBtn.onclick = () => {
  currentQuestion--;
  loadQuestion(currentQuestion);
};

nextBtn.onclick = () => {
  if (userAnswers[currentQuestion] !== null) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    alert("Please select an option first.");
  }
};

document.getElementById("save-btn").onclick = () => {
  if (userAnswers[currentQuestion] !== null) {
    alert("Answer saved.");
  } else {
    alert("Please select an option to save.");
  }
};

document.getElementById("save-next-btn").onclick = () => {
  if (userAnswers[currentQuestion] !== null) {
    if (currentQuestion < selectedQuestions.length - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
    }
  } else {
    alert("Please select an option to save & next.");
  }
};

// Submit
submitBtn.onclick = () => {
  if (userAnswers.includes(null)) {
    alert("Please answer all questions before submitting.");
    return;
  }
  calculateResult();
};

// Calculate Result
function calculateResult() {
  clearInterval(timerInterval);
  score = 0;
  userAnswers.forEach((ans, i) => {
    if (ans === selectedQuestions[i].answer) score++;
  });

  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  scoreDisplay.innerText = `You scored ${score} out of ${selectedQuestions.length}.`;

  showReview();
  showChart(score, selectedQuestions.length - score);

  // Show comment
  const statement = document.getElementById("statement");
  if (score === 10) {
    statement.textContent = "🌟 Excellent work!";
  } else if (score >= 8) {
    statement.textContent = "🎯 Very good!";
  } else if (score >= 5) {
    statement.textContent = "👍 Good attempt!";
  } else {
    statement.textContent = "📚 Needs Improvement.";
  }
}

// Review Wrong Answers
function showReview() {
  reviewSection.innerHTML = "<h3>Review Wrong Answers:</h3>";

  selectedQuestions.forEach((q, i) => {
    if (userAnswers[i] !== q.answer) {
      const div = document.createElement("div");
      div.classList.add("review-item");
      div.innerHTML = `
        <p><strong>Q${i + 1}:</strong> ${q.question}</p>
        <p style="color:red;">Your Answer: ${userAnswers[i] || "Not answered"}</p>
        <p style="color:green;">Correct Answer: ${q.answer}</p>
        <hr>
      `;
      reviewSection.appendChild(div);
    }
  });
}

// Show Pie Chart
function showChart(correct, incorrect) {
  const ctx = document.getElementById("result-chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Correct", "Incorrect"],
      datasets: [{
        data: [correct, incorrect],
        backgroundColor: ["#4CAF50", "#F44336"]
      }]
    }
  });
}

// Reattempt
reattemptBtn.onclick = () => {
  location.reload();
};

// Dark Mode
document.getElementById("darkModeToggle").onclick = () => {
  document.body.classList.toggle("dark-mode");
};

// Timer
let timeLeft = 10 * 60;
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").innerText = `Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    alert("⏰ Time's up!");
    calculateResult();
  }
  timeLeft--;
}
const timerInterval = setInterval(updateTimer, 1000);

// Start
loadQuestion(currentQuestion);
