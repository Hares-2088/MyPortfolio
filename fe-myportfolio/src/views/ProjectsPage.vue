<template>
  <div class="min-h-screen text-foreground py-12 relative z-20">
    <div class="container mx-auto px-4">
      <!-- Artistic Title -->
      <h1
        class="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 drop-shadow-lg text-center"
        style="line-height: 1.5;">
        {{ $t('featuredProjects') }}
      </h1>
      <!-- Subtitle with Soft Glow -->
      <p class="text-lg md:text-xl text-gray-300 mt-4 px-4 md:px-16 animate-fade-in text-center">
        <span class="text-white font-semibold">{{ $t('communityFeedback') }}</span> {{ $t('whereIdeasComeToLife') }}
      </p>
      <div v-if="loading" class="text-center text-white mt-8">
        <font-awesome-icon icon="spinner" spin class="text-2xl" />
        <p class="mt-2">{{ $t('loadingProjects') }}</p>
      </div>
      <div v-else class="space-y-12 mt-8">
        <div v-for="project in projects" :key="project.id" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left Column: Project Image -->
          <div class="w-full h-64 md:h-80 relative">
            <img :src="project.image || '/Sunset-Forrest.png'" :alt="project.title"
              class="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
            <div v-if="project.image === null"
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <p class="text-white text-lg font-bold">Image not available</p>
            </div>
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
                <font-awesome-icon :icon="['fas', 'external-link-alt']" class="mr-1"
                  :style="{ color: getToolIconColor(tool) }" /> </a>
            </div>

            <!-- Toggle Comments Button -->
            <button @click="toggleComments(project)"
              class="mt-6 px-3 py-2 w-dw text-ms bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-300">
              <font-awesome-icon :icon="['fas', 'comment']" class="mr-3" />
              {{ project.showComments ? $t('hideComments') : $t('addComment') }}
            </button>
          </div>

          <!-- Comments Section (Hidden by Default) -->
          <div v-if="project.showComments" class="col-span-full mt-8">
            <h3 class="text-2xl font-bold text-white mb-4">{{ $t('comments') }}</h3>
            <div v-if="project.commentsLoading" class="text-center text-white">
              <font-awesome-icon icon="spinner" spin class="text-xl" />
              <p>{{ $t('loadingComments') }}</p>
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
                {{ $t('noComments') }}
              </div>

              <!-- Add Comment Form -->
              <form @submit.prevent="submitComment(project)" class="mt-6">
                <textarea v-model="project.newComment" :placeholder="$t('addComment')"
                  class="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3" required></textarea>
                <button type="submit"
                  class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  {{ $t('submitComment') }}
                </button>
              </form>
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
import { faComment, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { toolIcons, getToolIconColor } from '@/utils/toolIcons'; // Adjust the import path as necessary

library.add(faComment, faExternalLinkAlt);

export default {
  setup() {
    const projects = ref([]);
    const loading = ref(true);

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
      try {
        const commentData = {
          content: project.newComment,
          project_id: project._id,
          author: "Anonymous", // Replace with actual author if available
          approved: false
        };
        const response = await addComment(commentData); // Call addComment without token
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
        }));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        loading.value = false;
      }
    });

    return { projects, loading, toolIcons, getToolIconColor, toggleComments, submitComment };
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