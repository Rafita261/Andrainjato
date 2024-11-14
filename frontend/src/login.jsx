import React, { useState } from 'react';

function Login({ setHasAccount, setIsAuthenticated }) {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pseudo,
        password,
      }),
      credentials: 'include', // Send cookies with the request (important for session handling)
    });

    const data = await response.json();

    if (response.ok) {
      setIsAuthenticated(true); // Update authentication state to true
      alert(`Bienvenue, ${data.user}`);
    } else {
      setError(data.message || 'Une erreur est survenue.'); // Display error message if available
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          name="pseudo"
          placeholder="Entrez votre pseudo"
          value={pseudo} // Ensure the input is controlled
          onChange={(e) => setPseudo(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          value={password} // Ensure the input is controlled
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Se connecter" className="submit-btn" />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
      <p>
        Vous n'avez pas encore de compte ?{' '}
        <span className="signup-link" onClick={() => setHasAccount(false)}>
          S'inscrire
        </span>
      </p>
    </div>
  );
}

export default Login;
