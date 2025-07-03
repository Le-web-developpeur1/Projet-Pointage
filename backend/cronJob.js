const cron = require("node-cron");
const db = require("./server");

const resetStatut = async () => {
    try {
        await db.query("UPDATE marquage SET statut = NULL");
        console.log("Tous les statuts ont été réinitialisés");
    } catch (error) {
        console.error("Erreur lors de la réinitialisation:", error);
    }
};

cron.schedule("*/3 * * * *", () => {
    console.log("Test: Réinitialisation des statuts...");
    resetStatut();
}, {
    timezone:"Africa/Conakry"
});

module.export = cron; 