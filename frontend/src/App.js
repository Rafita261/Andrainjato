import './App.css';
import { useState, useEffect } from 'react';
import Login from './login.jsx';
import Signup from './Signup.jsx';
import HomePage from './HomePage.jsx';

function App() {
  const [hasAccount, setHasAccount] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérification de la session lors du chargement
  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch('http://localhost:5000/api/check-session', {
        method: 'GET',
        credentials: 'include', // Nécessaire pour les cookies de session
      });
      const data = await response.json();
      if (data.loggedIn) {
        setIsAuthenticated(true);
      }
    };
    checkSession();
  }, []);

  // Gestion de l'état d'authentification
  return (
    <div className="App">
      <h1 className='App-header'>Andrainjato Students</h1>
      <br />
      <br />
      {isAuthenticated ? (
        <div>
          <HomePage setIsAuthenticated={setIsAuthenticated} />
        </div>
      ) : (
        <>
        <br />
          <h2>{hasAccount ? 'Connexion' : 'Inscription'}</h2>
          <br />
          {hasAccount ? (
            <Login setHasAccount={setHasAccount} setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Signup setHasAccount={setHasAccount} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
