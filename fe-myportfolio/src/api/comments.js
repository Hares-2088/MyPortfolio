import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const fetchComments = async (projectId) => {
    try {
        const response = await apiClient.get(`/comments/project/${projectId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

// Fetch all comments (including unapproved ones)
export const fetchAllComments = async (token) => {
    try {
        const response = await apiClient.get("/comments", {
            headers: { Authorization: `Bearer ${token}` }, // Use the token passed as an argument
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

export const addComment = async (comment) => {
    try {
        const response = await apiClient.post("/comments", comment);
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

export const approveComment = async (commentId, token) => {
    try {
        const response = await apiClient.put(`/comments/${commentId}/approve`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error approving comment:", error);
        throw error;
    }
};

export const deleteComment = async (commentId, token) => {
    try {
        const response = await apiClient.delete(`/comments/${commentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};