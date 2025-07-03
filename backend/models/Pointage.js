const db = require("../config/database");

const Pointage = {
    addMarquage: async (idUt, statut, motif) => {
        return db.execute(
            "INSERT INTO marquage (idUt, statut, motif) VALUES (?, ?, ?)",
            [idUt, statut, motif]
        );
    },

    getPresents: async () => {
        try {
            const [results] = await db.execute(`
                SELECT 
                    u.idUt, u.nom, u.prenom, u.email,
                    m.date
                FROM utilisateurs u JOIN marquage m ON u.idUt = m.idUt
                WHERE m.statut = 'Present'
                ORDER BY m.date DESC
                `
            );
            console.log("Etudiants présents avec leurs détails :", results)
            return results;
        } catch (err) {
            console.error("Erreur lors du chargement des étudiants présents :", err);
            return [];
        }
    },

    getAbsents : async () => {
        try {
            const [results] = await db.execute(`
                SELECT 
                    u.idUt, u.nom, u.prenom, u.email,
                    m.date
                FROM utilisateurs u JOIN marquage m ON u.idUt = m.idUt
                WHERE m.statut = 'Absent'
                ORDER BY m.date DESC
            `)
            console.log("Etudiants absents avec leurs détalils :", results)
            return results;
        } catch (err) {
            console.error("Erreur lors du chargement des étudiants absents :", err);
            return [];
        }
    },


};

module.exports = Pointage;
