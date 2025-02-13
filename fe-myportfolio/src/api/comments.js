import { useAuth0 } from '@auth0/auth0-vue';

// Helper function to get the access token
const getAccessToken = async () => {
    const { getAccessTokenSilently } = useAuth0();
    try {
        const token = await getAccessTokenSilently();
        return token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

export const fetchComments = async (projectId) => {
    try {
        const token = await getAccessToken(); // Get the access token
        const response = await fetch(`http://localhost:8000/comments/project/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const addComment = async (comment, projectId) => {
    try {
        const token = await getAccessToken(); // Get the access token
        const commentData = { ...comment, project_id: projectId };
        console.log('DEBUG: Sending comment data ->', commentData); // Debugging step
        const response = await fetch('http://localhost:8000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the request
            },
            body: JSON.stringify(commentData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

export const approveComment = async (commentId) => {
    try {
        const token = await getAccessToken(); // Get the access token
        const response = await fetch(`http://localhost:8000/comments/${commentId}/approve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the request
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error approving comment:', error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const token = await getAccessToken(); // Get the access token
        const response = await fetch(`http://localhost:8000/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};