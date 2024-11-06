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
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;
      
      // Check if user answer is already saved
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }
      
      // Event listener to save progress on selection
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        saveProgress();
      });
      
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    });
    
    questionsElement.appendChild(questionElement);
  });
}

// Event listener for the submit button
submitButton.addEventListener("click", calculateScore);

// Display stored score if available in local storage
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Initial rendering of questions
renderQuestions();

