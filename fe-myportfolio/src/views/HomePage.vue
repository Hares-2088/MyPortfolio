<template>
  <div class="min-h-screen text-foreground pt-20 relative z-20">
    <div class="container mx-auto py-12 text-center">
      <!-- Profile Picture -->
      <div class="flex justify-center mb-4">
        <img :src="profileImage" alt="Profile"
          class="profile-picture rounded-full border-4 border-teal-500 shadow-lg" />
      </div>

      <!-- Typewriter Text -->
      <div class="text-2xl font-light text-white mb-4">
        <transition name="fade-up" appear>
          <p v-if="showMessage1" class="text-2xl font-light text-white mb-8">Hi there,</p>
        </transition>
      </div>

      <!-- Name and Title -->
      <transition name="fade-up" appear>
        <p v-if="showMessage2" class="text-5xl font-bold text-white mb-4">
          My name is <span class="text-teal-400">Adem Bessam</span>
        </p>
      </transition>
      <transition name="fade-up" appear>
        <p v-if="showMessage3" class="text-2xl font-light text-white mb-8">I am a Full-Stack Developer</p>
      </transition>

      <!-- Skill Badges -->
      <div class="flex justify-center space-x-4 mb-8">
        <div class="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white">
          React
        </div>
        <div class="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white">
          Node.js
        </div>
        <div class="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white">
          Python
        </div>
      </div>

      <!-- Let's Connect Button -->
      <div class="flex justify-center">
        <transition name="fade-up" appear>
          <button v-if="showButton" @click="handleConnectClick"
            class="px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 transition duration-300 flex items-center justify-center space-x-2">
            <font-awesome-icon :icon="['fas', 'handshake']" class="text-xl" />
            <span>Let's connect</span>
          </button>
        </transition>
      </div>

      <!-- Download Resume Button -->
      <div class="mt-8">
        <a href="src\assets\Resume.pdf" download
          class="px-6 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition duration-300">
          Download Resume
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

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

    onMounted(() => {
      // Animated Text
      setTimeout(() => { showMessage1.value = true; }, 500); // Show "Hi there" first
      setTimeout(() => { showMessage2.value = true; }, 1500); // Show "My name is Adem Bessam"
      setTimeout(() => { showMessage3.value = true; }, 2500); // Show "I am a Full-Stack Developer"
      setTimeout(() => { showButton.value = true; }, 3500); // Show "Let's connect" button
    });

    const handleConnectClick = () => {
      window.location.href = 'mailto:adembessam@gmail.com';
    };

    return { showMessage1, showMessage2, showMessage3, showButton, profileImage, handleConnectClick };
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
</style>