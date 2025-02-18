<template>
  <div class="min-h-screen text-foreground flex flex-col relative">
    <!-- Background (Lowest Layer) -->
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 to-purple-900"
      style="background: linear-gradient(135deg, #004d40 0%, #00796b 90%, #004d40 100%);"></div>

    <!-- Particles (Middle Layer) -->
    <div id="particles-js" class="fixed inset-0 z-10"></div>

    <!-- Navigation Bar -->
    <nav
      :class="['bg-gray-900/90 backdrop-blur-md fixed w-full z-50 transition-transform duration-300', { '-translate-y-full': !isNavbarVisible }]">
      <div class="container mx-auto flex items-center justify-between py-4 px-6">
        <!-- Logo -->
        <router-link to="/" class="text-lg font-semibold text-white hover:text-purple-400 transition-colors">
          Adem's portfolio
        </router-link>

        <!-- Centered Navigation Links (Hidden on Mobile) -->
        <div
          class="hidden md:flex items-center space-x-4 bg-gray-800/70 backdrop-blur-md rounded-full px-6 py-2 shadow-lg">
          <router-link to="/" class="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
            {{ $t('home') }}
          </router-link>
          <router-link to="/projects" class="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
            {{ $t('projects') }}
          </router-link>
        </div>

        <!-- Right Side: Admin Login, Language Selector (Hidden on Mobile) -->
        <div class="hidden md:flex items-center space-x-4">
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

          <!-- Language Selector -->
          <div class="relative hidden md:block">
            <button @click="toggleLanguageMenu"
              class="flex items-center px-3 py-1 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:outline-none hover:bg-gray-700 transition-colors">
              <font-awesome-icon :icon="['fas', 'globe']" class="mr-2" />
              {{ languageLabels[currentLanguage] }}
              <font-awesome-icon :icon="['fas', 'chevron-down']" class="ml-2 text-gray-400" />
            </button>

            <div v-if="isLanguageMenuOpen"
              class="absolute mt-2 w-32 bg-gray-900 border border-gray-700 rounded-md shadow-lg overflow-hidden z-50">
              <button v-for="lang in languages" :key="lang" @click="changeLanguage(lang)"
                class="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                <img :src="languageFlags[lang]" alt="Flag" class="w-5 h-5 mr-2 rounded" />
                {{ languageLabels[lang] }}
              </button>
            </div>
          </div>
        </div>

        <!-- Hamburger Menu Button (Visible on Mobile) -->
        <button @click="toggleMobileMenu" class="md:hidden text-gray-300 hover:text-purple-400 focus:outline-none">
          <font-awesome-icon :icon="['fas', 'bars']" class="text-xl" />
        </button>
      </div>
    </nav>

    <!-- Mobile Sidebar Menu -->
    <div
      :class="['fixed inset-y-0 left-0 w-64 bg-gray-900/90 backdrop-blur-md z-50 transform transition-transform duration-300', { '-translate-x-full': !isMobileMenuOpen }]">
      <div class="flex justify-end p-4">
        <button @click="toggleMobileMenu" class="text-gray-300 hover:text-purple-400 focus:outline-none">
          <font-awesome-icon :icon="['fas', 'times']" class="text-xl" />
        </button>
      </div>
      <div class="px-6 py-4 space-y-4">
        <router-link to="/" class="block text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
          {{ $t('home') }}
        </router-link>
        <router-link to="/projects"
          class="block text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
          {{ $t('projects') }}
        </router-link>
        <template v-if="!isAuthenticated">
          <button @click="login"
            class="block text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
            Login
          </button>
        </template>
        <template v-else>
          <router-link v-if="isAdmin" to="/dashboard"
            class="block text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
            Dashboard
          </router-link>
          <button @click="logout"
            class="block text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
            Logout
          </button>
        </template>

        <!-- Language Selector (Mobile) -->
        <div class="px-6 py-4">
          <button @click="toggleLanguageMenu"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-md focus:outline-none hover:bg-gray-700 transition-colors">
            <font-awesome-icon :icon="['fas', 'globe']" class="mr-2" />
            {{ languageLabels[currentLanguage] }}
          </button>

          <div v-if="isLanguageMenuOpen"
            class="mt-2 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg overflow-hidden">
            <button v-for="lang in languages" :key="lang" @click="changeLanguage(lang)"
              class="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              <img :src="languageFlags[lang]" alt="Flag" class="w-5 h-5 mr-2 rounded" />
              {{ languageLabels[lang] }}
            </button>
          </div>
        </div>
      </div>
    </div>

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
import { faBars, faTimes, faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'particles.js';
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from 'vue-i18n';

library.add(faBars, faTimes, faGlobe, faChevronDown);

export default {
  name: 'App',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const authStore = useAuthStore();
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    const isAdmin = computed(() => authStore.hasRole('Admin'));
    const { t, locale } = useI18n();

    const isNavbarVisible = ref(true);
    const isMobileMenuOpen = ref(false);
    const isLanguageMenuOpen = ref(false);

    const handleScroll = () => {
      isNavbarVisible.value = window.scrollY <= 50;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      login: loginWithRedirect,
      logout: logout,
      user: user,
      isAuthenticated: isAuthenticated,
      isAdmin: isAdmin,
      t,
      locale,
      isNavbarVisible,
      isMobileMenuOpen,
      isLanguageMenuOpen,
    };
  },
  data() {
    return {
      languages: ['en', 'fr'],
      currentLanguage: 'en',
      languageLabels: {
        en: "English",
        fr: "Français"
      },
      languageFlags: {
        en: "https://flagcdn.com/w40/us.png", // Replace with actual flag URLs
        fr: "https://flagcdn.com/w40/fr.png"
      }
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
    changeLanguage(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang;
      this.isLanguageMenuOpen = false;
    },
    toggleLanguageMenu() {
      this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
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