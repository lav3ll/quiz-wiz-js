// Start button

// Timer presented with each question

// When answered => show next question

// If answered incorrectly => Remove time from the clock

// When all questions are answered the timer is set to zero
// Game over function

// When game is over => save initials and score to localStorage;

// Bring in variables that will be used
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const startScreenEl = document.getElementById("start-screen");
const questionsEl = document.getElementById("questions");
const questionTitleEl = document.getElementById("question-title");
const choicesEl = document.getElementById("choices");
const endScreenEl = document.getElementById("end-screen");
const feedbackEl = document.getElementById("feedback");

// Create object holding questions
const questions = [
  {
    title: "Commonly used data types do not include",
    a: ["strings", false],
    b: ["booleans", false],
    c: ["alerts", true],
    d: ["numbers", false],
  },
  {
    title: "The condition in an if / else statement is enclosed with ____.",
    a: ["quotes", false],
    b: ["curly brackets", false],
    c: ["parenthesis", true],
    d: ["square brackets", false],
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    a: ["numbers and strings", false],
    b: ["other arrays", false],
    c: ["booleans", false],
    d: ["all of the above", true],
  },
  {
    title:
      "String values ust be enclosed within ____ when being assigned to variables.",
    a: ["commas", false],
    b: ["curly brackets", false],
    c: ["quotes", true],
    d: ["parenthesis", false],
  },
  {
    title:
      "A Very useful tool used during development and debugging for printint content to the debugger is:",
    a: ["strings", false],
    b: ["booleans", false],
    c: ["alerts", true],
    d: ["numbers", false],
  },
];

// Create Timer
let currentQuestionIndex = 0;
let timeLeft = 75;
let countdownTimer;

function countdown() {
  timeEl.textContent = timeLeft;
  countdownTimer = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      endQuiz();
    }
  }, 1000);
}

console.log(questions[1].a[0]);

function startQuiz() {
  alert("Quiz has begun");
  startScreenEl.classList.add("hide");
  questionsEl.classList.remove("hide");
  displayNextQuestion();
  countdown();
}

// Create a function that generates the questions
function displayNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = ""; // Clear previous choices

    const choices = ["a", "b", "c", "d"];

    for (let i = 0; i < choices.length; i++) {
      const liButton = document.createElement("button");
      const liEl = document.createElement("li");

      liButton.textContent = currentQuestion[choices[i]][0];
      liButton.classList.add("choice-button");
      liButton.setAttribute("data-answer", currentQuestion[choices[i]][1]);

      liButton.addEventListener("click", function () {
        const isCorrect = JSON.parse(this.getAttribute("data-answer"));
        if (!isCorrect) {
          timeLeft -= 10; // Subtract 10 seconds for wrong answer
          if (timeLeft < 0) timeLeft = 0;
        }
        currentQuestionIndex++;
        displayNextQuestion();
      });

      const listItemText = document.createTextNode(
        `${choices[i].toUpperCase()}: `
      ); // Displaying the list item number
      liEl.appendChild(listItemText);
      liEl.appendChild(liButton);

      choicesEl.appendChild(liEl);
    }
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(countdownTimer);
}

startBtn.addEventListener("click", startQuiz);

// Create Game Over Function
