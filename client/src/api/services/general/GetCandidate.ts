import axiosInstance from '@/api';

export const GetCandidatesByOrgID = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/candidates/org/${id}`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const GetCandidateByID = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/candidates/${id}`);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
