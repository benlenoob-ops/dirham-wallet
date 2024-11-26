document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Vérification de l'existence de l'utilisateur
    const existingUser = JSON.parse(localStorage.getItem('users') || '{}');
    if (existingUser[email]) {
        alert("Cet email est déjà utilisé.");
        return;
    }

    const userData = {
        username: username,
        email: email,
        password: password,
        dirhams: 0 // Initialisation avec 0 dirham
    };

    // Stocke les données de l'utilisateur dans le localStorage
    existingUser[email] = userData;
    localStorage.setItem('users', JSON.stringify(existingUser));

    alert('Compte créé avec succès !');
    window.location.href = 'login.html'; // Redirige vers la page de connexion
});
