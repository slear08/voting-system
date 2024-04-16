import axiosInstance from '@/api';

export const GET_ALL_VOTERS = async () => {
    try {
        const response = await axiosInstance.get(`/voters`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
