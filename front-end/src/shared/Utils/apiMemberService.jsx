import axiosInstances from "../Auth/axios";

const baseUrl = '/api'

// add new Members
export const addMember = async (memberData) =>{
    try{
        const response = await axiosInstances.post(`${baseUrl}/create`, memberData);
        return response.data;
    }catch(error){
        if (error.response) {
            console.error('Add member error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Add member error:', error.message);
            throw new Error('An error occurred while adding member. Please try again.');
        }
    }
}
// Fetch members
export const fetchMembers = async () => {
    try {
        const response = await axiosInstances.get(`${baseUrl}/members`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Fetch members error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Fetch members error:', error.message);
            throw new Error('An error occurred while fetching members. Please try again.');
        }
    }
};
// update Member Data
export const updateMember = async (id, memberData) => {
    try {
        const response = await axiosInstances.put(`${baseUrl}/edit/${id}`, memberData);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Update member error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Update member error:', error.message);
            throw new Error('An error occurred while updating member. Please try again.');
        }
    }
};
// Delete Member Data
export const deleteMember = async (id) => {
    try {
        const response = await axiosInstances.delete(`${baseUrl}/remove/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Delete member error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Delete member error:', error.message);
            throw new Error('An error occurred while deleting member. Please try again.');
        }
    }
};