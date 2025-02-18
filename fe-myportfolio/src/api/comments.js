import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";

const getAccessToken = async () => {
    const { getAccessTokenSilently } = useAuth0();
    try {
        return await getAccessTokenSilently();
    } catch (error) {
        console.error("Error getting access token:", error);
        throw error;
    }
};

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

export const addComment = async (comment, projectId) => {
    try {
        const token = await getAccessToken();
        const response = await apiClient.post("/comments", { ...comment, project_id: projectId }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

export const approveComment = async (commentId) => {
    try {
        const token = await getAccessToken();
        const response = await apiClient.put(`/comments/${commentId}/approve`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error approving comment:", error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const token = await getAccessToken();
        const response = await apiClient.delete(`/comments/${commentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};
