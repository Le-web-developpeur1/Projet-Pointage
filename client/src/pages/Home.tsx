import { useState, useEffect } from "react";
import { marquerPointage } from "../services/pointageService";
import { Link } from 'react-router-dom';
    
    const Home = () => {
        const [statut, setStatut] = useState("");
        const [motif, setMotif] = useState("");
        const [userId, setUserId] = useState(null);
    
        useEffect(() => {
            const storedUserId = localStorage.getItem("userId");  // ✅ Récupération de l'ID connecté
            if (storedUserId) {
                setUserId(parseInt(storedUserId, 10));
            }
        }, []);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            if (!statut) {
                alert("Veuillez sélectionner votre statut !");
                return;
            }
    
            else if (!userId) {
                alert("Erreur : ID utilisateur non trouvé !");
                return;
            }
    
            try {
                await marquerPointage(userId, statut, statut === "absent" ? motif : null);
                alert(`${statut === "present" ? "Présence validée" : "Absence enregistrée"} avec succès !`);
            } catch (error) {
                alert("Une erreur est survenue lors de l'enregistrement.");
            }
        };
    
        return (
            <div className="w-screen bg-gray-100">
                <div className="w-screen h-screen bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center border-b border-t">
                        <h1 className="text-xl font-bold text-gray-700">Marquez votre statut</h1>
                    </div>
    
                    <nav className="text-sm text-gray-500 mt-2">
                        Dashboard / <span className="text-gray-700 font-medium">Marquez votre statut</span>
                    </nav>
    
                    <div>
                        <button className="float-end mt-1 text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-100">
                            <Link to={'/historique'}>Voir mon historique</Link>
                        </button>
                    </div>
    
                    <div className="mt-11 bg-gray-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Marquez votre présence ou absence</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center">
                                    <input type="radio" name="statut" value="present" className="form-radio"
                                        onChange={(e) => setStatut(e.target.value)} />
                                    <span className="ml-2 text-gray-700">Présent</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="statut" value="absent" className="form-radio"
                                        onChange={(e) => setStatut(e.target.value)} />
                                    <span className="ml-2 text-gray-700">Absent</span>
                                </label>
                            </div>
                            {statut === "absent" && (
                                <textarea onChange={(e) => setMotif(e.target.value)}
                                    className="mt-2 p-2"
                                    placeholder="Veuillez indiquer le motif de votre absence."
                                    rows={4} cols={40} required></textarea>
                            )}
                            <button type="submit"
                                className="mt-6 ml-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                                Enregistrer
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
    
    export default Home;
    