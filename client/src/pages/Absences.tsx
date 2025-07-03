// import { useState, useEffect } from "react";
// import axios from "axios";
// import SideBar from "../components/Sidebar";

// function Absences () {
//     const [étudiant, setEtudiant] = useState([]);
//     const [error, setError] = useState("");

//     const étudiantPresents = async () => {
//         try {
//             const response = await axios.get("http://localhost:7000/api/marquages?statut=absent");
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
//         <SideBar/>
//         {error}
//         <div className="w-screen h-screen flex-1 p-6 ">
//             <h2 className="font-bold">La liste des étudiants abscents</h2>
//             <table>
//                 <thead>
//                    <tr>
//                         <th>Id</th>
//                         <th>Nom</th>
//                         <th>Prenom</th>
//                         <th>Email</th>
//                         <th>Motif</th>
//                         <th>Date</th>
//                    </tr>
//                 </thead>
//                 <tbody>
//                     {étudiant.map((student) => (
//                         <tr key={student.idUt}>
//                         <td>{student.idUt}</td>
//                         <td>{student.nom}</td>
//                         <td>{student.prenom}</td>
//                         <td>{student.email}</td>
//                         <td>{student.motif}</td>
//                         <td>{student.date}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </div>
//     )
// }
// export default Absences;

import { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { getAbsentStudents } from "../services/pointageService";  // ✅ Appel API centralisé

function Absences() {
    const [étudiant, setEtudiant] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const students = await getAbsentStudents();  // ✅ Récupération des absents via l’API
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
                <h2 className="font-bold">La liste des étudiants absents</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}  
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Motif</th>
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
                                    <td>{student.motif || "Non spécifié"}</td> 
                                    <td>{new Date(student.date).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500">Aucun étudiant absent.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Absences;
