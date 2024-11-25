document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password,
        dirhams: 0 // Initialisation avec 0 dirham
    };

    // Stocke les données de l'utilisateur dans le localStorage
    localStorage.setItem(email, JSON.stringify(userData));
    alert('Compte créé avec succès !');
    window.location.href = 'login.html'; // Redirige vers la page de connexion
});
