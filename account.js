// Récupérer les données de l'utilisateur connecté
let currentUser = localStorage.getItem('currentUser');
let userData = JSON.parse(localStorage.getItem(currentUser));

// Mettre à jour l'affichage du solde
document.getElementById('balance').textContent = userData.dirhams;

// Autoriser seulement "benreinermann@gmail.com" à ajouter ou retirer des dirhams
if (currentUser === "benreinermann@gmail.com") {
    document.getElementById('add-dirhams').style.display = 'block';
    document.getElementById('withdraw-dirhams').style.display = 'block';
} else {
    document.getElementById('add-dirhams').style.display = 'none';
    document.getElementById('withdraw-dirhams').style.display = 'none';
}

// Ajouter des dirhams
document.getElementById('add-dirhams').addEventListener('click', function() {
    let amount = prompt("Combien de dirhams voulez-vous ajouter ?");
    amount = parseInt(amount, 10);

    if (isNaN(amount) || amount <= 0) {
        alert("Montant invalide.");
        return;
    }

    userData.dirhams += amount;
    localStorage.setItem(currentUser, JSON.stringify(userData));
    document.getElementById('balance').textContent = userData.dirhams;
});

// Retirer des dirhams
document.getElementById('withdraw-dirhams').addEventListener('click', function() {
    let amount = prompt("Combien de dirhams voulez-vous retirer ?");
    amount = parseInt(amount, 10);

    if (isNaN(amount) || amount <= 0 || amount > userData.dirhams) {
        alert("Montant invalide ou solde insuffisant.");
        return;
    }

    userData.dirhams -= amount;
    localStorage.setItem(currentUser, JSON.stringify(userData));
    document.getElementById('balance').textContent = userData.dirhams;
});

// Envoyer des dirhams
document.getElementById('send-btn').addEventListener('click', function() {
    let recipientEmail = document.getElementById('recipient').value;
    let amountToSend = parseInt(document.getElementById('amount').value, 10);

    if (isNaN(amountToSend) || amountToSend <= 0 || amountToSend > userData.dirhams) {
        alert("Montant invalide ou solde insuffisant.");
        return;
    }

    let recipientData = localStorage.getItem(recipientEmail);
    if (!recipientData) {
        alert("Le destinataire n'existe pas.");
        return;
    }

    recipientData = JSON.parse(recipientData);
    recipientData.dirhams += amountToSend;
    userData.dirhams -= amountToSend;

    localStorage.setItem(currentUser, JSON.stringify(userData));
    localStorage.setItem(recipientEmail, JSON.stringify(recipientData));

    alert("Dirhams envoyés avec succès !");
    document.getElementById('balance').textContent = userData.dirhams;
});
