<template>
    <div class="min-h-screen text-foreground py-12 relative z-20">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-white mb-8">Dashboard</h1>

            <!-- Comments Awaiting Approval Section -->
            <div class="mt-12">
                <h2 class="text-2xl font-bold text-white mb-6">Comments Awaiting Approval</h2>
                <div v-if="pendingComments.length > 0" class="space-y-4">
                    <div v-for="comment in pendingComments" :key="comment._id" class="bg-gray-800 p-4 rounded-lg">
                        <p class="text-gray-300">{{ comment.content }} - <span class="text-gray-400">{{ comment.author
                                }}</span></p>
                        <p class="text-sm text-gray-500 mt-1">Project: {{ getProjectTitle(comment.project_id) }}</p>
                        <div class="mt-2 space-x-2">
                            <button @click="approveComment(comment._id)"
                                class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                                Approve
                            </button>
                            <button @click="deleteComment(comment._id)"
                                class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <p v-else class="text-gray-300">No comments awaiting approval.</p>
            </div>

            <!-- Projects Management Section -->
            <div class="mt-12">
                <h2 class="text-2xl font-bold text-white mb-6">Manage Projects</h2>
                <button @click="openAddProjectModal"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-6">
                    Add New Project
                </button>
                <div v-if="loading" class="text-center text-white mt-8">
                    <font-awesome-icon icon="spinner" spin class="text-2xl" />
                    <p class="mt-2">Loading projects...</p>
                </div>
                <div v-else-if="projects.length > 0" class="space-y-4">
                    <div v-for="project in projects" :key="project._id" class="bg-gray-800 p-4 rounded-lg">
                        <h3 class="text-xl font-bold text-white">{{ project.title }}</h3>
                        <p class="text-gray-300">{{ project.description }}</p>
                        <div class="mt-2 space-x-2">
                            <button @click="openEditProjectModal(project)"
                                class="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-300">
                                Edit
                            </button>
                            <button @click="deleteProject(project._id)"
                                class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                                Delete
                            </button>
                        </div>
                        <button @click="toggleComments(project)"
                            class="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                            {{ project.showComments ? 'Hide Comments' : 'Show Comments' }}
                        </button>
                        <div v-if="project.showComments" class="mt-4">
                            <h4 class="text-lg font-bold text-white mb-2">Comments</h4>
                            <div v-if="project.commentsLoading" class="text-center text-white">
                                <font-awesome-icon icon="spinner" spin class="text-xl" />
                                <p>Loading comments...</p>
                            </div>
                            <div v-else>
                                <div v-if="project.comments.length > 0" class="space-y-2">
                                    <div v-for="comment in project.comments" :key="comment._id"
                                        class="bg-gray-700 p-2 rounded-lg">
                                        <p class="text-gray-300">{{ comment.content }}</p>
                                        <p class="text-sm text-gray-500 mt-1">— {{ comment.author }}</p>
                                        <button @click="deleteProjectComment(project._id, comment._id)"
                                            class="mt-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div v-else class="text-gray-400">
                                    No comments yet.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p v-else class="text-gray-300">No projects found.</p>
            </div>

            <!-- Add/Edit Project Modal -->
            <div v-if="isProjectModalOpen"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                    <h3 class="text-xl font-bold text-white mb-4">
                        {{ isEditingProject ? 'Edit Project' : 'Add New Project' }}
                    </h3>
                    <form @submit.prevent="isEditingProject ? updateProject() : addProject()">
                        <input v-model="projectForm.title" type="text" placeholder="Title"
                            class="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg">
                        <textarea v-model="projectForm.description" placeholder="Description"
                            class="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg"></textarea>
                        <input v-model="projectForm.github_url" type="text" placeholder="GitHub URL"
                            class="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg">
                        <input v-model="projectForm.live_url" type="text" placeholder="Live URL"
                            class="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg">
                        <input v-model="projectForm.image" type="text" placeholder="Image URL"
                            class="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg">
                        <input v-model="projectForm.tools" type="text" placeholder="Tools (comma-separated)"
                            class="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg">
                        <div class="flex justify-end space-x-2">
                            <button type="button" @click="closeProjectModal"
                                class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300">
                                Cancel
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                {{ isEditingProject ? 'Update' : 'Add' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "@/stores/auth";
import { computed, ref, onMounted } from "vue";
import { fetchAllComments, fetchComments, approveComment as approveCommentApi, deleteComment as deleteCommentApi } from "@/api/comments";
import projectsApi from "@/api/projects"; // Import the default export from projects.js

export default {
    setup() {
        const { user, logout, getAccessTokenSilently } = useAuth0();
        const authStore = useAuthStore();
        const isAdminUser = computed(() => authStore.hasRole('Admin'));

        const pendingComments = ref([]);
        const projects = ref([]);
        const loading = ref(true);
        const isProjectModalOpen = ref(false);
        const isEditingProject = ref(false);
        const projectForm = ref({
            title: "",
            description: "",
            github_url: "",
            live_url: "",
            image: "",
            tools: "",
        });
        const currentProjectId = ref(null);

        // Fetch pending comments
        const fetchPendingComments = async () => {
            try {
                const allComments = await fetchAllComments();
                pendingComments.value = allComments.filter(comment => !comment.approved);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        // Approve a comment
        const approveComment = async (commentId) => {
            try {
                const token = await getAccessTokenSilently();
                await approveCommentApi(commentId, token);
                fetchPendingComments();
            } catch (error) {
                console.error("Error approving comment:", error);
            }
        };

        // Delete a comment
        const deleteComment = async (commentId) => {
            try {
                const token = await getAccessTokenSilently();
                await deleteCommentApi(commentId, token);
                fetchPendingComments();
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        };

        // Fetch projects
        const fetchProjects = async () => {
            try {
                const data = await projectsApi.getProjects(); // Use the imported projectsApi to call getProjects
                projects.value = data.map(project => ({
                    ...project,
                    comments: [],
                    commentsLoading: false,
                    showComments: false,
                }));
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                loading.value = false;
            }
        };

        // Get project title by ID
        const getProjectTitle = (projectId) => {
            const project = projects.value.find(project => project._id === projectId);
            return project ? project.title : 'Unknown Project';
        };

        // Open add project modal
        const openAddProjectModal = () => {
            isEditingProject.value = false;
            projectForm.value = {
                title: "",
                description: "",
                github_url: "",
                live_url: "",
                image: "",
                tools: "",
            };
            isProjectModalOpen.value = true;
        };

        // Open edit project modal
        const openEditProjectModal = (project) => {
            isEditingProject.value = true;
            currentProjectId.value = project._id;
            projectForm.value = { ...project, tools: project.tools.join(", ") };
            isProjectModalOpen.value = true;
        };

        // Close project modal
        const closeProjectModal = () => {
            isProjectModalOpen.value = false;
        };

        // Add a new project
        const addProject = async () => {
            try {
                const token = await getAccessTokenSilently();
                const projectData = { ...projectForm.value, tools: projectForm.value.tools.split(",").map(tool => tool.trim()) };
                await projectsApi.addProject(projectData, token);
                fetchProjects();
                closeProjectModal();
            } catch (error) {
                console.error("Error adding project:", error);
            }
        };

        // Update a project
        const updateProject = async () => {
            try {
                const token = await getAccessTokenSilently();
                const projectData = { ...projectForm.value, tools: projectForm.value.tools.split(",").map(tool => tool.trim()) };
                await projectsApi.updateProject(currentProjectId.value, projectData, token);
                fetchProjects();
                closeProjectModal();
            } catch (error) {
                console.error("Error updating project:", error);
            }
        };

        // Delete a project
        const deleteProject = async (projectId) => {
            try {
                const token = await getAccessTokenSilently();
                await projectsApi.deleteProject(projectId, token);
                fetchProjects();
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        };

        // Load comments for a project
        const loadComments = async (project) => {
            project.commentsLoading = true;
            try {
                const comments = await fetchComments(project._id);
                project.comments = comments;
            } catch (error) {
                console.error('Error loading comments:', error);
            } finally {
                project.commentsLoading = false;
            }
        };

        // Delete a comment from a project
        const deleteProjectComment = async (projectId, commentId) => {
            try {
                const token = await getAccessTokenSilently();
                await deleteCommentApi(commentId, token);
                const project = projects.value.find(project => project._id === projectId);
                if (project) {
                    project.comments = project.comments.filter(comment => comment._id !== commentId);
                }
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        };

        // Toggle comments visibility
        const toggleComments = (project) => {
            project.showComments = !project.showComments;
            if (project.showComments && project.comments.length === 0) {
                loadComments(project);
            }
        };

        onMounted(() => {
            if (isAdminUser.value) {
                fetchPendingComments();
                fetchProjects();
            }
        });

        return {
            user,
            logout,
            isAdminUser,
            pendingComments,
            projects,
            loading,
            isProjectModalOpen,
            isEditingProject,
            projectForm,
            approveComment,
            deleteComment,
            openAddProjectModal,
            openEditProjectModal,
            closeProjectModal,
            addProject,
            updateProject,
            deleteProject,
            toggleComments,
            getProjectTitle,
            deleteProjectComment,
        };
    }
};
</script>