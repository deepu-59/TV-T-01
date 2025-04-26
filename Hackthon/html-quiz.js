const allQuestions = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyperlinks and Text Markup Language", "None of these"], answer: "Hyper Text Markup Language" },
  { question: "Who is making the Web standards?", options: ["Mozilla", "Microsoft", "The World Wide Web Consortium", "Google"], answer: "The World Wide Web Consortium" },
  { question: "Choose the correct HTML element for the largest heading:", options: ["<h1>", "<heading>", "<h6>", "<head>"], answer: "<h1>" },
  { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<br>", "<lb>", "<newline>"], answer: "<br>" },
  { question: "What is the correct HTML for adding a background color?", options: ["<body style='background-color:yellow;'>", "<background>yellow</background>", "<body bg='yellow'>", "<bgcolor='yellow'>"], answer: "<body style='background-color:yellow;'>" },
  { question: "Which character is used to indicate an end tag?", options: ["/", "<", "^", "*"], answer: "/" },
  { question: "How can you make a numbered list?", options: ["<ol>", "<ul>", "<dl>", "<list>"], answer: "<ol>" },
  { question: "What is the correct HTML for creating a hyperlink?", options: ["<a href='url'>link</a>", "<a>url</a>", "<a name='url'>link</a>", "<link>url</link>"], answer: "<a href='url'>link</a>" },
  { question: "Which HTML element defines the title of a document?", options: ["<title>", "<meta>", "<head>", "<body>"], answer: "<title>" },
  { question: "Which HTML element is used to specify a footer for a document?", options: ["<bottom>", "<footer>", "<section>", "<aside>"], answer: "<footer>" },
  { question: "Inline elements are normally displayed without starting a new ____.", options: ["page", "line", "block", "paragraph"], answer: "line" },
  { question: "What does the <em> tag do?", options: ["Makes text italic", "Makes text bold", "Adds a heading", "Creates a table"], answer: "Makes text italic" },
  { question: "How do you insert a comment in HTML?", options: ["<!-- Comment -->", "// Comment", "/* Comment */", "# Comment"], answer: "<!-- Comment -->" },
  { question: "Which HTML tag is used to define an internal style sheet?", options: ["<style>", "<css>", "<script>", "<link>"], answer: "<style>" },
  { question: "The <hr> tag in HTML is used for:", options: ["A thematic break", "A horizontal rule", "A line separator", "All of the above"], answer: "All of the above" },
  { question: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<break>", "<lb>", "<newline>"], answer: "<br>" },
  { question: "How do you create a checkbox in HTML?", options: ["<input type='checkbox'>", "<checkbox>", "<input checkbox>", "<input type='check'>"], answer: "<input type='checkbox'>" },
  { question: "Which tag is used to define a table row in HTML?", options: ["<tr>", "<td>", "<table>", "<th>"], answer: "<tr>" },
  { question: "Which input type defines a slider control?", options: ["range", "slider", "scroll", "number"], answer: "range" },
  { question: "Which tag is used to define a table cell?", options: ["<td>", "<tr>", "<th>", "<cell>"], answer: "<td>" }
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
