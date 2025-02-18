<template>
  <div class="min-h-screen text-foreground flex flex-col relative">
    <!-- Background (Lowest Layer) -->
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 to-purple-900"
      style="background: linear-gradient(135deg, #004d40 0%, #00796b 90%, #004d40 100%);"></div>

    <!-- Particles (Middle Layer) -->
    <div id="particles-js" class="absolute inset-0 z-10"></div>

    <!-- Navigation Bar -->
    <nav class="bg-gray-900/90 backdrop-blur-md fixed w-full z-50">
      <div class="container mx-auto flex items-center justify-between py-4 px-6">
        <!-- Logo -->
        <router-link to="/" class="text-lg font-semibold text-white hover:text-purple-400 transition-colors">
          Adem Bessam
        </router-link>

        <!-- Centered Links with Rounded Background -->
        <div
          class="hidden md:flex items-center space-x-4 bg-gray-800/70 backdrop-blur-md rounded-full px-6 py-2 shadow-lg">
          <router-link to="/" class="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
            Home
          </router-link>
          <router-link to="/projects" class="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
            Projects
          </router-link>
          <router-link to="/about" class="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
            About
          </router-link>
        </div>

        <!-- Right Side: Admin Login, Language Selector, Theme Toggle -->
        <div class="flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <button @click="login" class="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
              Login
            </button>
          </template>
          <template v-else>
            <router-link v-if="isAdmin" to="/dashboard"
              class="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
              Dashboard
            </router-link>
            <button @click="logout" class="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
              Logout
            </button>
            <img v-if="user" :src="user.picture" alt="User" class="w-8 h-8 rounded-full" />
          </template>
          <div class="relative">
            <select v-model="currentLanguage" @change="changeLanguage"
              class="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-sm text-gray-300 focus:outline-none appearance-none">
              <option v-for="lang in languages" :key="lang" :value="lang">
                {{ lang }}
              </option>
            </select>
            <font-awesome-icon icon="chevron-down"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <font-awesome-icon :icon="[isDarkTheme ? 'fas' : 'far', 'moon']" class="text-xl" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu (Hamburger Icon) -->
      <div class="md:hidden flex justify-end px-6 py-2">
        <button @click="toggleMobileMenu" class="text-gray-300 hover:text-purple-400 focus:outline-none">
          <font-awesome-icon :icon="['fas', 'bars']" class="text-xl" />
        </button>
      </div>

      <!-- Mobile Menu Links -->
      <div v-if="isMobileMenuOpen" class="md:hidden px-6 py-4 space-y-4 bg-gray-900/90 backdrop-blur-md">
        <router-link to="/projects"
          class="block text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
          Projects
        </router-link>
        <router-link to="/about"
          class="block text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
          About
        </router-link>
      </div>
    </nav>

    <!-- Router View -->
    <div class="flex-grow relative z-20">
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="text-center py-8 relative z-20">
      <p class="text-gray-300 text-sm">&copy; 2023 Adem Bessam. All rights reserved.</p>
      <div class="mt-4 flex justify-center space-x-6">
        <a href="https://github.com/Hares-2088" target="_blank"
          class="text-gray-300 hover:text-purple-400 transition-colors">
          <font-awesome-icon :icon="['fab', 'github']" class="text-2xl" />
        </a>
        <a href="https://www.linkedin.com/in/adem-bessam-b84831252/" target="_blank"
          class="text-gray-300 hover:text-purple-400 transition-colors">
          <font-awesome-icon :icon="['fab', 'linkedin']" class="text-2xl" />
        </a>
        <a href="mailto:adembessam@gmail.com" class="text-gray-300 hover:text-purple-400 transition-colors">
          <font-awesome-icon :icon="['fas', 'envelope']" class="text-2xl" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth';
import { useAuth0 } from '@auth0/auth0-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faMoon as fasMoon, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'particles.js';
import { computed } from "vue";

library.add(faBars, fasMoon, farMoon, faSpinner);

export default {
  name: 'App',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const authStore = useAuthStore();
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    const isAdmin = computed(() => authStore.hasRole('Admin'));

    return {
      login: loginWithRedirect,
      logout: logout,
      user: user,
      isAuthenticated: isAuthenticated,
      isAdmin: isAdmin,
    };
  },
  data() {
    return {
      languages: ['en', 'fr'],
      currentLanguage: 'en',
      isDarkTheme: false,
      isMobileMenuOpen: false,
    };
  },
  mounted() {
    // Initialize Particle.js
    if (window.particlesJS) {
      window.particlesJS.load('particles-js', '/particles.json', () => {
        console.log('Particles.js loaded');
      });
    } else {
      console.error('particlesJS is not defined');
    }
  },
  methods: {
    changeLanguage(language) {
      this.$i18n.locale = language;
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      document.documentElement.classList.toggle('dark', this.isDarkTheme);
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
  },
};
</script>

<style>
/* Ensure the background covers the entire page */
.min-h-screen {
  position: relative;
  z-index: 0;
}

/* Particles container */
#particles-js {
  position: fixed;
  /* Changed from absolute to fixed */
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}

/* Content and footer */
.flex-grow,
footer {
  position: relative;
  z-index: 20;
}
</style>