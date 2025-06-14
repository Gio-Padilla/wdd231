let quizData = [];
let selectedQuestions = [];

const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-btn");
const resultsContainer = document.getElementById("results");
const nameInput = document.getElementById("username");
const pastResultsContainer = document.getElementById("past-results");
const viewPastResults = document.getElementById("past-button");
const theModal = document.querySelector("dialog");
const theModalClose = document.querySelector("dialog button");

loadQuizData();
displayPastResults();
submitButton.addEventListener("click", showResults);
viewPastResults.addEventListener("click", showPast);
theModalClose.addEventListener("click", function() {
    theModal.close();
});

async function loadQuizData() {
    try {
        const response = await fetch("./data/quiz.json");
        const data = await response.json();
        quizData = data.questions;
        selectedQuestions = getRandomQuestions(quizData, 5);
        displayQuiz();
    } catch (error) {
        console.error("Failed to load quiz data:", error);
    }
}

function getRandomQuestions(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function displayQuiz() {
    quizContainer.innerHTML = "";
    selectedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        const questionTitle = document.createElement("p");
        questionTitle.textContent = q.question;
        questionDiv.appendChild(questionTitle);
        q.choices.forEach(choice => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question${index}`;
            radio.value = choice;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(choice));
            questionDiv.appendChild(label);
        });
        quizContainer.appendChild(questionDiv);
    });
}

function showResults() {
    const userName = nameInput?.value.trim();
    if (!userName) {
        alert("Please enter your name before submitting.");
        return;
    }
    let score = 0;
    selectedQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name='question${index}']:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });
    resultsContainer.textContent = `${userName}, you scored ${score} out of ${selectedQuestions.length}`;
    saveResult(userName, score);
    displayPastResults();
}

function saveResult(name, score) {
    const stored = JSON.parse(localStorage.getItem("quizResults")) || [];
    stored.push({ name, score });
    localStorage.setItem("quizResults", JSON.stringify(stored));
}

function displayPastResults() {
    pastResultsContainer.innerHTML = "<h3>Past Results</h3>";
    const stored = JSON.parse(localStorage.getItem("quizResults")) || [];
    if (stored.length === 0) {
        pastResultsContainer.innerHTML += "<p>No results yet.</p>";
        return;
    }
    const list = document.createElement("ul");
    stored.forEach(entry => {
        const item = document.createElement("li");
        item.textContent = `${entry.name}: ${entry.score} / ${selectedQuestions.length || 5}`;
        list.appendChild(item);
    });
    pastResultsContainer.appendChild(list);
}

function showPast() {
    theModal.showModal();
}