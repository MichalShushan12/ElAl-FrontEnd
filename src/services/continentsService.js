import { apiClient } from "../api/apiClient";

const getAllContinents = async () => {
    try {
        const res = await apiClient.get("Continents");
        return res.data
    } catch (error) {
        throw error;
    }
};

const getContinentById = async (continentId) => {
    try {
        const res = await apiClient.get(`Continents/mycontinent/${continentId}`);
        return res.data
    } catch (error) {
        throw error;   
    }
};

export {getAllContinents, getContinentById};
