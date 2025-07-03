// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';


// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showmessage, setShowMessage] = useState(false);
//   const navigate = useNavigate();


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true); 
//     setShowMessage(false);

//     try {
//         const response = await axios.post('http://localhost:7000/api/login', {
//             email,
//             password
//         });
//         localStorage.setItem('token', response.data.token);
//         setMessage('Connexion réussie');
//         setError('');
//         setTimeout(() => {
//           setLoading(false);
//           setShowMessage(true);
//           setTimeout(() => {
//             navigate("/dashboard"); // Redirection après 3 secondes
//           }, 1000)
//       }, 3000);
       
//     } catch (error) {
//       setTimeout(() => {
//       setLoading(false); // Désactivation du loader après la réponse
//       setError('Email ou mot de passe incorrect');
//       setMessage('');
//       setShowMessage(true);
//      }, 1000);
//     }
//   };


//     return (
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  items-center justify-center bg-gray-100">
//           <div className=" flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
//             <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-8">
//               <img
//                 src="src/assets/télécharger-removebg-preview.png"
//                 alt="Simplon Logo"
//                 className="h-21 mb-4"
//               />
//               <h1 className="text-2xl font-bold text-gray-700 mb-2">SIMPLON PO2-PITA</h1>
//               <p className="text-gray-600 text-center">
//                 La plateforme pour marquer la présence des étudiants
//               </p>
//             </div>
    
//             <div className="flex-1 p-8">
//               <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Connexion</h2>
//               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//               <form onSubmit={handleSubmit}>
//                 {/* Adresse email */}
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Adresse email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="exemple@gmail.com"
//                     className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
    
//                 {/* Mot de passe */}
//                 <div className="mb-4">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Mot de passe <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="••••••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
    
//                 {/* Lien de mot de passe oublié */}
//                 <div className="text-right mb-4">
                
//                    <Link to="/definitionmdp"> Mot de passe oublié ?</Link>
                
//                 </div>
    
//                 {/* Bouton de connexion */}
//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Se connecter
//                 </button>
//               </form>
//               {error && <p style={{ color: 'red' }}>{error}</p>}
//               {message && <p style={{ color: 'green' }}>{message}</p>}
//             </div>
//           </div>
//         </div>
//       );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from "../services/userService"; 

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await loginUser(email, password);  //Appel API via `userService.ts`

            if (!response.success) {
                setError(response.error);  // Affichage du bon message d'erreur
                return;
            }

            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.user.idUt);
            localStorage.setItem("role", response.user.role);
            if (user.role === "admin") {
                setMessage("Connexion Admin réussie !");
                setTimeout(() => {
                    navigate("/dashboard")
                    setLoading(false);
                }, 2000);
            } else {
                setMessage("Connexion Éleve réussie !");
                setTimeout(() => {
                    navigate("/home");
                    setLoading(false);
                }, 2000)
            }
        } catch (error) {
            setError(error.response?.data?.error || "Email ou mot de passe incorrect");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-8">
                    <img src="src/assets/télécharger-removebg-preview.png" alt="Simplon Logo" className="h-21 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-700 mb-2">SIMPLON PO2-PITA</h1>
                    <p className="text-gray-600 text-center">La plateforme pour marquer la présence des étudiants</p>
                </div>

                <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Connexion</h2>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse email <span className="text-red-500">*</span></label>
                        <input 
                          id='email'
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="exemple@gmail.com"
                          className="w-full px-4 py-3 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          required 
                        />

                        </div>
                        <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe <span className="text-red-500">*</span></label>
                        <input 
                          id='password'
                          type="password" 
                          value={password}
                          placeholder="••••••••••••••••••" 
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          required 
                        />
                        </div>
                        <div className="text-right mb-4">
                            <Link to="/forgotpassword">Mot de passe oublié ?</Link>
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-3 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex justify-center items-center"
                            disabled={loading}
                    >
                       {loading ? (
                            <span className="border-t-2 border-white border-solid w-5 h-5 rounded-full animate-spin"></span>
                        ) : (
                            "Se connecter"
                        )}
                    </button>
                    {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
