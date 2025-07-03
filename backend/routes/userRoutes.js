const express = require("express");
const { createUser, getUsers, deleteUser, updateUser, verifyEmail, setPassword, loginUser } = require("../controllers/userController");
const router = express.Router();

router.post("/formetudiant", createUser);
router.get("/listetudiant", getUsers); // Ajout de la route GET pour récupérer les étudiants
router.delete("/listetudiant/:idUt", deleteUser);
router.put("/listetudiant/:idUt", updateUser);
router.get("/verify-email", verifyEmail);
router.post("/definitionmdp", setPassword);  // Définition du mot de passe
router.post("/login", loginUser);  // Route de connexion

module.exports = router;
