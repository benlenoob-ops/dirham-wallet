// Fonction pour afficher la liste des utilisateurs dans la page d'envoi de Dirhams
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const recipientSelect = document.getElementById('recipient');

    // Ajouter les utilisateurs au menu déroulant
    for (const email in users) {
        if (users.hasOwnProperty(email) && email !== localStorage.getItem('currentUser')) {
            const option = document.createElement('option');
            option.value = email;
            option.textContent = users[email].username; // Affiche le nom d'utilisateur
            recipientSelect.appendChild(option);
        }
    }
}

// Fonction pour mettre à jour le solde actuel de l'utilisateur connecté
function updateBalance() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const balanceElement = document.getElementById('balance');

    if (currentUser && users[currentUser]) {
        balanceElement.textContent = users[currentUser].balance + ' Dirhams';
    }
}

// Fonction pour ajouter des Dirhams
function addDhirams(amount) {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[currentUser]) {
        users[currentUser].balance += amount;
        localStorage.setItem('users', JSON.stringify(users));
        updateBalance();
    }
}

// Fonction pour retirer des Dirhams
function withdrawDhirams(amount) {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[currentUser] && users[currentUser].balance >= amount) {
        users[currentUser].balance -= amount;
        localStorage.setItem('users', JSON.stringify(users));
        updateBalance();
    } else {
        alert('Solde insuffisant');
    }
}

// Fonction pour envoyer des Dirhams
function sendDirhams() {
    const senderEmail = localStorage.getItem('currentUser');
    const recipientEmail = document.getElementById('recipient').value;
    const amount = parseInt(document.getElementById('amount').value, 10);

    if (!recipientEmail || isNaN(amount) || amount <= 0) {
        alert('Veuillez entrer un destinataire valide et un montant positif.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    // Vérifier que le destinataire existe
    if (!users[recipientEmail]) {
        alert('Le destinataire n\'existe pas.');
        return;
    }

    // Vérifier que l'expéditeur a assez de Dirhams
    if (users[senderEmail].balance < amount) {
        alert('Vous n\'avez pas assez de Dirhams.');
        return;
    }

    // Effectuer la transaction
    users[senderEmail].balance -= amount;
    users[recipientEmail].balance += amount;

    // Sauvegarder les données mises à jour
    localStorage.setItem('users', JSON.stringify(users));
    alert(`Vous avez envoyé ${amount} Dirhams à ${recipientEmail}.`);
    updateBalance();
}

// Charger la liste des utilisateurs et le solde au démarrage de la page
window.onload = function() {
    loadUsers();
    updateBalance();

    // Gérer l'ajout de Dirhams
    document.getElementById('add-dirhams').addEventListener('click', function() {
        const amount = parseInt(prompt('Combien de Dirhams voulez-vous ajouter ?'), 10);
        if (amount > 0) {
            addDhirams(amount);
        } else {
            alert('Veuillez entrer un montant valide.');
        }
    });

    // Gérer le retrait de Dirhams
    document.getElementById('withdraw-dirhams').addEventListener('click', function() {
        const amount = parseInt(prompt('Combien de Dirhams voulez-vous retirer ?'), 10);
        if (amount > 0) {
            withdrawDhirams(amount);
        } else {
            alert('Veuillez entrer un montant valide.');
        }
    });

    // Gérer l'envoi de Dirhams
    document.getElementById('send-btn').addEventListener('click', sendDirhams);
};
