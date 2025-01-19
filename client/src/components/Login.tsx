import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur au début
    
    try {
      const response = await fetch('http://localhost:7000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Vérifie ce que le backend retourne
        setSuccess(true); // Mettre à jour pour indiquer un succès
        window.location.href = data.redirectTo; // Redirige vers une autre page
      } else if (response.status === 401) {
        setError('Email ou mot de passe incorrect.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };


    return (
        <div className="flex items-center justify-center bg-gray-100">
          {/* Conteneur principal */}
          <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Section gauche : Logo et texte */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-8">
              {/* Ajoutez ici votre image */}
              <img
                src="src/assets/télécharger-removebg-preview.png" // Remplacez par le chemin de votre image
                alt="Simplon Logo"
                className="h-21 mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-700 mb-2">SIMPLON PO2-PITA</h1>
              <p className="text-gray-600 text-center">
                La plateforme pour marquer la présence des étudiants
              </p>
            </div>
    
            {/* Section droite : Formulaire */}
            <div className="flex-1 p-8">
              <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Connexion</h2>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                {/* Adresse email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@gmail.com"
                    className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
    
                {/* Mot de passe */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
    
                {/* Lien de mot de passe oublié */}
                <div className="text-right mb-4">
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
    
                {/* Bouton de connexion */}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Se connecter
                </button>
              </form>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && <p style={{ color: 'green' }}>Connexion réussie !</p>}
            </div>
          </div>
        </div>
      );
};

export default Login;