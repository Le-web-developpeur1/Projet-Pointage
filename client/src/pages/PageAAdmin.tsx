const PageAAdmin = () => {
    return (
        <>
            <h1>Bienvenue sur la page d'accueil de l'administrateur</h1>
            <div className=" hidden absolute top-12 right-2 bg-white rounded-lg">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className="">
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Liste es étudiants</a></li>
                    <li><a href="#">À propos</a></li>
                    <li><a href="#">Se déconnecter</a></li>
                </ul>
            </nav>
        </>
    );
};
export default PageAAdmin ;