// DOM elements for displaying the question, answer buttons, and score
const questionText = document.getElementById("question");
const answerBtns = document.getElementsByClassName("answer-btn");
const correctAnswerText = document.getElementById("amount-of-correct-answers");
const wrongAnswerText = document.getElementById("amount-of-wrong-answers");
const highScoreText = document.querySelector(".high-score");
const scoreText = document.querySelector(".current-score");
const newHighScore = document.getElementById("new-high-score");

let highScore = localStorage.getItem("highScore") === undefined ? localStorage.setItem("highScore", "0") : localStorage.getItem("highScore");
// Array of questions and their corresponding correct answers
let questions = [
    {"question": "Who painted the Mona Lisa?", "answer": "Leonardo da Vinci"},
    {"question": "What is the capital city of Canada?", "answer": "Ottawa"},
    {"question": "What is the chemical symbol for water?", "answer": "H2O"},
    {"question": "In which year did the Titanic sink?", "answer": "1912"},
    {"question": "Who is known as the 'Father of Computers'?", "answer": "Charles Babbage"},
    {"question": "What is the largest planet in our solar system?", "answer": "Jupiter"},
    {"question": "What is the longest river in the world?", "answer": "Nile"},
    {"question": "Who wrote the play 'Romeo and Juliet'?", "answer": "William Shakespeare"},
    {"question": "What is the smallest country in the world?", "answer": "Vatican City"},
    {"question": "What is the name of the famous clock tower in London?", "answer": "Big Ben"}
];

// Variable to store the correct answer button for the current question
let correctBtn;

// Index of the current question
let question = 0;

// Counters for correct and wrong answers
let userGotRight = 0;
let userGotWrong = 0;

console.log(highScore, typeof highScore);

// Initialize the first question
newQuestion();

/**
 * Displays a new question and assigns answers to the buttons.
 * Randomly selects one button to display the correct answer.
 */
function updateScores() {
    highScoreText.textContent = `High Score: ${highScore}`;
    scoreText.textContent = `Current Score: ${userGotRight}`;
}

function newQuestion() {
    let randomBtn = randomNumber(4); // Randomly select one of the four buttons

    if (question != 10) { // Check if there are more questions to display
        for (let i = 0; i < answerBtns.length; i++) {
            // Reset button background color
            answerBtns[i].style.backgroundColor = "rgb(39, 172, 255)";
    
            if (answerBtns[i] === answerBtns[randomBtn]) {
                // Assign the correct answer to the randomly selected button
                correctBtn = answerBtns[i];
                answerBtns[i].textContent = questions[question]["answer"];
            } else {
                // Assign random incorrect answers to the other buttons
                answerBtns[i].textContent = questions[randomNumber(10 - i)]["answer"];
            }
        }
    
        // Display the current question
        questionText.textContent = questions[question]["question"];
    } else {
        // Display the final score when all questions are answered
        correctAnswerText.textContent = `You got: ${userGotRight} answers correct!`;
        wrongAnswerText.textContent = `You got: ${userGotWrong} answers wrong!`;

        if (userGotRight > highScore) {
            localStorage.setItem("highScore", String(userGotRight));
            highScore = localStorage.getItem("highScore");
            newHighScore.textContent = `You got a new high score! ${highScore}`;
        }
    }

    updateScores();
}

/**
 * Checks if the button pressed by the user is the correct answer.
 * Updates the score and moves to the next question.
 * @param {number} btnPressed - Index of the button pressed by the user
 */
function checkIfAnswer(btnPressed) {
    if (answerBtns[btnPressed] === correctBtn) {
        // Correct answer: highlight the button in green
        correctBtn.style.backgroundColor = "rgb(0, 255, 0)";
        userGotRight++; // Increment correct answer counter
        question++; // Move to the next question

        // Load the next question after a short delay
        setTimeout(newQuestion, 300);
    } else {
        // Wrong answer: highlight the correct button in green and the wrong button in red
        correctBtn.style.backgroundColor = "rgb(0, 255, 0)";
        answerBtns[btnPressed].style.backgroundColor = "rgb(255, 0, 0)";
        userGotWrong++; // Increment wrong answer counter
        question++; // Move to the next question

        // Load the next question after a short delay
        setTimeout(newQuestion, 300);
    }
}

/**
 * Generates a random integer between 0 and max - 1.
 * @param {number} max - The upper limit for the random number
 * @returns {number} A random integer
 */
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}