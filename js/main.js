const quizQuestions = [
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
        question: "What is the name of the Vulcan greeting?",
        options: ["Live long and prosper", "Resistance is futile", "Make it so", "Beam me up, Scotty"],
        answer: "Live long and prosper",
        
    },
    {
        question: "What is the name of the android crew member on the USS Enterprise?",
        options: ["Data", "Geordi La Forge", "Worf", "Beverly Crusher"],
        answer: "Data",
        
    },
    {
        question: "What is the name of the Ferengi rule of acquisition that states 'Never pay more for an acquisition than you have to'?",
        options: ["Rule 34", "Rule 42", "Rule 1", "Rule 6"],
        answer: "Rule 34",
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
let timeLeft = 10; // 10 seconds for each question
let timer;
let answerSelected = false;


function startQuiz() {
    const { question, options } = quizQuestions[currentQuestionIndex];
    questionElement.textContent = question;
    optionElement.forEach((option, index) => {
        option.textContent = options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => selectoption(option);
    });
    answerSelected = false;
}

function selectoption(selectedOption) {
    if (!answerSelected) { //return; // Prevent multiple selections
    answerSelected = true;

    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        selectedOption.classList.add("correct"); 
        } else {
        selectedOption.classList.add("incorrect");
        optionElement.forEach(selectedOption => {
            if (selectedOption.textContent === correctAnswer) {
                selectedOption.classList.add("correct");
            }
        });
    }
    }

    clearInterval(timer);
    nextButton.disabled = false;
}

startQuiz();