const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyper Tool Markup Language"
    ],
    answer: 2
  },
  {
    question: "Who is making the Web standards?",
    options: [
      "Mozilla",
      "Microsoft",
      "Google",
      "W3C"
    ],
    answer: 3
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    options: [
      "<heading>",
      "<h6>",
      "<head>",
      "<h1>"
    ],
    answer: 3
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: [
      "<break>",
      "<br>",
      "<lb>",
      "<b>"
    ],
    answer: 1
  },
  {
    question: "Which character is used to indicate an end tag?",
    options: [
      "^",
      "/",
      "<",
      "*"
    ],
    answer: 1
  },
  {
    question: "How can you make a numbered list?",
    options: [
      "<ul>",
      "<ol>",
      "<dl>",
      "<list>"
    ],
    answer: 1
  },
  {
    question: "What is the correct HTML for creating a hyperlink?",
    options: [
      "<a>http://example.com</a>",
      "<a href='http://example.com'>Example</a>",
      "<link>example.com</link>",
      "<href>example.com</href>"
    ],
    answer: 1
  },
  {
    question: "Which HTML element defines emphasized text?",
    options: [
      "<italic>",
      "<i>",
      "<em>",
      "<strong>"
    ],
    answer: 2
  },
  {
    question: "Which attribute specifies an alternate text for an image?",
    options: [
      "title",
      "src",
      "alt",
      "longdesc"
    ],
    answer: 2
  },
  {
    question: "In HTML, which attribute is used to specify that an input field must be filled out?",
    options: [
      "validate",
      "placeholder",
      "formvalidate",
      "required"
    ],
    answer: 3
  }
];

let currentQuestion = 0;
let userAnswers = Array(quizData.length).fill(null); // To store selected answers

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectOption(index, li);
    if (userAnswers[currentQuestion] === index) {
      li.classList.add("selected");
    }
    optionsEl.appendChild(li);
  });
}

function selectOption(index, liElement) {
  userAnswers[currentQuestion] = index;
  const allOptions = document.querySelectorAll("#options li");
  allOptions.forEach(li => li.classList.remove("selected"));
  liElement.classList.add("selected");
}

function saveAnswer() {
  if (userAnswers[currentQuestion] == null) {
    alert("Please select an option before saving!");
  } else {
    alert("Answer Saved!");
  }
}

function saveAndNext() {
  if (userAnswers[currentQuestion] == null) {
    alert("Please select an option before moving to next question!");
    return;
  }
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    submitQuiz();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function submitQuiz() {
  let score = 0;
  userAnswers.forEach((ans, index) => {
    if (ans === quizData[index].answer) {
      score++;
    }
  });

  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = score;
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Start the quiz
loadQuestion();
