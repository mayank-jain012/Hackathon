import axios from "axios";
import { baseUrl } from "../../configure/baseUrl";
// const getTokenFromLocalStrorage = localStorage.getItem("token")
//     ? JSON.stringify(localStorage.getItem("token"))
//     : null;
// const config = {
//     headers: {
//         Authorization: token ? `Bearer${getTokenFromLocalStrorage.token}` : '',
//         Accept: 'application/JSON'
//     }
// }
const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
};

// Example function with correct token handling
const config = () => {
    const token = getTokenFromLocalStorage();
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '', // Check if the token exists before adding it
            Accept: 'application/JSON'
        }
    };
};

const login = async (data) => {
    const response = await axios.post(`${baseUrl}user/login`, data, config);
    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data))
    }
    console.log(response.data);
    return response.data
}
const signup = async (userData) => {
    const response = await axios.post(`${baseUrl}user/signup`, userData, config);
    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
    }
    return response.data;
};

const forgotPassword = async (email) => {
    const response = await axios.post(`${baseUrl}user/forgotPassword`, { email });
    return response.data;
};

const resetPassword = async (data) => {
    const response = await axios.post(`${baseUrl}user/resetPassword`, data);
    return response.data;
};

const authService = {
    login,
    signup,
    forgotPassword,
    resetPassword,
};



export default authService;