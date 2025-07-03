const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../mailer");
const db = require("../config/database");

exports.createUser = async (req, res) => {
    const { lastname, firstname, email } = req.body;
    if (!lastname || !firstname || !email) return res.status(400).send({ error: "Tous les champs sont requis." });

    try {
        await User.create(lastname, firstname, email, "pending");  // Création sans token, status = "pending"

        const mailOptions = {
            from: "developpeurwebmobile5@gmail.com",
            to: email,
            subject: "Définissez votre mot de passe",
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h1 style="color: #0056b3; text-align: center;">🎓 Bienvenue sur votre plateforme !</h1>
        <p>Bonjour <strong>${lastname}</strong>,</p>
        <p>Félicitations ! Vous avez été inscrit(e) sur votre plateforme de gestion des présences. Cela marque le début d’une expérience fluide pour suivre vos présences et absences, tout en restant organisé(e) au quotidien.</p>
        <p style="text-align: center;">
            <a href="http://localhost:5174/definitionmdp?email=${email}" style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Définir mon mot de passe</a>
        </p>
        <p>🚨 <strong>Important</strong> : Ce lien est valable pour 24 heures uniquement, passé ce delai, vous ne pourrez plus définir votre mot de passe, alors ne tardez pas !</p>
        <p>Une fois connecté(e), vous pourrez :</p>
        <ul>
            <li>Marquer votre présence en un clic,</li>
            <li>Consulter votre historique de présences et absences,</li>
            <li>Justifier vos absences avec un motif si nécessaire.</li>
        </ul>
        <p>SIMPLON GUINÉE est ravi de vous accompagner dans votre parcours. Si vous avez des questions, n'hésitez pas à nous contacter.</p>
        <p>Cordialement,<br><strong>L'équipe de gestion des présences</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.9em; color: #555;">PS : Rappelez-vous, les présences ne peuvent pas être marquées le week-end. Alors pendant les week-ends, reposez-vous et revenez en pleine forme les lundis ! 😊</p>
    </div>
</div>`,  // ✅ Lien basé sur email
        };

        transporter.sendMail(mailOptions);
        res.status(201).send({ message: "Utilisateur ajouté et email envoyé avec succès." });
    } catch (err) {
        console.error("Erreur :", err);
        res.status(500).send({ error: "Erreur serveur." });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const [results] = await db.execute("SELECT * FROM utilisateurs");
        res.json(results);
    } catch (err) {
        console.error("Erreur lors de la récupération des étudiants :", err);
        res.status(500).send("Erreur serveur.");
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { idUt } = req.params;
        await db.execute("DELETE FROM utilisateurs WHERE idUt = ?", [idUt]);
        res.send({ message: "Étudiant supprimé avec succès !" });
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        res.status(500).send("Erreur serveur.");
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { idUt } = req.params;
        const { nom, prenom, email } = req.body;
        await db.execute("UPDATE utilisateurs SET nom = ?, prenom = ?, email = ? WHERE idUt = ?", [nom, prenom, email, idUt]);
        res.send({ message: "Étudiant modifié avec succès !" });
    } catch (err) {
        console.error("Erreur lors de la modification :", err);
        res.status(500).send("Erreur serveur.");
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const result = await User.findByEmail(email);

        if (result.valid) {
            return res.json({ valid: true });
        } else {
            return res.status(400).json({ valid: false, error: "Email introuvable." });
        }
    } catch (err) {
        console.error("Erreur lors de la vérification de l'email :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
};


exports.setPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mettre à jour le mot de passe et activer le compte
        await db.execute("UPDATE utilisateurs SET password = ?, status = 'active' WHERE email = ?", [hashedPassword, email]);
        
        res.json({ message: "Mot de passe défini avec succès !" });
    } catch (err) {
        console.error("Erreur lors de la définition du mot de passe :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
};

exports.loginUser = async (req, res) => {
    try {
        console.log("Requête reçue pour /api/login :", req.body);  // Vérification de la requête
        const { email, password } = req.body;
        const authResult = await User.authenticate(email, password);

        if (!authResult.success) {
            console.log("Échec de l'authentification :", authResult.error);
            return res.status(400).json({ error: authResult.error });
        }

        const user = authResult.user;
        console.log("Connexion réussie pour :", user.email + user.role);

        const token = jwt.sign({ idUt: user.idUt, email: user.email, role: user.role }, "SECRET_KEY", { expiresIn: "2h" });
        res.status(200).json({
            success: true,  //Ajout pour signaler le succès au frontend
            message: "Connexion réussie !",
            token,
            user: { idUt: user.idUt, email: user.email, role: user.role }  
        });    
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
};


