export const fetchComments = async (projectId) => {
    try {
        const response = await fetch(`http://localhost:8000/comments/project/${projectId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const addComment = async (comment, projectId) => {
    try {
        const commentData = { ...comment, project_id: projectId };
        console.log('DEBUG: Sending comment data ->', commentData); // Debugging step
        const response = await fetch('http://localhost:8000/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

export const approveComment = async (commentId) => {
    try {
        const response = await fetch(`http://localhost:8000/comments/${commentId}/approve`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    } catch (error) {
        console.error('Error approving comment:', error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const response = await fetch(`http://localhost:8000/comments/${commentId}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};
