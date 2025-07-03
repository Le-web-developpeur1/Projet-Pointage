// import { useState, useEffect } from "react";
// import axios from "axios";
// import SideBar from "../components/Sidebar";

// function Dashboard () {
//     const [data, setData] = useState({
//         etudiants:0,
//         presences:0,
//         absences:0
//     });
//     const [loading, setLoading] = useState(true);
//     const [errorMessage, setErrorMessage] = useState(false);

//     useEffect(() => {
//         const effectData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:7000/api/dashboard');
//                 setData(response.data);
//                 setErrorMessage(false);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Erreur lors de la récupération des statisques:', error);
//                 setErrorMessage(true);
//                 setLoading(false);
//             }
//         };
//         effectData();
//     }, []);


//     return (
//         <div className="w-screen flex">
//             <SideBar/>
//             <div className="flex-1 p-8">
//                 <p className="text-2xl font-semibold mb-6 text-center">Bienvenue dans votre espace personnel !</p>
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-semibold">Tableau de Bord</h1>
//                 </div>
//                 <div className="grid grid-cols-4 gap-4 mb-6">
//                     {loading ? (
//                             <p>Chargement des données en cours...</p>
//                         ) : errorMessage ? (
//                             <p>Erreur lors du chargement des données. Veuillez réessayer plus tard.</p>
//                         ) : (
//                             <>
//                             <p className="bg-white p-4 shadow rounded-lg text-lg font-semibold flex flex-col"><span className="text-blue-600">Total Etudiant </span> <span>{data.etudiants}</span></p>
//                             <p className="bg-white p-4 shadow rounded-lg text-lg font-semibold flex flex-col"><span className="text-blue-600">Total Présence</span> <span>{data.presences}</span></p>
//                             <p className="bg-white p-4 shadow rounded-lg text-lg font-semibold flex flex-col"><span className="text-blue-600">Total Absence</span> <span>{data.absences}</span></p>
//                             </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Dashboard;


import { useState, useEffect } from "react";
import { getDashboardStats } from "../services/dashboardService";
import SideBar from "../components/Sidebar";

function Dashboard() {
    const [data, setData] = useState({
        etudiants: 0,
        presences: 0,
        absences: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getDashboardStats();
                setData(response);
                setError(null);
            } catch (err) {
                console.error("Erreur lors de la récupération des statistiques :", err);
                setError("Impossible de charger les statistiques.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="w-screen flex">
            <SideBar />
            <div className="flex-1 p-8">
                <p className="text-2xl font-semibold mb-6 text-center">
                    Bienvenue dans votre espace personnel !
                </p>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Tableau de Bord</h1>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {loading ? (
                        <p>Chargement des données en cours...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <>
                            <p className="bg-white p-4 shadow rounded-lg text-lg font-semibold flex flex-col">
                                <span className="text-blue-600">Total Étudiant </span>
                                <span>{data.etudiants}</span>
                            </p>
                            <p className="bg-white p-4 shadow rounded-lg text-lg font-semibold flex flex-col">
                                <span className="text-blue-600">Total Présence</span>
                                <span>{data.presences}</span>
                            </p>
                            <p className="bg-white p-4 shadow rounded-lg text-lg font-semibold flex flex-col">
                                <span className="text-blue-600">Total Absence</span>
                                <span>{data.absences}</span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
