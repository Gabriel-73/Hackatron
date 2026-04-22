let currentQ = 0;
let options = [];

function randomizeOrder(res, arr) {
    arr.push(res);
    const newArr = [];
    while (arr.length > 0) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        newArr.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
    }
    return newArr;
}

function loadQuestion() {
    const quizDiv = document.getElementById('quiz-box');
    options = randomizeOrder(questions.Reponse[currentQ], questions.Propositions[currentQ]);
    
    quizDiv.innerHTML = `
        <h3>Question ${currentQ + 1}</h3>
        <p>${questions.Questions[currentQ]}</p>
        ${options.map((option, index) => `<button onclick='checkAnswer(${index})'>${option}</button>`).join('')}
    `;
}

function checkAnswer(answ) {
    if (options[answ] === questions.Reponse[currentQ]) {
        ajouterECTS(10);
        alert("Correct ! +10 ECTS");
    } else {
        alert("Raté... pas d'ECTS ici.");
    }
    
    currentQ++;
    if (currentQ < questions.Questions.length) {
        loadQuestion();
    } else {
        document.querySelector('.game-container').innerHTML = "<h3>Cours terminés !</h3><a href='index.html'><button>Retour au hall</button></a>";
    }
}

// Lancer le quiz au chargement
document.addEventListener('DOMContentLoaded', loadQuestion);

// Quizzes

const questions = {
    "Questions" : [
        "Quel est le nom de l'école d'ingénieurs de l'UTC ?",
        "Quel ingénieur célèbre a donner son nom au premier ordinateur ?"
    ],
    "Reponse" : [
        "L'UTC",
        "Charles Babbage"
    ],
    "Propositions" : [
        [ "L'UTT", "L'UPJV", "L'UNIV-PARIS-SACLAY" ],
        [ "Alan Turing", "Bill Gates", "Ada Lovelace" ]
    ],
    "Explications" : [
        "L'UTC, ou Université de Technologie de Compiègne, est une école d'ingénieurs située à Compiègne, en France. Elle fait partie du réseau des universités de technologie et propose des formations dans divers domaines de l'ingénierie.",
        "Charles Babbage est un ingénieur britannique qui a conçu le premier ordinateur mécanique programmable, connu sous le nom de machine analytique."
    ]
}