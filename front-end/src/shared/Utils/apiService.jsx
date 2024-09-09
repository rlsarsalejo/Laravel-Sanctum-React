import axiosInstances from "../Auth/axios";

const baseUrl = '/api';

// Function to get CSRF cookie
export const getCsrfToken = async () => {
    await axiosInstances.get('/sanctum/csrf-cookie');
};

// Login Authentication
// Improved login error handling
export const login = async (email, password) => {
    try {
        await getCsrfToken();
        const response = await axiosInstances.post(`${baseUrl}/login`, { email, password });
        if (response.data.token) {
            axiosInstances.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Login error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Login error:', error.message);
            throw new Error('An error occurred while logging in. Please try again.');
        }
    }
};

// Improved logout error handling
export const logout = async () => {
    try {
        await axiosInstances.post(`${baseUrl}/logout`);
        delete axiosInstances.defaults.headers.common['Authorization'];
    } catch (error) {
        if (error.response) {
            console.error('Logout error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Logout error:', error.message);
            throw new Error('An error occurred while logging out. Please try again.');
        }
    }
};

// Improved checkAuth error handling
export const checkAuth = async () => {
    try {
        const response = await axiosInstances.get(`${baseUrl}/user`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Check auth error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Check auth error:', error.message);
            throw new Error('An error occurred while checking authentication. Please try again.');
        }
    }
};
