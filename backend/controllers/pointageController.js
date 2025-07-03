const Pointage = require("../models/Pointage");
const db = require("../config/database");

exports.addMarquage = async (req, res) => {
    try {
        const { idUt, statut, motif } = req.body;  //Vérifier que idUt est bien récupéré
        if (!idUt) return res.status(400).json({ message: "idUt est manquant !" });

        await db.execute(
            "INSERT INTO marquage (idUt, statut, motif) VALUES (?, ?, ?)",
            [idUt, statut, motif]
        );
        res.json({ message: "Marquage ajouté avec succès !" });
    } catch (err) {
        console.error("Erreur lors de l'ajout du marquage :", err);
        res.status(500).send("Erreur serveur.");
    }
};


exports.getPointagesP = async (req, res) => {
    try {
        const results = await Pointage.getPresents();
        if (results.length === 0) {
            return res.status(404).json({ message: "Aucun étudiant présent trouvé." });  
        }

        res.status(200).json(results);   
    } catch (err) {
        console.error("Erreur lors de la récupération des étudiants présents :", err.message);
        res.status(500).json({ error: "Erreur serveur." }); 
    }
};


exports.getPointagesA = async (req, res) => {
    try {
        const results = await Pointage.getAbsents();
        res.send(results);
    } catch (err) {
        console.log("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur serveur.");
    }
};


