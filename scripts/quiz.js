const questions = [
    { q: "En info, que signifie 'HTML' ?", r: ["HyperText Markup Language", "High Tech Machine Language"], correct: 0 },
    { q: "Quelle complexité est la meilleure ?", r: ["O(n²)", "O(1)", "O(n)"], correct: 1 },
    { q: "Qui a créé le Web ?", r: ["Steve Jobs", "Tim Berners-Lee", "Bill Gates"], correct: 1 }
];

let currentQ = 0;

function loadQuestion() {
    const quizDiv = document.getElementById('quiz-box');
    const q = questions[currentQ];
    
    quizDiv.innerHTML = `
        <h3>Question ${currentQ + 1}</h3>
        <p>${q.q}</p>
        ${q.r.map((rep, i) => `<button onclick="checkAnswer(${i})">${rep}</button>`).join('')}
    `;
}

function checkAnswer(index) {
    if (index === questions[currentQ].correct) {
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