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
const optionsElement = document.getElementById("options");
const answerButton = document.getElementById("answer");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0; 

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
        alert("Correct!");
    } else {
        alert(`Wrong! The correct answer is: ${currentQuestion.answer}`);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}
function endQuiz() {
    questionElement.innerHTML = `Quiz Over! Your score is ${score} out of ${quizQuestions.length}.`;
    answerButton.innerHTML = "";
    nextButton.innerHTML = "Restart";
    nextButton.onclick = startQuiz;
}