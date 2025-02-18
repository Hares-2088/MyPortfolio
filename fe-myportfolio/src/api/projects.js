import axios from "axios";

// Create an Axios instance with a base URL
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default {
    async getProjects() {
        try {
            const response = await apiClient.get("/projects/");
            return response.data;
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    },

    async getProjectById(projectId) {
        try {
            const response = await apiClient.get(`/projects/${projectId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching project:", error);
            throw error;
        }
    },

    async addProject(projectData, token) {
        try {
            const response = await apiClient.post("/projects/", projectData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding project:", error);
            throw error;
        }
    },

    async updateProject(projectId, updatedData, token) {
        try {
            const response = await apiClient.put(`/projects/${projectId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    },

    async deleteProject(projectId, token) {
        try {
            const response = await apiClient.delete(`/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    },
};