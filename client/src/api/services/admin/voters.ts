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

export const CREATE_VOTE = async (data: any) => {
    try {
        const response = await axiosInstance.post(`/voters/vote-candidate`, data);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
