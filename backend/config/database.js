const mysql = require('mysql2/promise'); 

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pointage'
});

(async () => {
    try {
        await db.getConnection(); 
        console.log("Base de données connectée.");
    } catch (err) {
        console.error("Connexion échouée :", err);
    }
})();

module.exports = db;
