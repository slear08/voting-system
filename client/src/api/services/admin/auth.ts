import axiosInstance from '@/api';

export const AdminLogin = async (data: any) => {
    try {
        const response = await axiosInstance.post(`/auth/login`, data);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const AdminLogout = async () => {
    try {
        const response = await axiosInstance.post(`/auth/admin/logout`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
