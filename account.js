// Importation des fonctions Firebase nécessaires
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBp-Wr27trteEBYhME-FPmgoy5_ub8Nh0Q",
    authDomain: "dirhams-f50cf.firebaseapp.com",
    projectId: "dirhams-f50cf",
    storageBucket: "dirhams-f50cf.firebasestorage.app",
    messagingSenderId: "737493283081",
    appId: "1:737493283081:web:b66865276fb537424a23d8",
    measurementId: "G-GFL5T1ES6B"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

// Fonction pour afficher les utilisateurs
function displayUsers() {
    const usersRef = ref(db, 'users');
    get(usersRef).then(function(snapshot) {
        const users = snapshot.val();
        const userList = document.getElementById('user-list');
        userList.innerHTML = ''; // Vide la liste avant d'afficher

        for (let uid in users) {
            const user = users[uid];
            const li = document.createElement('li');
            li.textContent = user.email + ' - Dirhams: ' + user.dirhams;
            const sendButton = document.createElement('button');
            sendButton.textContent = 'Envoyer Dirhams';
            sendButton.onclick = function() {
                const amount = prompt("Combien de dirhams souhaitez-vous envoyer?");
                if (amount && !isNaN(amount)) {
                    sendDirhams(uid, parseInt(amount));
                }
            };
            li.appendChild(sendButton);
            userList.appendChild(li);
        }
    });
}

// Fonction pour ajouter des dirhams
function addDirhams(amount) {
    const user = auth.currentUser;
    if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        get(userRef).then(function(snapshot) {
            const currentDirhams = snapshot.val().dirhams || 0;
            const newDirhams = currentDirhams + amount;
            update(userRef, { dirhams: newDirhams });
            alert('Dirhams ajoutés avec succès!');
        });
    } else {
        alert('Vous devez être connecté pour ajouter des dirhams.');
    }
}

// Fonction pour retirer des dirhams
function removeDirhams(amount) {
    const user = auth.currentUser;
    if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        get(userRef).then(function(snapshot) {
            const currentDirhams = snapshot.val().dirhams || 0;
            if (currentDirhams >= amount) {
                const newDirhams = currentDirhams - amount;
                update(userRef, { dirhams: newDirhams });
                alert('Dirhams retirés avec succès!');
            } else {
                alert('Solde insuffisant.');
            }
        });
    } else {
        alert('Vous devez être connecté pour retirer des dirhams.');
    }
}

// Fonction pour envoyer des dirhams entre utilisateurs
function sendDirhams(receiverUid, amount) {
    const user = auth.currentUser;
    if (user) {
        const senderRef = ref(db, 'users/' + user.uid);
        const receiverRef = ref(db, 'users/' + receiverUid);

        get(senderRef).then(function(snapshot) {
            const senderDirhams = snapshot.val().dirhams || 0;
            if (senderDirhams >= amount) {
                get(receiverRef).then(function(snapshot) {
                    const receiverDirhams = snapshot.val().dirhams || 0;
                    update(senderRef, { dirhams: senderDirhams - amount });
                    update(receiverRef, { dirhams: receiverDirhams + amount });
                    alert('Dirhams envoyés avec succès!');
                });
            } else {
                alert('Solde insuffisant pour envoyer des dirhams.');
            }
        });
    } else {
        alert('Vous devez être connecté pour envoyer des dirhams.');
    }
}

// Fonction pour l'inscription d'un utilisateur
document.getElementById('signup-btn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(function(userCredential) {
            const user = userCredential.user;
            const userRef = ref(db, 'users/' + user.uid);
            set(userRef, {
                email: user.email,
                dirhams: 0
            });
            alert("Inscription réussie!");
            window.location.href = "home.html"; // Rediriger vers la page principale après inscription
        })
        .catch(function(error) {
            alert("Erreur d'inscription : " + error.message);
        });
});

// Fonction pour la connexion d'un utilisateur
document.getElementById('login-btn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(function(userCredential) {
            const user = userCredential.user;
            alert("Connexion réussie!");
            window.location.href = "home.html"; // Rediriger vers la page principale après connexion
            displayUsers(); // Affiche les utilisateurs lorsque connecté
        })
        .catch(function(error) {
            alert("Erreur de connexion : " + error.message);
        });
});

// Observer l'état de connexion
onAuthStateChanged(auth, function(user) {
    if (user) {
        // Utilisateur connecté
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('user-list-container').style.display = 'block';
        displayUsers(); // Affiche la liste des utilisateurs
    } else {
        // Utilisateur déconnecté
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('user-list-container').style.display = 'none';
    }
});
