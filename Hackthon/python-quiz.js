const allQuestions = [
  { question: "What is the output of print(2 ** 3)?", options: ["6", "8", "9", "12"], answer: "8" },
  { question: "Which keyword is used to create a function in Python?", options: ["function", "fun", "define", "def"], answer: "def" },
  { question: "What data type is the result of: 3 / 2?", options: ["int", "float", "double", "str"], answer: "float" },
  { question: "Which of these is a Python tuple?", options: ["[1,2]", "{1,2}", "(1,2)", "<1,2>"], answer: "(1,2)" },
  { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "--"], answer: "#" },
  { question: "Which keyword is used for loops in Python?", options: ["loop", "iterate", "for", "repeat"], answer: "for" },
  { question: "How do you start a class definition in Python?", options: ["define class", "class()", "class:", "class"], answer: "class" },
  { question: "How do you import a module in Python?", options: ["include", "require", "import", "module"], answer: "import" },
  { question: "What does 'len()' do?", options: ["Length of a string", "Length of a list", "Length of any iterable", "All of the above"], answer: "All of the above" },
  { question: "Which of these is a valid Python variable name?", options: ["2data", "data_2", "data-2", "data.2"], answer: "data_2" },
  { question: "What does 'pass' do in Python?", options: ["Terminates loop", "Skips iteration", "Does nothing", "Continues loop"], answer: "Does nothing" },
  { question: "What is the output of bool('False')?", options: ["True", "False"], answer: "True" },
  { question: "Which operator is used for string concatenation?", options: ["&", "+", "*", "."], answer: "+" },
  { question: "How do you open a file for reading?", options: ["open('file')", "open('file', 'r')", "read('file')", "file.open()"], answer: "open('file', 'r')" },
  { question: "What is the output of: type([])?", options: ["<class 'list'>", "<type 'list'>", "list", "List"], answer: "<class 'list'>" },
  { question: "Which keyword is used to handle exceptions?", options: ["catch", "except", "error", "handle"], answer: "except" },
  { question: "What is the correct way to define a lambda function?", options: ["lambda x: x+1", "def lambda x: x+1", "lambda(x): x+1", "function(x): x+1"], answer: "lambda x: x+1" },
  { question: "What is the default return value of a function with no return?", options: ["0", "None", "Empty string", "False"], answer: "None" },
  { question: "Which function returns the type of an object?", options: ["typeof()", "type()", "gettype()", "objecttype()"], answer: "type()" },
  { question: "What is the output of print('a' * 3)?", options: ["aaa", "a3", "Error", "aa a"], answer: "aaa" }
];

// ✅ Corrected here: use allQuestions not questions
const selectedQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);

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

  // ✅ Now statement will show
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
