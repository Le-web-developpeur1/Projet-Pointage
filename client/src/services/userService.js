import api from "./api";

export const createUser = async (lastname, firstname, email) => {
    try {
        const response = await api.post("/formetudiant", { lastname, firstname, email, status: "pending" });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'étudiant :", error);
        throw error;
    }
};

export const verifyEmail = async (email) => {
    try {
        const response = await api.get(`/verify-email?email=${email}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la vérification de l'email :", error);
        throw error;
    }
};

export const setPassword = async (email, password) => {
    try {
        const response = await api.post("/definitionmdp", { email, password });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la définition du mot de passe :", error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get("/listetudiant");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error);
        throw error;
    }
};

export const deleteUser = async (idUt) => {
    try {
        await api.delete(`/listetudiant/${idUt}`);
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        throw error;
    }
};

export const updateUser = async (idUt, updatedData) => {
    try {
        await api.put(`/listetudiant/${idUt}`, updatedData);
    } catch (error) {
        console.error("Erreur lors de la modification :", error);
        throw error;
    }
};
