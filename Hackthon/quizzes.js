// Add options as buttons
category.options.forEach(option => {
  const button = document.createElement("button");
  button.className = "option-btn";
  button.textContent = option;
  
  button.onclick = () => {
      if (option === "Python") {
          window.location.href = "python-quiz.html";
      } else if (option === "c-quiz.html") {
          window.location.href = "c-quiz.html";
      } else if (option === "HTML") {
          window.location.href = "html-quiz.html";
      } else if (option === "Current Affairs") {
          window.location.href = "current-affairs-quiz.html";
      } else if (option === "History") {
          window.location.href = "history-quiz.html";
      } else if (option === "Geography") {
          window.location.href = "geography-quiz.html";
      } else if (option === "Quantitative") {
          window.location.href = "quantitative-quiz.html";
      } else if (option === "Verbal Ability") {
          window.location.href = "verbal-quiz.html";
      } else if (option === "Logical Reasoning") {
          window.location.href = "logical-quiz.html";
      } else {
          alert(`Quiz for ${option} is not available yet!`);
      }
  };

  card.appendChild(button);
});
