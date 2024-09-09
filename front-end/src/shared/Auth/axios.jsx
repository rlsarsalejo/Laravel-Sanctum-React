import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstances = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Function to get CSRF token from cookies
const getCSRFToken = () => {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
};

// Add request interceptor to include CSRF token
axiosInstances.interceptors.request.use(
    config => {
        const token = getCSRFToken();
        if (token) {
            config.headers['X-XSRF-TOKEN'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstances;