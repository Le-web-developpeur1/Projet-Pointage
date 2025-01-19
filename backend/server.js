import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 7000;

const corsOptions = {
  origin : 'http://localhost:5173',
  methods : ['GET', 'POSTE', 'PUT', 'DELETE'],
  allowedHeaders : ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Route pour la racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil de votre serveur !');
});

// Point de terminaison pour la connexion
app.post('/api/login', (req, res) => {
  try {
      const { email, password } = req.body;
      console.log('Email reçu :', email);
      console.log('Mot de passe reçu :', password);

      // Validation simple (à adapter selon ton projet)
      if (email === 'user@example.com' && password === 'password123') {
          return res.status(200).json({ message: 'Connexion réussie', redirectTo: '/home' });
      } else {
          return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }
  } catch (err) {
      console.error('Erreur serveur :', err);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
