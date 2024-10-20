import { apiClient } from '../api/apiClient';


const getUser = async () => {
    try {
        const res = await apiClient.get("Users");
        return res.data
    } catch (error) {
        throw error;
    }
};

const createUser = async (newUserDetails) => {
    try {
        const res = await apiClient.post("Users", newUserDetails);
        return res.data
    } catch (error) {
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const res = await apiClient.get(`Users/id/${userId}`);
        return res.data
    } catch (error) {
        throw error;   
    }
};

const getUserByUserName = async (userName) => {
    try {
        const res = await apiClient.get(`Users/username/${userName}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};


const updateUser = async (userDetails) => {
    try {
       const res = await apiClient.put("Users/update", userDetails);
       return res.data;
    } catch (error) {
        throw error;
    }
};

export {getUser, createUser, getUserById, getUserByUserName, updateUser};
