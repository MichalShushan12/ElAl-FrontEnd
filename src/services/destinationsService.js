import { apiClient } from "../api/apiClient";

const getDestinations = async () => {
    try {
        const res = await apiClient.get("Destinations");
        return res.data
    } catch (error) {
        throw error;
    }
};

const getDestinationByName = async (name) => {
    try {
        const res = await apiClient.get(`Destinations/${name}`)
        return res.data
    } catch (error) {
        throw error;
    }
}
 

export {getDestinations, getDestinationByName};