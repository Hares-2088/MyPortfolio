<template>
  <div class="min-h-screen text-foreground py-12 relative z-20">
    <div class="container mx-auto px-4">
      <!-- Artistic Title -->
      <h1
        class="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 drop-shadow-lg text-center"
        style="line-height: 1.5;">
        My Digital Playground
      </h1>
      <!-- Subtitle with Soft Glow -->
      <p class="text-lg md:text-xl text-gray-300 mt-4 px-4 md:px-16 animate-fade-in text-center">
        <span class="text-white font-semibold">Where ideas come to life</span> through code and creativity.
      </p>
      <div v-if="loading" class="text-center text-white mt-8">
        <font-awesome-icon icon="spinner" spin class="text-2xl" />
        <p class="mt-2">Loading projects...</p>
      </div>
      <div v-else class="space-y-12 mt-8">
        <div v-for="project in projects" :key="project.id" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left Column: Project Image -->
          <div class="w-full h-64 md:h-80">
            <img :src="project.image || 'https://via.placeholder.com/600x400'" :alt="project.title"
              class="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
          </div>

          <!-- Right Column: Project Details -->
          <div class="flex flex-col justify-center">
            <h2 class="text-3xl font-bold mb-4 text-white">{{ project.title }}</h2>
            <p class="text-gray-300 mb-6">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <div v-for="tool in project.tools" :key="tool" class="bg-black px-3 py-1 rounded-full text-sm text-white">
                <font-awesome-icon :icon="toolIcons[tool] || 'code'" class="mr-1"
                  :style="{ color: getToolIconColor(tool) }" /> {{ tool }}
              </div>
            </div>
            <div class="flex space-x-4">
              <a :href="project.github_url" target="_blank" class="text-blue-500 hover:text-blue-700">
                <font-awesome-icon :icon="['fab', 'github']" class="text-xl" />
              </a>
              <a v-if="project.live_url" :href="project.live_url" target="_blank"
                class="text-green-500 hover:text-green-700">
                <font-awesome-icon :icon="['fas', 'external-link-alt']" class="text-xl" />
              </a>
            </div>

            <!-- Toggle Comments Button -->
            <button @click="toggleComments(project)"
              class="mt-6 px-3 py-2 w-dw text-ms bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-300">
              <font-awesome-icon :icon="['fas', 'comment']" class="mr-3" />
              {{ project.showComments ? 'Hide Comments' : 'Add a Comment' }}
            </button>
          </div>

          <!-- Comments Section (Hidden by Default) -->
          <div v-if="project.showComments" class="col-span-full mt-8">
            <h3 class="text-2xl font-bold text-white mb-4">Comments</h3>
            <div v-if="project.commentsLoading" class="text-center text-white">
              <font-awesome-icon icon="spinner" spin class="text-xl" />
              <p>Loading comments...</p>
            </div>
            <div v-else>
              <!-- Display Existing Comments -->
              <div v-if="project.comments.length > 0" class="space-y-4">
                <div v-for="comment in project.comments" :key="comment.id" class="bg-gray-800 p-4 rounded-lg shadow-md">
                  <p class="text-gray-300">{{ comment.content }}</p>
                  <p class="text-sm text-gray-500 mt-2">— {{ comment.author }}</p>
                </div>
              </div>
              <div v-else class="text-gray-400">
                No comments yet. Be the first to comment!
              </div>

              <!-- Add Comment Form -->
              <template v-if="isAuthenticated">
                <form @submit.prevent="submitComment(project)" class="mt-6">
                  <textarea v-model="project.newComment" placeholder="Add a comment..."
                    class="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3" required></textarea>
                  <button type="submit"
                    class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Submit Comment
                  </button>
                </form>
              </template>
              <template v-else>
                <p class="text-gray-400 mt-6">Please <button @click="login"
                    class="text-blue-500 hover:text-blue-700">log in</button> to add a comment.</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import projectsApi from '@/api/projects'; // Adjust the import path to your API client
import { fetchComments, addComment } from '@/api/comments'; // Import your comment API functions
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from '@auth0/auth0-vue'; // Import useAuth0

library.add(faComment);

export default {
  setup() {
    const projects = ref([]);
    const loading = ref(true);
    const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } = useAuth0(); // Use Auth0

    const toolIcons = {
      "React": ['fab', 'react'],
      "TypeScript": ['fab', 'js'],
      "SpringBoot": ['fas', 'leaf'],
      "Next.js": ['fab', 'js-square'],
      "Tailwind CSS": ['fab', 'css3-alt'],
      "Framer Motion": ['fas', 'code'],
      "Sanity CMS": ['fas', 'database'],
      "Auth.js": ['fas', 'shield-alt'],
      "Markdown": ['fab', 'markdown'],
      "GROQ": ['fas', 'search'],
      "Sentry": ['fas', 'bug']
    };

    const getToolIconColor = (tool) => {
      const colors = {
        "React": "#61DAFB",
        "TypeScript": "#3178C6",
        "SpringBoot": "#6DB33F",
        "Next.js": "#000000",
        "Tailwind CSS": "#38B2AC",
        "Framer Motion": "#E10098",
        "Sanity CMS": "#F03E2F",
        "Auth.js": "#00796B",
        "Markdown": "#000000",
        "GROQ": "#FF4088",
        "Sentry": "#FB4226"
      };
      return colors[tool] || "#FFFFFF";
    };

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

    const toggleComments = (project) => {
      project.showComments = !project.showComments;
      if (project.showComments && project.comments.length === 0) {
        loadComments(project);
      }
    };

    const submitComment = async (project) => {
      if (!isAuthenticated.value) {
        loginWithRedirect(); // Redirect to Auth0 login
        return;
      }

      try {
        const token = await getAccessTokenSilently(); // Get the access token
        const commentData = { ...project.newComment, project_id: project._id };
        const response = await addComment(commentData, token); // Pass the token to the API function
        project.comments.push(response);
        project.newComment = '';
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    };

    onMounted(async () => {
      try {
        const data = await projectsApi.getProjects();
        projects.value = data.map(project => ({
          ...project,
          comments: [],
          commentsLoading: false,
          showComments: false, // Add showComments flag
          newComment: '',
          newCommentAuthor: ''
        }));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        loading.value = false;
      }
    });

    return { projects, loading, toolIcons, getToolIconColor, toggleComments, submitComment, isAuthenticated, user, loginWithRedirect, getAccessTokenSilently };
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>