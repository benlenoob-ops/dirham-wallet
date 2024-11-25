// Fonction pour envoyer des dirhams
function sendDirhams() {
  const senderEmail = localStorage.getItem("loggedInUser"); // Email de l'utilisateur connecté
  const recipientEmail = document.getElementById("recipient-email").value.trim(); // Email du destinataire
  const amount = parseInt(document.getElementById("amount").value, 10); // Montant à envoyer

  // Validation de base
  if (!recipientEmail || isNaN(amount) || amount <= 0) {
    alert("Veuillez entrer une adresse e-mail valide et un montant positif.");
    return;
  }

  // Charger les utilisateurs depuis localStorage
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  // Vérifier que le destinataire existe
  if (!users[recipientEmail]) {
    alert("L'utilisateur destinataire n'existe pas !");
    return;
  }

  // Vérifier que l'expéditeur a assez d'argent
  if (!users[senderEmail] || users[senderEmail].balance < amount) {
    alert("Vous n'avez pas assez de dirhams pour cette transaction.");
    return;
  }

  // Effectuer la transaction
  users[senderEmail].balance -= amount;
  users[recipientEmail].balance += amount;

  // Sauvegarder les changements dans localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Confirmer la transaction
  alert(`Vous avez envoyé ${amount} dirhams à ${recipientEmail} !`);

  // Mettre à jour l'affichage du solde
  updateBalance();
}

// Fonction pour afficher le solde actuel de l'utilisateur connecté
function updateBalance() {
  const senderEmail = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  const balanceElement = document.getElementById("balance");
  if (balanceElement && users[senderEmail]) {
    balanceElement.textContent = `Votre solde : ${users[senderEmail].balance} dirhams`;
  }
}

// Fonction à exécuter lors du chargement de la page pour vérifier et afficher le solde
window.onload = function () {
  updateBalance();
};
