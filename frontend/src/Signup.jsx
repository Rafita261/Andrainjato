import React from 'react';

function Signup({ setHasAccount }) {
    return (
        <div className="signup-container">
            <form method="post" className="signup-form">
                <input type="text" name="pseudo" placeholder="Choisissez un pseudo" className="input-field" /> <br />
                <input type="email" name="email" placeholder="Entrez votre email" className="input-field" /> <br />
                <input type="password" id='pass1' name="password" placeholder="Créez un mot de passe" className="input-field" /> <br />
                <input type="password" id='pass2' placeholder="Vérifier votre mot de passe" className="input-field" /> <br />
                <input type="submit" value="S'inscrire" className="submit-btn" />
            </form>
            <p>Vous avez déjà un compte ? <span className="login-link" onClick={() => setHasAccount(true)}>Se connecter</span></p>
        </div>
    );
}

export default Signup;
