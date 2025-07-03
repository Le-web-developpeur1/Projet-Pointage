const db = require("../config/database");

exports.getDashboardStats = async (req, res) => {
    try {
        const [[totalEtudiants]] = await db.execute("SELECT COUNT(DISTINCT email) AS TotalEtudiants FROM utilisateurs");
        const [[totalPresences]] = await db.execute("SELECT COUNT(*) AS TotalPresences FROM marquage WHERE statut = 'Present'");
        const [[totalAbsences]] = await db.execute("SELECT COUNT(*) AS TotalAbsences FROM marquage WHERE statut = 'Absent'");

        res.json({
            etudiants: totalEtudiants.TotalEtudiants || 0,
            presences: totalPresences.TotalPresences || 0,
            absences: totalAbsences.TotalAbsences || 0,
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des statistiques :", err);
        res.status(500).send("Erreur serveur.");
    }
};
