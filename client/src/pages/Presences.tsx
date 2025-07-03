// import { useState, useEffect } from "react";
// import axios from "axios";
// import SideBar from "../components/Sidebar";

// function Presences () {
//     const [étudiant, setEtudiant] = useState([]);
//     const [error, setError] = useState("");

//     const étudiantPresents = async () => {
//         try {
//             const response = await axios.get("http://localhost:7000/api/marquages?statut=present");
//             setEtudiant(response.data);
//         } catch (err) {
//             setError("Erreur lors de du chargement des étudiants.");
//         }
//     };
    
//     useEffect(() => {
//         étudiantPresents();
//     },[]);
    

//     return (
//         <div className="w-screen flex">
//             <SideBar/>
//             {error}
//             <div className="w-screen h-screen flex-1 p-6 ">
//                 <h2 className="font-bold">La liste des étudiants présents</h2>
//                 <table>
//                     <thead>
//                        <tr>
//                             <th>Id</th>
//                             <th>Nom</th>
//                             <th>Prenom</th>
//                             <th>Email</th>
//                        </tr>
//                     </thead>
//                     <tbody>
//                         {étudiant.map((student) => (
//                             <tr key={student.idUt}>
//                                 <td>{student.idUt}</td>
//                                 <td>{student.nom}</td>
//                                 <td>{student.prenom}</td>
//                                 <td>{student.email}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }
// export default Presences;

import { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { getPresentStudents } from "../services/pointageService";  // ✅ Import API centralisée

function Presences() {
    const [étudiant, setEtudiant] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const students = await getPresentStudents();  // ✅ Appel API centralisé
                setEtudiant(students);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-screen flex">
            <SideBar />
            <div className="w-screen h-screen flex-1 p-6">
                <h2 className="font-bold">La liste des étudiants présents</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}  {/* ✅ Affichage des erreurs */}
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Date de pointage</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {étudiant.length > 0 ? (
                            étudiant.map((student) => (
                                <tr key={student.idUt}>
                                    <td>{student.idUt}</td>
                                    <td>{student.nom}</td>
                                    <td>{student.prenom}</td>
                                    <td>{student.email}</td>
                                    <td>{new Date(student.date).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500">Aucun étudiant présent.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Presences;
