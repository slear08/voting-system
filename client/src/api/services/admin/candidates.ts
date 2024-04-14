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

export const UPDATE_CANDIDATES = async (data: any) => {
    try {
        const response = await axiosInstance.put(`/candidates/${data.id}`, data.data, {
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

export const CREATE_CANDIDATES = async (data: any) => {
    try {
        const response = await axiosInstance.post(`/candidates`, data, {
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

export const DELETE_CANDIDATES = async (data: any) => {
    try {
        const response = await axiosInstance.delete(`/candidates`, { data });
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
