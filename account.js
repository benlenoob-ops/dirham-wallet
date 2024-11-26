// Fonction pour mettre à jour le solde de l'utilisateur connecté
function updateBalance() {
    const loggedInUser = localStorage.getItem("currentUser"); // Récupérer l'utilisateur connecté
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[loggedInUser]) {
        document.getElementById("balance").textContent = users[loggedInUser].dirhams + " Dirhams";
    }
}

// Fonction pour ajouter des Dirhams
function addDirhams(amount) {
    const loggedInUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    // Vérifier que l'utilisateur existe et que c'est le bon utilisateur
    if (users[loggedInUser] && loggedInUser === "benreinermann@gmail.com") {
        users[loggedInUser].dirhams += amount;
        localStorage.setItem("users", JSON.stringify(users));
        updateBalance();
        alert("Dirhams ajoutés avec succès !");
    } else {
        alert("Seul l'administrateur peut ajouter des Dirhams.");
    }
}

// Fonction pour retirer des Dirhams
function withdrawDirhams(amount) {
    const loggedInUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    // Vérifier que l'utilisateur existe et que c'est le bon utilisateur
    if (users[loggedInUser] && loggedInUser === "benreinermann@gmail.com") {
        if (users[loggedInUser].dirhams >= amount) {
            users[loggedInUser].dirhams -= amount;
            localStorage.setItem("users", JSON.stringify(users));
            updateBalance();
            alert("Dirhams retirés avec succès !");
        } else {
            alert("Vous n'avez pas assez de Dirhams.");
        }
    } else {
        alert("Seul l'administrateur peut retirer des Dirhams.");
    }
}

// Fonction pour envoyer des Dirhams
function sendDirhams() {
    const loggedInUser = localStorage.getItem("currentUser");
    const recipientEmail = document.getElementById("recipient").value.trim();
    const amount = parseInt(document.getElementById("amount").value, 10);

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    // Validation de base
    if (!recipientEmail || isNaN(amount) || amount <= 0) {
        alert("Veuillez entrer un email valide et un montant positif.");
        return;
    }

    // Vérifier que l'utilisateur et le destinataire existent
    if (!users[loggedInUser]) {
        alert("Utilisateur non trouvé.");
        return;
    }
    if (!users[recipientEmail]) {
        alert("Destinataire non trouvé.");
        return;
    }

    // Vérifier que l'expéditeur a suffisamment de Dirhams
    if (users[loggedInUser].dirhams < amount) {
        alert("Solde insuffisant.");
        return;
    }

    // Effectuer la transaction
    users[loggedInUser].dirhams -= amount;
    users[recipientEmail].dirhams += amount;
    
    localStorage.setItem("users", JSON.stringify(users));
    alert("Vous avez envoyé " + amount + " Dirhams à " + recipientEmail);

    updateBalance();
}

// Ajouter les utilisateurs à la liste de destinataires
function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const recipientSelect = document.getElementById("recipient");

    for (const user in users) {
        if (user !== localStorage.getItem("currentUser")) {
            const option = document.createElement("option");
            option.value = user;
            option.textContent = users[user].username; // Afficher le nom d'utilisateur
            recipientSelect.appendChild(option);
        }
    }
}

// Ajout des événements
document.getElementById("add-dirhams").addEventListener("click", function() {
    const amount = parseInt(prompt("Combien de Dirhams voulez-vous ajouter ?"), 10);
    if (!isNaN(amount) && amount > 0) {
        addDirhams(amount);
    } else {
        alert("Montant invalide.");
    }
});

document.getElementById("withdraw-dirhams").addEventListener("click", function() {
    const amount = parseInt(prompt("Combien de Dirhams voulez-vous retirer ?"), 10);
    if (!isNaN(amount) && amount > 0) {
        withdrawDirhams(amount);
    } else {
        alert("Montant invalide.");
    }
});

document.getElementById("send-btn").addEventListener("click", sendDirhams);

// Charger les utilisateurs et mettre à jour le solde à la connexion
window.onload = function () {
    loadUsers();
    updateBalance();
};
