import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "http://localhost:8000",
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

export const fetchAllComments = async () => {
    try {
        const response = await apiClient.get(`/comments`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

export const addComment = async (comment, token) => {
    try {
        const response = await apiClient.post("/comments", comment, {
            headers: { Authorization: `Bearer ${token}` },
        });
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
