const allQuestions = [
  { question: "Who is the current Secretary-General of the United Nations (as of 2024)?", options: ["Ban Ki-moon", "Antonio Guterres", "Kofi Annan", "Tedros Adhanom"], answer: "Antonio Guterres" },
  { question: "Which country hosted the G20 Summit in 2023?", options: ["India", "Indonesia", "Italy", "Brazil"], answer: "India" },
  { question: "Who is the President of the United States as of April 2024?", options: ["Donald Trump", "Joe Biden", "Kamala Harris", "Barack Obama"], answer: "Joe Biden" },
  { question: "Which Indian state launched the 'Gruha Lakshmi' scheme for women?", options: ["Kerala", "Karnataka", "Tamil Nadu", "Andhra Pradesh"], answer: "Karnataka" },
  { question: "Which country recently became the newest member of BRICS (2024)?", options: ["Argentina", "Saudi Arabia", "UAE", "Iran"], answer: "Argentina" },
  { question: "Who won the Nobel Peace Prize in 2023?", options: ["Narges Mohammadi", "Alexei Navalny", "Volodymyr Zelenskyy", "Malala Yousafzai"], answer: "Narges Mohammadi" },
  { question: "Which movie won the Best Picture Oscar in 2024?", options: ["Oppenheimer", "Everything Everywhere All at Once", "Barbie", "The Fabelmans"], answer: "Oppenheimer" },
  { question: "Which tech company became the first to reach $4 trillion market cap?", options: ["Apple", "Microsoft", "Amazon", "Google"], answer: "Apple" },
  { question: "Which country won the 2023 Cricket World Cup?", options: ["India", "England", "Australia", "Pakistan"], answer: "Australia" },
  { question: "What is the name of the new AI model launched by OpenAI in 2024?", options: ["ChatGPT-4", "GPT-5", "Codex-2", "Whisper-2"], answer: "GPT-5" },
  { question: "Where were the 2024 Summer Olympics held?", options: ["Tokyo", "Los Angeles", "Paris", "Beijing"], answer: "Paris" },
  { question: "What is the name of India's third lunar mission?", options: ["Chandrayaan-3", "Chandrayaan-4", "Vikram-3", "Moonshot-3"], answer: "Chandrayaan-3" },
  { question: "Which Indian became the first woman to win gold at the World Athletics Championship?", options: ["Hima Das", "PT Usha", "Neeraj Chopra", "Parul Chaudhary"], answer: "Parul Chaudhary" },
  { question: "Which country leads the global lithium reserves as of 2024?", options: ["Australia", "Bolivia", "China", "India"], answer: "Bolivia" },
  { question: "Who is the CEO of Twitter (now X) as of 2024?", options: ["Elon Musk", "Linda Yaccarino", "Jack Dorsey", "Parag Agrawal"], answer: "Linda Yaccarino" },
  { question: "Which state became the first to pass a law for AI regulations in India?", options: ["Maharashtra", "Kerala", "Karnataka", "Tamil Nadu"], answer: "Tamil Nadu" },
  { question: "Which bank merged with HDFC Ltd in 2023?", options: ["ICICI Bank", "Axis Bank", "SBI", "HDFC Bank"], answer: "HDFC Bank" },
  { question: "Which Indian city topped the Global Liveability Index 2023?", options: ["Delhi", "Bangalore", "Mumbai", "Hyderabad"], answer: "Hyderabad" },
  { question: "Which Indian was appointed as World Bank Chief Economist in 2023?", options: ["Raghuram Rajan", "Indermit Gill", "Gita Gopinath", "Arvind Subramanian"], answer: "Indermit Gill" },
  { question: "India signed a Free Trade Agreement in 2024 with which bloc?", options: ["EU", "ASEAN", "GCC", "EFTA"], answer: "EFTA" }
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
