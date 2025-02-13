import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import Projects from '@/views/ProjectsPage.vue';  // Import the new Projects page
import About from '@/views/AboutPage.vue';  // Import the new About page
import Dashboard from '@/views/Dashboard.vue';  // Import the Dashboard page
import { useAuth0 } from '@auth0/auth0-vue';  // Import Auth0

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  } else {
    next();
  }
});

export default router;
