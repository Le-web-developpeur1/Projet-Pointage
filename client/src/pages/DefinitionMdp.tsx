import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail, setPassword } from "../services/userService";  // Importation des appels API centralisés

function DefinitionMdp() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");  // On récupère `email`
    const [password, setPasswordValue] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkEmail = async () => {
            try {
                const response = await verifyEmail(email);  // Vérification de l'email avec `userService.ts`
                if (response.valid) {
                    setValidEmail(true);
                } else {
                    setError("Lien invalide ou expiré.");
                }
            } catch (err) {
                setError("Erreur de connexion au serveur.");
            }
        };
        if (email) {
            checkEmail();
        }
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            setLoading(false);
            return;
        }

        try {
            const response = await setPassword(email, password);  // Appel API via `userService.ts`
            setMessage(response.message || "Mot de passe défini avec succès !");
            setLoading(true);
            setTimeout(() => {
                navigate("/login")
            },2000);
        } catch (err) {
            setError(err.response?.data?.error || "Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 items-center justify-center bg-gray-100 rounded-lg">
            <h1>Définir votre mot de passe</h1>
            
            {error && <p className="text-red-600 text-center">{error}</p>}
            {message && <p className="text-green-600 text-center">{message}</p>}

            {validEmail ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="password" className="block text-sm mt-4 font-medium text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm mt-4 font-medium text-gray-700">Confirmez le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirmez votre mot de passe"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? <span className="border-t-2 border-white border-solid w-5 h-5 rounded-full animate-spin"></span> : "Définir mot de passe"}
                    </button>
                </form>
            ) : (
                <p className="text-gray-600 text-center mt-4">Vérification du lien en cours...</p>
            )}
        </div>
    );
}

export default DefinitionMdp;
