import axios from 'axios';

const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post('/api/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    logout: async () => {
        try {
            const response = await axios.post('/api/logout');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    checkAuth: async () => {
        try {
            const response = await axios.get('/api/check-auth');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default authService;
