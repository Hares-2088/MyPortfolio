import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import Projects from '@/views/ProjectsPage.vue';  // Import the new Projects page
import About from '@/views/AboutPage.vue';  // Import the new About page
import ProjectDetails from '@/views/ProjectDetailsPage.vue';  // Import the new Project Details page

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
    path: '/projects/:id',
    name: 'ProjectDetails',
    component: ProjectDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
