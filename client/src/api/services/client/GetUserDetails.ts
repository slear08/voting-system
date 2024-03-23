import axiosInstance from '@/api';

export const GetUserDetails = async () => {
    try {
        const response = await axiosInstance.get(`/auth/login/success`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
