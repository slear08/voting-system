import axiosInstance from '@/api';

export const LogoutVoter = async () => {
    try {
        await axiosInstance.post(`/auth/logout`);
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
