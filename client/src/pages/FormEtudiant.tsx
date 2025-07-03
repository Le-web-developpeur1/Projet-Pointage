import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";  // ✅ Utilisation du service API

function AjouterEtudiant() {
    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setShowMessage(false);

        try {
            const response = await createUser(lastname, firstname, email);  // Appel API via userService.ts
            setMessage(response.message);
            setError("");
            setTimeout(() => {
                navigate("/listetudiant");  // Redirection après succès
            }, 1000);
        } catch (error) {
            setError(error.response?.data?.error || "Erreur lors de l'ajout de l'étudiant.");
            setMessage("");
        } finally {
            setLoading(false);
            setShowMessage(true);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 items-center justify-center bg-gray-100 rounded-lg">
            <h1>Ajouter un étudiant</h1>

            {showMessage && error && <p className="text-center text-sm mt-4 mb-4 text-red-600">{error}</p>}
            {showMessage && message && <p className="text-center text-sm mt-4 mb-4 text-green-600">{message}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="lastname" className="block text-sm mt-4 font-medium text-gray-700">Nom</label>
                <input 
                    type="text" 
                    id="lastname" 
                    required 
                    value={lastname} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Entrer le nom de l'étudiant" 
                    className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />

                <label htmlFor="firstname" className="block text-sm mt-4 font-medium text-gray-700">Prénom</label>
                <input 
                    type="text" 
                    id="firstname" 
                    required value={firstname} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="Entrer le prénom de l'étudiant" 
                    className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />

                <label htmlFor="email" className="block text-sm mt-4 font-medium text-gray-700">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Entrer l'email de l'étudiant" 
                    className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />

                <button type="submit" className="w-full py-3 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex justify-center items-center" disabled={loading}>
                    {loading ? <span className="border-t-2 border-white border-solid w-5 h-5 rounded-full animate-spin"></span> : "Ajouter"}
                </button>
            </form>
        </div>
    )
}

export default AjouterEtudiant;
