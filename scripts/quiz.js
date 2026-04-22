let currentQ = 0;
let options = [];

const quizDiv = document.getElementById('quiz-box');

function loadAmphi() {
    quizDiv.innerHTML = `
        <h2>Bienvenu à l'amphithéâtre de l'USMB !</h2>
        <p>Vous êtes ici pour suivre les cours et obtenir vos ECTS. Chaque cours vous permettra de gagner des points, alors soyez attentif !</p>
        <p>Voulez-vous suivre un cours ou commencer un examen ?</p>
        <button onclick="loadQuestions('cours')">Suivre un cours</button>
        <button onclick="loadQuestions('exam')">Passer un examen</button>
    `;
}

function randomizeOrder(res, arr, type) {
    const newArr = [];
    if (type === "exam") {
        arr.push(res);
        while (arr.length > 0) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            newArr.push(arr[randomIndex]);
            arr.splice(randomIndex, 1);
        }
    } else {
        let randomIndex = Math.floor(Math.random() * arr.length+1);
        if (randomIndex >= arr.length) {
            newArr.push(res);
            randomIndex = Math.floor(Math.random() * arr.length);
            newArr.push(arr[randomIndex]);
        } else {
            newArr.push(arr[randomIndex]);
            newArr.push(res);
        }
    }
    return newArr;
}

function loadQuestions(type) {
    options = [];
    options = randomizeOrder(questions.Reponse[currentQ], questions.Propositions[currentQ], type);
    quizDiv.innerHTML = `
        <h3>Question ${currentQ + 1}</h3>
        <p>${questions.Questions[currentQ]}</p>
        ${options.map((option, index) => `<button onclick='checkAnswer(${index}, "${type}")'>${option}</button>`).join('')}
    `;
}

function loadNext(isCorrect, type) {
    if (currentQ < questions.Questions.length - 1) {
        currentQ++;
        loadQuestions(type);
    } else {
        if (type === "cours") {
            ajouterECTS(1);
        };
        quizDiv.innerHTML = `
            <h2>Félicitations, vous avez terminé le quiz !</h2>
            <button onclick='loadAmphi()'>Retour à l'amphithéâtre</button>
        `;
        currentQ = 0;
    }
}

function checkAnswer(answ, type) {
    if (options[answ] === questions.Reponse[currentQ]) {
        showResult(true, type);
        if (type === "exam") {
            ajouterECTS(60);
        }
    } else {
        showResult(false, type);
        if (type === "exam") {
            ajouterECTS(-2);
        }
    }
}

function showResult(isCorrect, type) {
    quizDiv.innerHTML = `
        <h3>${isCorrect ? "Bonne réponse !" : "Mauvaise réponse..."}</h3>
        <p>${questions.Explications[currentQ]}</p>
        <button onclick='loadNext(${isCorrect}, "${type}")'>Question suivante</button>
    `;
}

// Lancer le quiz au chargement
document.addEventListener('DOMContentLoaded', loadAmphi());

// Quizzes

const questions = {
    "Questions" : [
        "Quel ingénieur célèbre a donner son nom au premier ordinateur ?",
        "Quel est le langage de programmation le plus utilisé en 2024 ?",
        "De quelle classe 'Metaclass class' est-elle l'instance ?"
    ],
    "Reponse" : [
        "Alan Turing",
        "Python",
        "Metaclass"
    ],
    "Propositions" : [
        [ "Charles Babbage", "Bill Gates", "Ada Lovelace" ],
        [ "Java", "C++", "Ada" ],
        [ "Class", "Object", "Kamoulox" ]
    ],
    "Explications" : [
        "Alan Turing est considéré comme l'un des pères de l'informatique moderne. Il a conçu la machine de Turing, un modèle théorique de calcul qui a jeté les bases de l'ordinateur. Pendant la Seconde Guerre mondiale, il a également joué un rôle crucial dans le décryptage des codes nazis, ce qui a contribué à raccourcir la guerre et à sauver de nombreuses vies.",
        "Python est un langage de programmation polyvalent et facile à apprendre, ce qui en fait le choix préféré de nombreux développeurs en 2024. Il est largement utilisé dans des domaines tels que l'intelligence artificielle, le développement web, la science des données et l'automatisation, ce qui contribue à sa popularité croissante.",
        "En SmallTalk, 'Metaclass class' est l'instance de la classe 'Metaclass'. Les classes sont elles-mêmes des objets, et les métaclasses sont des classes qui définissent le comportement des classes. Ainsi, 'Metaclass class' est une instance de 'Metaclass', ce qui illustre la nature réflexive du langage."
    ]
}