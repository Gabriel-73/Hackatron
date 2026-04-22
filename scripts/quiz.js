const questions = fetch("quizzes/questions.json").then(res => res.json());

let currentQ = 0;

function loadQuestion() {
    const quizDiv = document.getElementById('quiz-box');
    const q = questions[currentQ];
    
    quizDiv.innerHTML = `
        <h3>Question ${currentQ + 1}</h3>
        <p>${q.Question}</p>
        ${q.Propositions[0].map((rep, i) => `<button onclick="checkAnswer(${i})">${rep}</button>`).join('')}
    `;
}

function checkAnswer(index) {
    if (index === questions[currentQ].Reponse) {
        ajouterECTS(10);
        alert("Correct ! +10 ECTS");
    } else {
        alert("Raté... pas d'ECTS ici.");
    }
    
    currentQ++;
    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = "<h3>Cours terminés !</h3><a href='index.html'><button>Retour au hall</button></a>";
    }
}

// Lancer le quiz au chargement
document.addEventListener('DOMContentLoaded', loadQuestion);