import axiosInstance from '@/api';

export const GetAllOranizations = async () => {
    try {
        const response = await axiosInstance.get('/organizations');
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const GetOrganizationByID = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/organizations/${id}`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
