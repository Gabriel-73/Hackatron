document.addEventListener('DOMContentLoaded', () => {
    const score = parseInt(localStorage.getItem('user_ects') || 0);
    const content = document.getElementById('final-content');
    
    if (score < 60) {
        content.innerHTML = `
            <h2 style="color: red;">Accès Refusé</h2>
            <p>Tu n'as pas assez de crédits ECTS pour valider ton année (${score}/60).</p>
            <a href="index.html"><button>Retourner réviser</button></a>
        `;
    } else {
        content.innerHTML = `
            <h2 class="glitch">Félicitations, Diplômé !</h2>
            <p>Voici tes perspectives d'avenir :</p>
            <ul>
                <li>🚀 <strong>Master IA :</strong> Pour devenir ingénieur de recherche.</li>
                <li>💻 <strong>Développeur Fullstack :</strong> Pour créer les applis de demain.</li>
                <li>🛡️ <strong>Expert Cybersécurité :</strong> Pour protéger les infrastructures.</li>
            </ul>
            <button onclick="reinitialiser()">Recommencer le cursus</button>
        `;
    }
});

function reinitialiser() {
    localStorage.clear();
    window.location.href = 'index.html';
}