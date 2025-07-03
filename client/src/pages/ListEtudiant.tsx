import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getUsers, deleteUser, updateUser } from "../services/userService";
import SideBar from "../components/Sidebar";

function ListEtudiant() {
    const [data, setData] = useState([]);
    const [edite, setEdite] = useState(false); // Gestion du formulaire d’édition
    const [editEtudiant, setEditEtudiant] = useState(null);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; 

    // Chargement des étudiants
    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getUsers();
                setData(users);
            } catch (error) {
                console.error("Erreur lors du chargement des étudiants :", error);
            }
        };
        fetchData();
    }, []);

    // Filtrage des étudiants
    const filterData = data.filter((etudiant) => 
        etudiant.nom.toLowerCase().includes(search.toLowerCase()) ||
        etudiant.prenom.toLowerCase().includes(search.toLowerCase()) ||
        etudiant.email.toLowerCase().includes(search.toLowerCase()) 
    );

    // Pagination
    const totalPages = filterData.length > 0 ? Math.ceil(filterData.length / pageSize) : 1;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = filterData.slice(startIndex, endIndex);

    // Recherche d’un étudiant
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Suppression d’un étudiant
    const handleDelete = async (idUt) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
            try {
                await deleteUser(idUt);
                alert("Etudiant(e) supprimé(e) avec succès !")
                setData(data.filter((etudiant) => etudiant.idUt !== idUt));
            } catch (error) {
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    };

    // Modification d’un étudiant
    const handleUpdate = (etudiant) => {
        setEdite(true);
        setEditEtudiant(etudiant);
        setNom(etudiant.nom);
        setPrenom(etudiant.prenom);
        setEmail(etudiant.email);
    };

    // Enregistrement des modifications
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateUser(editEtudiant.idUt, { nom, prenom, email });
            alert("Étudiant modifié avec succès !");
            setData((prevData) =>
                prevData.map((etudiant) =>
                    etudiant.idUt === editEtudiant.idUt ? { ...etudiant, nom, prenom, email } : etudiant
                )
            );
            setEdite(false);
        } catch (error) {
            alert("Une erreur est survenue lors de la modification.");
        }
    };

    return (
        <div className="flex w-screen">
            <SideBar />
            <div className="flex-1 p-6 h-screen">
                <button className="float-end mt-1 text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-100">
                    <Link to="/formetudiant">Ajouter un étudiant</Link>
                </button>
                <div className="relative flex w-80 my-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Rechercher..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2 text-gray-500" size={20} />
                </div>
                <h1 className="font-bold">La liste des étudiants inscrits</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-red-500">Aucun étudiant trouvé.</td>
                            </tr>
                        ) : (
                            currentData.map((etudiant) => (
                                <tr key={etudiant.idUt}>
                                    <td>{etudiant.idUt}</td>
                                    <td>{etudiant.nom}</td>
                                    <td>{etudiant.prenom}</td>
                                    <td>{etudiant.email}</td>
                                    <td>
                                        <button 
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleUpdate(etudiant)}
                                        >
                                            Modifier
                                        </button>
                                        <button 
                                            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                            onClick={() => handleDelete(etudiant.idUt)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="items-center float-end mt-4">
                    <span className="mr-2">Page {currentPage} sur {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Précédent
                    </button>
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2 px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Suivant
                    </button>
                </div>
                {edite && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <form className="bg-white p-6 rounded shadow-lg" onSubmit={handleSave}>
                            <h2 className="text-lg font-bold mb-4">Modifier un étudiant</h2>
                            <label className="block mb-4">
                                Nom :
                                <input 
                                    type="text" 
                                    className="border border-gray-400 p-2 w-full" 
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                />
                            </label>
                            <label className="block mb-4">
                                Prénom :
                                <input 
                                    type="text" 
                                    className="border border-gray-400 p-2 w-full" 
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                />
                            </label>
                            <label className="block mb-4">
                                Email :
                                <input 
                                    type="email" 
                                    className="border border-gray-400 p-2 w-full" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                    Enregistrer
                                </button>
                                <button type="button" onClick={() => setEdite(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListEtudiant;
