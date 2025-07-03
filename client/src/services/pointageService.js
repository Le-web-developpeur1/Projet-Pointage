import api from "./api";



export const getPresentStudents = async () => {
    try {
        const response = await api.get("/presences");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des pointages :", error);
        throw error;
    }
};

export const getAbsentStudents = async () => {
    try {
        const response = await api.get("/absences");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des pointages :", error);
        throw error;
    }
};

export const marquerPointage = async (idUt, statut, motif) => {
    try {
        const response = await api.post("/marquer", { idUt, statut, motif });
        return response.data;
    } catch (error) {
        console.error("Erreur API :", error);
        throw new Error("Impossible d'enregistrer le pointage.");
    }
};


