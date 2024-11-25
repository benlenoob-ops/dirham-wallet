// Envoyer des dirhams
document.getElementById('transfer-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    const recipientEmail = document.getElementById('recipient-email').value;
    let transferAmount = parseInt(document.getElementById('amount').value);

    // Vérification de l'email du destinataire
    if (!localStorage.getItem(recipientEmail + '-dhirams')) {
        alert("Le destinataire n'existe pas ou l'email est incorrect.");
        return;
    }

    // Vérification du montant : doit être un nombre, positif et inférieur ou égal au solde
    if (isNaN(transferAmount) || transferAmount <= 0 || transferAmount > dhirams) {
        alert("Montant invalide.");
        return;
    }

    // Mise à jour du solde de l'expéditeur et du destinataire
    let recipientDhirams = parseInt(localStorage.getItem(recipientEmail + '-dhirams')) || 0;

    // Décrémenter les dirhams de l'expéditeur et ajouter au destinataire
    dhirams -= transferAmount;
    recipientDhirams += transferAmount;

    // Sauvegarder les nouveaux soldes dans localStorage
    localStorage.setItem(currentUser + '-dhirams', dhirams); // Mettre à jour l'expéditeur
    localStorage.setItem(recipientEmail + '-dhirams', recipientDhirams); // Mettre à jour le destinataire

    // Mettre à jour l'affichage
    document.getElementById('dhirams-amount').innerText = dhirams;

    alert(`Vous avez envoyé ${transferAmount} dirhams à ${recipientEmail}.`);
});
