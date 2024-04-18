import axiosInstance from '@/api';

export const SYSTEM_RESET = async () => {
    try {
        const response = await axiosInstance.post(`reset-system`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
