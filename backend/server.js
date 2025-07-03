const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const pointageRoutes = require("./routes/pointageRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Chargement des routes
app.use("/api", userRoutes);
app.use("/api", pointageRoutes);
app.use("/api", dashboardRoutes);


// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
