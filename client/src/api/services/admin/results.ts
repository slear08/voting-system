import axiosInstance from '@/api';

export const GET_RESULTS = async () => {
    try {
        const response = await axiosInstance.get(`/candidates/org/result`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const GET_STATS = async () => {
    try {
        const response = await axiosInstance.get(`/stats`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
