const questions = [
  { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: "George Washington" },
  { question: "In which year did World War II end?", options: ["1942", "1945", "1948", "1950"], answer: "1945" },
  { question: "Who discovered America in 1492?", options: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "James Cook"], answer: "Christopher Columbus" },
  { question: "Which empire built the Colosseum?", options: ["Greek", "Byzantine", "Roman", "Ottoman"], answer: "Roman" },
  { question: "When did the French Revolution begin?", options: ["1776", "1789", "1804", "1815"], answer: "1789" },
  { question: "Who was the British Prime Minister during World War II?", options: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Harold Macmillan"], answer: "Winston Churchill" },
  { question: "What wall was torn down in 1989?", options: ["Wall of China", "Berlin Wall", "Hadrian's Wall", "Wall Street"], answer: "Berlin Wall" },
  { question: "What was the name of the ship on which the Pilgrims traveled to America?", options: ["Titanic", "Mayflower", "Santa Maria", "Victoria"], answer: "Mayflower" },
  { question: "Which country gifted the Statue of Liberty to the USA?", options: ["France", "England", "Germany", "Spain"], answer: "France" },
  { question: "Who was the famous queen of ancient Egypt?", options: ["Nefertiti", "Isis", "Cleopatra", "Hatshepsut"], answer: "Cleopatra" },
  { question: "Which ancient civilization built Machu Picchu?", options: ["Aztec", "Maya", "Inca", "Olmec"], answer: "Inca" },
  { question: "Who wrote the Declaration of Independence?", options: ["Benjamin Franklin", "George Washington", "Thomas Jefferson", "James Madison"], answer: "Thomas Jefferson" },
  { question: "Which war was fought between the North and South regions in the United States?", options: ["World War I", "American Revolution", "Civil War", "Korean War"], answer: "Civil War" },
  { question: "When did India gain independence from British rule?", options: ["1945", "1947", "1950", "1952"], answer: "1947" },
  { question: "What was the name of the first man-made satellite launched in 1957?", options: ["Apollo", "Explorer", "Sputnik", "Luna"], answer: "Sputnik" },
  { question: "Who led the Salt March in India?", options: ["Bhagat Singh", "Sardar Patel", "Jawaharlal Nehru", "Mahatma Gandhi"], answer: "Mahatma Gandhi" },
  { question: "Which civilization invented the wheel?", options: ["Greek", "Mesopotamian", "Roman", "Egyptian"], answer: "Mesopotamian" },
  { question: "What was the Cold War primarily about?", options: ["Territory", "Nuclear Arms & Ideology", "Religion", "Oil"], answer: "Nuclear Arms & Ideology" },
  { question: "Who was assassinated in Sarajevo in 1914?", options: ["Franz Joseph", "Gavrilo Princip", "Archduke Franz Ferdinand", "Winston Churchill"], answer: "Archduke Franz Ferdinand" },
  { question: "Where was the Magna Carta signed?", options: ["France", "Rome", "London", "England"], answer: "England" }
];

const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
let currentQuestion = 0;
let userAnswers = new Array(selectedQuestions.length).fill(null);
let score = 0;

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

function selectOption(selectedLi) {
  document.querySelectorAll("#options li").forEach(li => li.classList.remove("selected"));
  selectedLi.classList.add("selected");
  userAnswers[currentQuestion] = selectedLi.innerText;
}

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

submitBtn.onclick = () => {
  if (userAnswers.includes(null)) {
    alert("Please answer all questions before submitting.");
    return;
  }
  calculateResult();
};

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
}

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

reattemptBtn.onclick = () => {
  location.reload();
};

document.getElementById("darkModeToggle").onclick = () => {
  document.body.classList.toggle("dark-mode");
};

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

loadQuestion(currentQuestion);
