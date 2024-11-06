//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
// Your added code starts here
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve saved answers from session storage or initialize an empty object
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Function to save user progress
function saveProgress() {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Function to calculate and display the user's score
function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score); // Save score to local storage
}

// Render questions with the ability to load saved progress
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear any previous content

  questions.forEach((question, i) => {
    const questionContainer = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    question.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");

      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Explicitly set the checked property if this option was previously selected
      if (userAnswers[i] === choice) {
        choiceInput.setAttribute("checked", "true");
        choiceInput.checked = true; // Ensure it's also set as a property
      }

      // Event listener to save progress on selection
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choice; // Save answer in userAnswers object
        saveProgress(); // Update session storage with new progress
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionContainer.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionContainer);
  });
}


submitButton.addEventListener("click", calculateScore);

// Display stored score if available in local storage
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Initial rendering of questions
renderQuestions();

