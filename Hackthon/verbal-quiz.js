const allQuestions = [
    { question: "Choose the synonym of 'Abandon'", options: ["Leave", "Keep", "Hold", "Maintain"], answer: "Leave" },
    { question: "Choose the antonym of 'Brave'", options: ["Courageous", "Bold", "Cowardly", "Daring"], answer: "Cowardly" },
    { question: "Fill in the blank: He ______ to school every day.", options: ["go", "goes", "going", "gone"], answer: "goes" },
    { question: "Identify the correct spelling:", options: ["Occurance", "Occurrence", "Ocurrence", "Occurence"], answer: "Occurrence" },
    { question: "Choose the correctly punctuated sentence.", options: ["Its raining outside.", "It's raining outside.", "Its' raining outside.", "Its raining, outside."], answer: "It's raining outside." },
    { question: "Choose the correct passive form: She writes a letter.", options: ["A letter wrote by her.", "A letter is written by her.", "A letter has written by her.", "A letter was wrote by her."], answer: "A letter is written by her." },
    { question: "Choose the correct article: ___ honest man.", options: ["A", "An", "The", "None"], answer: "An" },
    { question: "Select the one word substitution: A person who writes dictionaries", options: ["Novelist", "Biographer", "Lexicographer", "Editor"], answer: "Lexicographer" },
    { question: "Choose the correct sentence:", options: ["He don't know.", "He doesn't knows.", "He doesn't know.", "He not know."], answer: "He doesn't know." },
    { question: "Choose the best option: She is good ___ painting.", options: ["in", "at", "with", "to"], answer: "at" },
    { question: "Choose the synonym of 'Swift'", options: ["Slow", "Lazy", "Fast", "Still"], answer: "Fast" },
    { question: "Identify the error: He is senior than me.", options: ["He", "is", "senior", "than"], answer: "than" },
    { question: "Select the plural form of 'Crisis'", options: ["Crises", "Crisis'", "Crisises", "Crisises'"], answer: "Crises" },
    { question: "Fill in the blank: They have been waiting ___ morning.", options: ["since", "for", "from", "by"], answer: "since" },
    { question: "Choose the antonym of 'Generous'", options: ["Mean", "Kind", "Helpful", "Gentle"], answer: "Mean" },
    { question: "Select the correct idiom: 'To turn a deaf ear'", options: ["To pay attention", "To ignore", "To insult", "To understand"], answer: "To ignore" },
    { question: "Which is an example of a preposition?", options: ["Quickly", "Beautiful", "Under", "Jump"], answer: "Under" },
    { question: "Choose the correct question tag: She can sing, ___?", options: ["can she?", "can't she?", "doesn't she?", "didn't she?"], answer: "can't she?" },
    { question: "Pick the correct sentence:", options: ["I have seen him yesterday.", "I seen him yesterday.", "I saw him yesterday.", "I seeing him yesterday."], answer: "I saw him yesterday." },
    { question: "Choose the correct form: The sun ___ in the east.", options: ["rise", "rises", "rising", "rose"], answer: "rises" }
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
  