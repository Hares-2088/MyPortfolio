import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Projects from "@/views/ProjectsPage.vue";
import About from "@/views/AboutPage.vue";
import AdminDashboardPage from "@/views/AdminDashboardPage.vue";
import { useAuth0 } from "@auth0/auth0-vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/about", name: "About", component: About },
  { path: "/dashboard", name: "AdminDashboardPage", component: AdminDashboardPage, meta: { requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (to.meta.requiresAdmin) {
    if (!isAuthenticated.value) {
      return next("/");
    }

    try {
      const token = await getAccessTokenSilently();
      const payload = JSON.parse(atob(token.split(".")[1]));
      const roles = payload["https://fastapi.yourdomain.com/roles"] || [];

      if (roles.includes("Admin")) {
        return next();
      } else {
        return next("/");
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      return next("/");
    }
  }
  next();
});

export default router;
