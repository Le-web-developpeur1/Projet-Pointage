const db = require("../config/database");
const bcrypt = require("bcryptjs");


const User = {
    // ✅ Création d'un utilisateur avec status = "pending"
    create: async (lastname, firstname, email) => {
        return db.execute(
            "INSERT INTO utilisateurs (nom, prenom, email, status, date) VALUES (?, ?, ?, ?, ?)",
            [lastname, firstname, email, "pending", new Date()]
        );
    },

    // ✅ Trouver un utilisateur par email
    findByEmail: async (email) => {
        try {
            const [results] = await db.execute("SELECT idUt, email, password, status FROM utilisateurs WHERE email = ?", [email]);
            return results.length ? { valid: true, user: results[0] } : { valid: false };
        } catch (err) {
            console.error("Erreur SQL :", err);
            return { valid: false };
        }
        
    },

    // ✅ Mise à jour du mot de passe et activation du compte
    updatePassword: async (email, plainPassword) => {
        if (!plainPassword || plainPassword.length < 6 ) {
            return { success: false, error: "Le mot de passe doit contenir au moins 6 caractères." };
        }

        try {
            const hashedPassword = await bcrypt.hash(plainPassword, 10);  // Hash du mot de passe avant enregistrement
            await db.execute("UPDATE utilisateurs SET password = ?, status = 'active' WHERE email = ?", [hashedPassword, email]);
            
            console.log("Nouveau mot de passe enregistré :", hashedPassword); // Vérification du hash
            return { success: true, message: "Mot de passe mis à jour avec succès !" };
        } catch (err) {
            console.error("Erreur lors de la mise à jour du mot de passe :", err);
            return { success: false, error: "Une erreur est survenue lors de la mise à jour du mot de passe." };
        }
    },

    // ✅ Récupérer tous les utilisateurs
    getAll: async () => {
        const [results] = await db.execute("SELECT * FROM utilisateurs");
        return results;
    },

    // ✅ Supprimer un utilisateur
    delete: async (idUt) => {
        return db.execute("DELETE FROM utilisateurs WHERE idUt = ?", [idUt]);
    },

    // ✅ Mettre à jour les infos d'un utilisateur
    update: async (idUt, nom, prenom, email) => {
        return db.execute("UPDATE utilisateurs SET nom = ?, prenom = ?, email = ? WHERE idUt = ?", [nom, prenom, email, idUt]);
    },

    authenticate: async (email, password) => {
        const result = await User.findByEmail(email);
        if (!result.valid) return { success: false, error: "Utilisateur introuvable" };
    
        const user = result.user;
    
        console.log("🔍 Utilisateur récupéré :", user);
        console.log("🛠️ Statut utilisateur récupéré :", user.status);
    
        if (user.status !== "active") return { success: false, error: "Vous devez définir votre mot de passe avant de vous connecter." };

        console.log("🔑 Mot de passe entré :", password);
        console.log("🔐 Mot de passe stocké en base :", user.password);

    
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log("🔍 Comparaison du mot de passe :", isValidPassword);
        if (!isValidPassword) return { success: false, error: "Mot de passe incorrect" };
    
        return { success: true, user };
    }
    
};

module.exports = User;
