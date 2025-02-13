import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import Projects from '@/views/ProjectsPage.vue';  // Import the new Projects page
import About from '@/views/AboutPage.vue';  // Import the new About page

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
