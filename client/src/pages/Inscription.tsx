import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Inscription () {
    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showmessage, setShowMessage] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setShowMessage(false);
        if (password !==confirmPassword) {
            setError("Les mots de passes ne correspondent pas.")
            setMessage("");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/formetudiant", {
                lastname,
                firstname,
                email,
                password,
            });
            setMessage("Utilisateur enregistré avec succès !");
            setError("");
            setTimeout(() => {
                setLoading(false);
                setShowMessage(true);
                setTimeout(() => {
                    navigate("/login");
                },1000);
            }, 3000);
        } catch (error) {
            setLoading(false);
            setError("Échec de l'inscription. Veuillez réessayer.");
            setMessage("");
            setShowMessage(true);
        }

    };


    return (
        <div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 items-center justify-center bg-gray-100 rounded-lg">
                <h1>Inscription</h1>

                {showmessage && error && (
                    <p className="text-center text-sm mt- mb-4 text-red-600">
                        {error}
                    </p>
                )}

                {showmessage && message && (
                    <p className="text-center text-sm mt- mb-4 text-green-600">
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="" className="block text-sm mt-4 font-medium text-gray-700">Nom</label>
                        <input 
                        type="text" 
                        className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Entrer votre nom"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="" className="block text-sm mt-4 font-medium text-gray-700">Prenom</label>
                        <input 
                        type="text" 
                        className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Entrer votre prenom"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="" className="block text-sm mt-4 font-medium text-gray-700">Email</label>
                        <input 
                        type="email" 
                        className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrer votre email"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="" className="block text-sm mt-4 font-medium text-gray-700">Mot de passe</label>
                        <input 
                        type="password" 
                        className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrer votre mot de passe"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="" className="block text-sm mt-4 font-medium text-gray-700">Confirmation du mot de passe</label>
                        <input 
                        type="password" 
                        className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmer votre mot de passe"
                        />
                    </div>
                    <button 
                    type="submit"
                    className="w-full py-3 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex justify-center items-center"
                    disabled={loading}
                    >
                       {loading ? (
                            <span className="border-t-2 border-white border-solid w-5 h-5 rounded-full animate-spin"></span>
                        ) : (
                            "S'inscrire"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Inscription;