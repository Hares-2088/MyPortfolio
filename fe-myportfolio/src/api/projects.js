import axios from 'axios';

// Create an Axios instance with a base URL
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000', // Use environment variable for flexibility
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    // Fetch all projects
    async getProjects() {
        try {
            const response = await apiClient.get('/projects/');
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },

    // Fetch a single project by ID
    async getProjectById(projectId) {
        try {
            const response = await apiClient.get(`/projects/${projectId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching project:', error);
            throw error;
        }
    },

    // Add a new project
    async addProject(projectData) {
        try {
            const response = await apiClient.post('/projects/', projectData);
            return response.data;
        } catch (error) {
            console.error('Error adding project:', error);
            throw error;
        }
    },

    // Update a project
    async updateProject(projectId, updatedData) {
        try {
            const response = await apiClient.put(`/projects/${projectId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    },

    // Delete a project
    async deleteProject(projectId) {
        try {
            const response = await apiClient.delete(`/projects/${projectId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }
};
