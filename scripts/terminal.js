const output = document.getElementById('terminal-output');
const input = document.getElementById('terminal-input');

const projets = {
    'web': "Site E-commerce en JS - Note: 18/20. Tech: HTML/CSS/JS.",
    'bdd': "Gestion de bibliothèque en SQL - Schéma relationnel complet.",
    'java': "Jeu de plateau en POO - Implémentation du Design Pattern Strategy."
};

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        executeCommand(input.value.toLowerCase());
        input.value = '';
    }
});

function executeCommand(cmd) {
    let p = document.createElement('p');
    p.innerHTML = `<span style="color: var(--main-green)">$ ${cmd}</span>`;
    
    if (cmd === 'ls') {
        p.innerHTML += `<br>Projets disponibles : ${Object.keys(projets).join('  ')}`;
    } else if (projets[cmd]) {
        p.innerHTML += `<br>> ${projets[cmd]}`;
        // On donne des ECTS la première fois qu'ils consultent un projet
        if (!localStorage.getItem('projet_' + cmd)) {
            localStorage.setItem('projet_' + cmd, true);
            ajouterECTS(5);
        }
    } else if (cmd === 'help') {
        p.innerHTML += "<br>Commandes : ls, clear, help, [nom_du_projet]";
    } else if (cmd === 'clear') {
        output.innerHTML = ''; return;
    } else {
        p.innerHTML += "<br>Commande inconnue.";
    }
    
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}