import { useState } from "react";

function ForgotPassword () {

    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showmessage, setShowMessage] = useState(false);

    const handleSubmit =(e:  React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setShowMessage(false);

        setMessage("Un email de réinitialisation a été envoyé à " + email);
        setEmail("");
        
        setTimeout(() => {
            setLoading(false);
            setShowMessage(true);
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Réinitialiser le mot de passe</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                        Adresse email
                        </label>
                        <input 
                        type="email" 
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                        />
                    </div>

                    <button 
                    type="submit"
                    className="w-full  bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 flex justify-center items-center" 
                    disabled={loading}
                    >
                        {loading ? (
                            <span className="border-t-2 border-white border-solid w-5 h-5 rounded-full animate-spin"></span>
                        ) : (
                            "Envoyer le lien de réinitialisation"
                        )}
                    </button>
                </form>
                    {showmessage && message && <p className="text-center text-green-500 mt-4">{message}</p>}
            </div>

        </div>
    )
}

export default ForgotPassword;