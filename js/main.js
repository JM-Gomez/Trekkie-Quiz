
const quizQuestions = [// Array of quiz questions with options and answers
    {
        question: "What is the name of the Captain of the USS Enterprise NCC-1701-D?",
        options: ["Jean-Luc Picard", "William Riker", "Benjamin Sisko", "Catherine Janeway"],
        answer: "Jean-Luc Picard",
        
    },
    { 
        question: "What is the name of the Klingon homeworld?",
        options: ["Bajoran", "Vulcan", "Kronos", "Romulus"],
        answer: "Kronos",
        
    },
    {
        question: "What is the Vulcan greeting?",
        options: ["Resistance is futile", "Live long and prosper", "Make it so", "Beam me up, Scotty"],
        answer: "Live long and prosper",
        
    },
    {
        question: "What is the name of the android crew member on the USS Enterprise?",
        options: ["Geordi La Forge", "Worf", "Beverly Crusher", "Data"],
        answer: "Data",
        
    },
    {
        question: "What is the name of the Ferengi rule of acquisition that states 'Never pay more for an acquisition than you have to'?",
        options: ["Rule 34", "Rule 42", "Rule 1", "Rule 6"],
        answer: "Rule 34",
    },
    {
        question: "What is the name of the Starfleet Academy training program that tests cadets' skills in a simulated environment?",
        options: ["The Kobayashi Maru", "The Battle of Wolf 359", "The Genesis Device", "The Neutral Zone"],
        answer: "The Kobayashi Maru",
        
    },
    {
        question: "What is the name of the species that the Borg are afraid of?",
        options: ["Bajoran", "Human", "Hirogen", "Species 8472"],
        answer: "Species 8472",
        
    },
    {
        question: "What is the name of the Starfleet ship that was built to fight the Borg?",
        options: ["USS Akira", "USS Voyager", "USS Defiant", "USS Excelsior"],
        answer: "USS Defiant",
        
    },
    {
        question: "What is the name of the Vulcan science officer on the USS Enterprise NX-01?",
        options: ["Spock", "Sarek", "T'Pol", "Soval"],
        answer: "T'Pol",

    },
    {
        question: "Which officer has appeared in the most Star Trek episodes?",
        options: ["Bradward Boimler", "Miles O'Brien", "Worf", "Tuvok"],
        answer: "Worf",
        
    }
];

const questionElement = document.getElementById("question");
const optionElement = document.querySelectorAll(".option");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15; // 15 seconds for each question
let timer;
let answerSelected = false;


function shuffle(quizQuestions) {// Function to shuffle the quiz questions
    for (let i = quizQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
    }
}


function startQuiz() {// Function to start the quiz and display the first question
    const { question, options } = quizQuestions[currentQuestionIndex];
    questionElement.textContent = question;
    optionElement.forEach((option, index) => {
        option.textContent = options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => selectoption(option);
    });
    answerSelected = false;
    nextButton.disabled = true; // Disable next button until an option is selected
    startTimer(); // Start the timer for the current question
    
}


function selectoption(selectedOption) {
    if (!answerSelected) { //return; // Prevent multiple selections
    answerSelected = true;

    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
        selectedOption.classList.add("correct"); 
        } else {
        selectedOption.classList.add("incorrect");
        optionElement.forEach(selectedOption => {
            if (selectedOption.textContent === correctAnswer) {
                selectedOption.classList.add("correct");
                }
            });
        }
        nextButton.disabled = false; // Enable next button after selection
    }
}

function loadNextQuestion() {
    clearInterval(timer); // Clear the timer for the current question
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        startQuiz();
    } else {
        showResult();
    }
}

nextButton.addEventListener("click", () => {
    loadNextQuestion();
});

function startTimer() {// Function to start the timer for each question
    timeLeft = 15; // Reset timer for each question
    timerElement.textContent = `Time left: ${timeLeft}s`;
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) { 
                // Highlight the correct answer
                const correctAnswer = quizQuestions[currentQuestionIndex].answer;
                optionElement.forEach(option => {
                    if (option.textContent === correctAnswer) {
                        option.classList.add("correct");
                    }
                });
                
                setTimeout(() => {              
                loadNextQuestion(); // Automatically load next question if time runs out
            }, 1500);// Wait 1.5 seconds before loading the next question
        }
    }
    }, 1000); // Update every second
}
startTimer(); // Start the timer for the first question

function showResult() {// Function to display the final score and message
    const quizElement = document.getElementById("quiz");
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");
    scoreElement.textContent = `${score} out of ${quizQuestions.length}`;
    
    const percentage = (score / quizQuestions.length) * 100;// Calculate the percentage score
    let message = "";
    if (percentage === 100) {
        message = "Perfect score! You're a true Star Trek fan!";
    } else if (percentage >= 80) {
        message = "Great job! You know your Star Trek trivia!";
    } else if (percentage >= 50) {
        message = "Good effort! Keep watching Star Trek!";
    } else {
        message = "Better luck next time! Engage with more Star Trek!";
    }
    resultElement.querySelector("p").textContent = message;
    
}

shuffle(quizQuestions); // Shuffle the questions at the start

startQuiz(); // Start the quiz
