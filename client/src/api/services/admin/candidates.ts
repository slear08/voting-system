import axiosInstance from '@/api';

export const GET_ALL_CANDIDATES = async () => {
    try {
        const response = await axiosInstance.get(`/candidates`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
