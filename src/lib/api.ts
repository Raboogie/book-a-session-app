import axios from "axios";

// 1. MEMORY STORAGE
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

export const api = axios.create({
    baseURL:'http://localhost:9090',
    withCredentials: true, // Crucial for sending the Refresh Token cookie
    headers:{
        'Content-Type': 'application/json',
    }
})

// 2. REQUEST INTERCEPTOR
// Automatically attaches the Access Token to every request
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => {
        // If the request succeeds, just return the response
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the error comes FROM the refresh endpoint, do not try to refresh again.
        // This prevents an infinite loop.
        if (originalRequest.url && originalRequest.url.includes('/auth/refresh-token')) {
            return Promise.reject(error);
        }

        // Check if the error is 403 (Forbidden) which usually means the token is invalid/expired
        // AND check if we haven't already tried to retry this request (to avoid infinite loops)
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 1. Attempt to refresh the token using the HttpOnly cookie
                // We don't need to pass data, the cookie is sent automatically because of withCredentials: true
                const response = await api.post('/auth/refresh-token');

                // Extract new token from BODY (not cookie)
                const newAccessToken = response.data.accessToken;
                setAccessToken(newAccessToken);

                // 2. If successful, the browser now has a NEW valid access token.
                // 3. Retry original request with new header
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If the refresh token is ALSO expired or invalid, we must log the user out.
                setAccessToken(null);
                console.error("Session expired. Please login again.");

                // Optional: Clear user data and redirect to log in
                // localStorage.removeItem('user');
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)