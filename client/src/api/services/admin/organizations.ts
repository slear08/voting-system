import axiosInstance from '@/api';

export const CREATE_ORGANIZATION = async (data: any) => {
    try {
        const response = await axiosInstance.post(`/organizations`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const UPDATE_ORGANIZATION = async (data: any) => {
    try {
        const response = await axiosInstance.put(`/organizations/${data.id}`, data.data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
