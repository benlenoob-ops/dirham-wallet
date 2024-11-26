document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[email]) {
        if (users[email].password === password) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUser', email);
            window.location.href = 'account.html'; // Redirige vers la page de portefeuille
        } else {
            alert('Mot de passe incorrect.');
        }
    } else {
        alert('L\'utilisateur n\'existe pas.');
    }
});
