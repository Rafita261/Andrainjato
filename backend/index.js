const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require("express-session");

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend
    credentials: true,  // Permet d'envoyer des cookies entre différentes origines
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: '2MCT',
    password: '2MCT@database',
    database: 'andrainjato'
});

db.connect((err) => {
    if (err) {
        console.log('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connexion réussie à la base de données MySQL');
});

// Configuration du middleware de session
app.use(session({
    secret: 'andrainjato', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // Assurez-vous de passer à 'true' en production (HTTPS requis)
        maxAge: 1000 * 60 * 60 * 24, // Durée de vie du cookie : 24 heures
    },
}));

// Route pour la connexion
app.post('/api/login', (req, res) => {
    const { pseudo, password } = req.body;

    const query = 'SELECT * FROM USER WHERE pseudo = ? AND password = SHA1(?)';
    db.query(query, [pseudo, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        if (results.length > 0) {
            req.session.user = { pseudo };  // Stocke le pseudo dans la session
            res.json({ success: true, message: 'Connexion réussie', user: pseudo });
        } else {
            res.status(401).json({ success: false, message: 'Pseudo ou mot de passe incorrect' });
        }
    });
});

// Route pour vérifier si l'utilisateur est connecté
app.get('/api/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user.pseudo });
    } else {
        res.json({ loggedIn: false });
    }
});

// Route pour la déconnexion
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erreur de déconnexion' });
        }
        res.json({ success: true, message: 'Déconnexion réussie' });
    });
});

// Démarrage du serveur
app.listen(port, function () {
    console.log(`Serveur express en écoute sur http://localhost:${port}`);
});
