import { Home, Users, CheckCircle, XCircle, Bell, Settings,LogOut } from "lucide-react";
import { useNavigate} from "react-router-dom";

function SideBar  () {
    const navigate = useNavigate ();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Supprime le token
        navigate("/login"); // Redirige vers la connexion
    };
    

    return (
        <div>

            <aside className="w-60 bg-white p-5 shadow-md h-screen">
                <h2 className="text-xl font-bold text-gray-700 mb-5">Gestion de Pointage</h2>
                <nav>
                <ul className="space-y-4 ">
                    <li  onClick={() => navigate ('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <Home size={20} /> Tableau de Bord
                    </li>
                    <li onClick={() => navigate ('/listetudiant')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer" >
                    <Users size={20} /> Étudiants
                    </li>
                    <li onClick={() => navigate ('/presences')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <CheckCircle size={20} /> Présences 
                    </li>
                    <li onClick={() => navigate ('/absences')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <XCircle size={20} /> Absences
                    </li>
                    <li onClick={() => navigate ('/notifications')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <Bell size={20} /> Notifications
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <Settings size={20} /> Paramètres
                    </li>
                    <li onClick={handleLogout} className="flex items-center gap-2 m-auto text-gray-600 hover:text-blue-600 cursor-pointer">
                    <LogOut size={20} /> Se deconnecter
                    </li>
                </ul>
                </nav>
            </aside>
        </div>
    )

}

export default SideBar;
