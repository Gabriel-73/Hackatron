// A mettre en haut de chaque script de page
const state = {
    get ects() { return parseInt(localStorage.getItem('user_ects') || 0); },
    set ects(val) { 
        localStorage.setItem('user_ects', val);
        updateUI();
    }
};
// script/main.js

// Initialise le score au chargement
function init() {
    showMenu();
    updateUI();
}

function ajouterECTS(points) {
    let current = parseInt(localStorage.getItem('user_ects') || 0);
    localStorage.setItem('user_ects', current + points);
    updateUI();
}

function updateUI() {
    const display = document.getElementById('ects-counter');
    const score = parseInt(localStorage.getItem('user_ects') || 0);
    
    if (display) {
        display.innerText = `Crédits : ${score} / 60 ECTS`;
        
        // Effet visuel si score élevé
        if (score >= 60) {
            display.style.color = "gold";
            display.style.boxShadow = "0 0 20px gold";
        }
    }

    // Débloque le bouton final si sur index.html
    const finalBtn = document.getElementById('final-link');
    if (finalBtn && score < 60) {
        finalBtn.style.opacity = "0.3";
        finalBtn.innerText = "🎓 Diplôme (Verrouillé)";
    } else if (finalBtn) {
        finalBtn.style.opacity = "1";
        finalBtn.innerText = "🎓 Obtenir le Diplôme !";
    }
}

document.addEventListener('DOMContentLoaded', init);

// Fonction pour ajouter des ECTS de manière sécurisée
function ajouterECTS(montant) {
    let score = parseInt(localStorage.getItem('user_ects') || 0);
    score += montant;
    localStorage.setItem('user_ects', score);
    updateUI();
}

// Mise à jour de l'affichage sur toutes les pages
function updateUI() {
    const display = document.getElementById('ects-counter');
    if (display) {
        const score = localStorage.getItem('user_ects') || 0;
        display.innerText = `Crédits : ${score} / 60 ECTS`;
    }
}

// Spécifique à la page Associations pour éviter le double-clic
function decouvrirAsso(element, nom, points) {
    if (!localStorage.getItem('visited_' + nom)) {
        localStorage.setItem('visited_' + nom, true);
        element.classList.add('visited');
        ajouterECTS(points);
    }
}

// script/main.js

function startGame() {
    const input = document.getElementById('player-name');
    const name = input.value.trim();

    if (name.length > 2) {
        localStorage.setItem('student_name', name);
        showMenu();
    } else {
        alert("Veuillez entrer un nom valide (min 3 caractères)");
    }
}

function showMenu() {
    const name = localStorage.getItem('student_name');
    const score = parseInt(localStorage.getItem('user_ects') || 0);

    if (name) {
        // Switch d'affichage
        document.getElementById('setup-player').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('display-name').innerText = name.toUpperCase();
        
        // Mise à jour du score
        document.getElementById('ects-counter').innerText = score;

        // Déblocage du diplôme
        if (score >= 60) {
            const finalLink = document.getElementById('final-link');
            finalLink.classList.remove('locked');
            finalLink.querySelector('small').innerText = "PRÊT POUR LE MARCHÉ DU TRAVAIL";
        }
    }
}

// Fonction globale pour ajouter des points (utilisable depuis les autres pages)
function ajouterECTS(montant) {
    let score = parseInt(localStorage.getItem('user_ects') || 0);
    localStorage.setItem('user_ects', score + montant);
    // On met à jour l'affichage si on est sur l'index
    const counter = document.getElementById('ects-counter');
    if(counter) counter.innerText = score + montant;
}

function deconnecter() {
    localStorage.clear();
    location.reload();
}

// Au chargement, on vérifie si l'utilisateur est déjà connecté
window.onload = showMenu;

// Au chargement de chaque page
document.addEventListener('DOMContentLoaded', updateUI);


// Initialisation au chargement
document.addEventListener('DOMContentLoaded', updateUI);
window.onload = majAffichage;