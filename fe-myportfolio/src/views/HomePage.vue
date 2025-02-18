<template>
  <div class="min-h-screen text-foreground pt-20 relative z-20">
    <div class="container mx-auto py-12 text-center px-4">
      <!-- Profile Picture -->
      <div class="flex justify-center mb-4">
        <img :src="profileImage" alt="Profile"
          class="profile-picture rounded-full border-4 border-teal-500 shadow-lg w-32 h-32 md:w-48 md:h-48" />
      </div>

      <!-- Typewriter Text -->
      <div class="text-2xl font-light text-white mb-4">
        <transition name="fade-up" appear>
          <p v-if="showMessage1" class="text-2xl font-light text-white mb-8">{{ $t('hiThere') }}</p>
        </transition>
      </div>

      <!-- Name and Title -->
      <transition name="fade-up" appear>
        <p v-if="showMessage2" class="text-4xl md:text-5xl font-bold text-white mb-4">
          {{ $t('myNameIs') }} <span class="text-teal-400">Adem Bessam</span>
        </p>
      </transition>
      <transition name="fade-up" appear>
        <p v-if="showMessage3" class="text-2xl font-light text-white mb-8">{{ $t('iAmA') }} {{ $t('fullStackDeveloper')
        }}</p>
      </transition>

      <!-- Skill Badges
      <div class="flex justify-center space-x-4 mb-8 flex-wrap">
        <div class="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white mb-2">
          React
        </div>
        <div class="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white mb-2">
          Node.js
        </div>
        <div class="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white mb-2">
          Python
        </div>
      </div> -->

      <!-- Let's Connect Button -->
      <div class="flex justify-center">
        <transition name="fade-up" appear>
          <button v-if="showButton" @click="handleConnectClick"
            class="px-6 py-2 md:px-8 md:py-3 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 transition duration-300 flex items-center justify-center space-x-2">
            <font-awesome-icon :icon="['fas', 'handshake']" class="text-xl" />
            <span>{{ $t('letsConnect') }}</span>
          </button>
        </transition>
      </div>

      <!-- Download Resume Button -->
      <div class="mt-8">
        <a href="/resume.pdf" download="Adem_Resume.pdf"
          class="px-6 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition duration-300">
          {{ $t('downloadResume') }}
        </a>
      </div>
    </div>

    <!-- Add Comment Section -->
    <div class="mt-12 container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">{{ $t('leaveComment') }}</h2>
      <form @submit.prevent="submitComment" class="mt-6">
        <textarea v-model="newComment" :placeholder="$t('addComment')"
          class="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3" required></textarea>
        <button type="submit"
          class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
          {{ $t('submitComment') }}
        </button>
      </form>
      <div v-if="isAuthenticated" class="mt-2 text-gray-400">
        {{ $t('commentingAs') }}: {{ user.name }}
      </div>
    </div>

    <!-- Approved Comments Section -->
    <div class="mt-12 container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">{{ $t('comments') }}</h2>
      <div v-if="approvedComments.length === 0" class="text-gray-400">
        {{ $t('noComments') }}
      </div>
      <div v-else>
        <div v-for="comment in approvedComments" :key="comment.id"
          class="comment-container bg-gray-900/70 backdrop-blur-md rounded-lg p-6 mb-4 border border-gray-700">
          <p class="comment-author"><strong>{{ comment.author }}</strong> says:</p>
          <p class="comment-content">{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { addComment, fetchComments } from '@/api/comments'; // Import addComment and getApprovedComments functions
import { useAuth0 } from '@auth0/auth0-vue'; // Import useAuth0

library.add(faHandshake);

export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const showMessage1 = ref(false); // For "Hi there"
    const showMessage2 = ref(false); // For "My name is Adem Bessam"
    const showMessage3 = ref(false); // For "I am a Full-Stack Developer"
    const showButton = ref(false); // For "Let's connect" button
    const profileImage = require('@/assets/profile.png');
    const newComment = ref('');
    const { isAuthenticated, user } = useAuth0(); // Use Auth0
    const approvedComments = ref([]);

    onMounted(() => {
      // Animated Text
      setTimeout(() => { showMessage1.value = true; }, 500); // Show "Hi there" first
      setTimeout(() => { showMessage2.value = true; }, 1500); // Show "My name is Adem Bessam"
      setTimeout(() => { showMessage3.value = true; }, 2500); // Show "I am a Full-Stack Developer"
      setTimeout(() => { showButton.value = true; }, 3500); // Show "Let's connect" button
      fetchApprovedComments(); // Fetch approved comments on mount
    });

    const handleConnectClick = () => {
      window.location.href = 'mailto:adembessam@gmail.com';
    };

    const submitComment = async () => {
      try {
        const commentData = {
          content: newComment.value,
          project_id: '67b416a5058e97052852e5e5',
          author: isAuthenticated.value ? user.value.name : "Anonymous", // Use user name if authenticated
          approved: false
        };
        await addComment(commentData); // Call addComment without token
        newComment.value = '';
        alert('Comment submitted successfully!');
      } catch (error) {
        console.error('Error submitting comment:', error);
        alert('Failed to submit comment.');
      }
    };

    const fetchApprovedComments = async () => {
      try {
        const comments = await fetchComments('67b416a5058e97052852e5e5');
        approvedComments.value = comments;
      } catch (error) {
        console.error('Error fetching approved comments:', error);
      }
    };

    return {
      showMessage1, showMessage2, showMessage3, showButton, profileImage, handleConnectClick,
      newComment, submitComment, isAuthenticated, user, approvedComments
    };
  },
};
</script>

<style scoped>
.profile-picture {
  width: 256px;
  height: 256px;
  object-fit: cover;
  object-position: 0% 70%;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 1s, transform 1s;
}

.fade-up-enter,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.comment-container {
  background-color: rgba(31, 41, 55, 0.7);
  /* gray-900 with opacity */
  backdrop-filter: blur(10px);
  border: 1px solid #374151;
  /* gray-700 */
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.comment-author {
  color: #4fd1c5;
  /* teal-400 */
  font-weight: 600;
}

.comment-content {
  color: #d1d5db;
  /* gray-300 */
  margin-top: 0.5rem;
}
</style>