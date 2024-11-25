// Effacer les données de l'utilisateur dans le localStorage
localStorage.removeItem('currentUser');
localStorage.removeItem('loggedIn');

// Rediriger vers la page de connexion après 1 seconde
setTimeout(function() {
    window.location.href = 'login.html';
}, 1000); // 1000ms = 1 seconde
