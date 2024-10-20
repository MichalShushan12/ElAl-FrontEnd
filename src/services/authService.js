import { apiClient } from "../api/apiClient";


const signUp = async (UserAuth) => {
    try {
        const res = await apiClient.post("Auth/signUp", UserAuth);
        return res.data
    } catch (error) {
        throw error;
    }
};

const Login = async (UserDetails) => {
    try {
        const res = await apiClient.post("Auth/login", UserDetails);
        
        const { tokenJwt, refreshToken } = res.data;
        localStorage.setItem('authToken', tokenJwt);
        localStorage.setItem('refreshToken', refreshToken);

        
        return res.data;
    } catch (error) {
        throw error;
    }
};
   
const updateUserPassword = async (userAuthDetails) => {
    try {
       const res = await apiClient.put("Auth/updatePassword", userAuthDetails);
       return res.data;
    } catch (error) {
        throw error;
    }
};

export {signUp, Login, updateUserPassword};