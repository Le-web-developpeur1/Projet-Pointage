import api from "./api";

export const getDashboardStats = async () => {
    try {
        const response = await api.get("/dashboard");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
        throw error;
    }
};
