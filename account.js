window.onload = function() {
    updateBalance();
    displayUsers();
};

// Fonction pour afficher la liste des utilisateurs
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';  // Réinitialise la liste

    // Parcours des utilisateurs et ajout à la liste
    for (let email in users) {
        if (users.hasOwnProperty(email)) {
            const user = users[email];
            const li = document.createElement('li');
            li.textContent = user.username;  // Affiche le nom d'utilisateur
            li.addEventListener('click', function() {
                // Demande du montant à envoyer
                const amount = prompt(`Combien de dirhams souhaitez-vous envoyer à ${user.username} ?`);
                if (amount && !isNaN(amount) && amount > 0) {
                    sendDirhams(user.email, parseInt(amount));  // Appel de la fonction d'envoi
                } else {
                    alert('Montant invalide.');
                }
            });
            userList.appendChild(li);
        }
    }
}

// Fonction pour envoyer des Dirhams
function sendDirhams(recipientEmail, amount) {
    const currentUser = localStorage.getItem('currentUser');  // Utilisateur connecté

    // Charger les utilisateurs depuis localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    // Vérifications
    if (!currentUser) {
        alert("Vous devez être connecté pour effectuer une transaction.");
        return;
    }

    if (!recipientEmail || isNaN(amount) || amount <= 0) {
        alert("Veuillez entrer une adresse e-mail valide et un montant positif.");
        return;
    }

    // Vérifier si l'utilisateur destinataire existe
    if (!users[recipientEmail]) {
        alert("L'utilisateur destinataire n'existe pas.");
        return;
    }

    // Vérifier que l'expéditeur a assez de Dirhams
    const sender = users[currentUser];
    if (sender.dirhams < amount) {
        alert("Vous n'avez pas assez de dirhams pour cette transaction.");
        return;
    }

    // Effectuer la transaction
    sender.dirhams -= amount;  // Décrémenter le solde de l'expéditeur
    users[recipientEmail].dirhams += amount;  // Ajouter au solde du destinataire

    // Sauvegarder les modifications dans localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Mise à jour de l'affichage du solde
    updateBalance();

    alert(`Vous avez envoyé ${amount} dirhams à ${users[recipientEmail].username}.`);
}

// Fonction pour mettre à jour l'affichage du solde
function updateBalance() {
    const currentUser = localStorage.getItem('currentUser');  // Utilisateur connecté
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    const balanceElement = document.getElementById('balance');

    if (currentUser && users[currentUser]) {
        balanceElement.textContent = `${users[currentUser].dirhams} Dirhams`;
    } else {
        balanceElement.textContent = "Solde inconnu";
    }
}

// Fonction pour ajouter des Dirhams (uniquement pour benreinermann@gmail.com)
document.getElementById('add-dirhams').addEventListener('click', function() {
    const currentUser = localStorage.getItem('currentUser');  // Utilisateur connecté

    if (currentUser !== "benreinermann@gmail.com") {
        alert("Vous n'avez pas les droits pour ajouter des Dirhams.");
        return;
    }

    const amount = parseInt(prompt("Combien de dirhams voulez-vous ajouter ?"));

    if (isNaN(amount) || amount <= 0) {
        alert("Montant invalide.");
        return;
    }

    // Charger les utilisateurs depuis localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[currentUser]) {
        users[currentUser].dirhams += amount;  // Ajouter des Dirhams à l'utilisateur
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Vous avez ajouté ${amount} Dirhams.`);
    }

    updateBalance();  // Mise à jour du solde
});

// Fonction pour retirer des Dirhams (uniquement pour benreinermann@gmail.com)
document.getElementById('withdraw-dirhams').addEventListener('click', function() {
    const currentUser = localStorage.getItem('currentUser');  // Utilisateur connecté

    if (currentUser !== "benreinermann@gmail.com") {
        alert("Vous n'avez pas les droits pour retirer des Dirhams.");
        return;
    }

    const amount = parseInt(prompt("Combien de dirhams voulez-vous retirer ?"));

    if (isNaN(amount) || amount <= 0) {
        alert("Montant invalide.");
        return;
    }

    // Charger les utilisateurs depuis localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[currentUser] && users[currentUser].dirhams >= amount) {
        users[currentUser].dirhams -= amount;  // Retirer des Dirhams de l'utilisateur
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Vous avez retiré ${amount} Dirhams.`);
    } else {
        alert("Vous n'avez pas assez de Dirhams pour retirer ce montant.");
    }

    updateBalance();  // Mise à jour du solde
});
