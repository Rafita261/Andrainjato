import React from 'react';
import './App.css'

function HomePage({ setIsAuthenticated }) {
  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    const response = await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      credentials: 'include', // Nécessaire pour envoyer les cookies de session
    });

    const data = await response.json();
    if (response.ok) {
      setIsAuthenticated(false); // Met à jour l'état d'authentification
      alert(data.message); // Affiche le message de déconnexion
    } else {
      alert('Erreur lors de la déconnexion');
    }
  };

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil !</h1>
      <p>Vous êtes connecté.</p>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default HomePage;
