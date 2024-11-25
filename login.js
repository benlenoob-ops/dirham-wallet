document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = localStorage.getItem(email);

    if (userData) {
        const { password: storedPassword } = JSON.parse(userData);
        
        if (storedPassword === password) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUser', email);
            window.location.href = 'account.html'; // Redirige vers le portefeuille
        } else {
            alert('Mot de passe incorrect.');
        }
    } else {
        alert('L\'utilisateur n\'existe pas.');
    }
});
