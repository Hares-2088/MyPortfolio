<template>
    <div class="min-h-screen text-foreground py-12 relative z-20">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-white mb-8">Dashboard</h1>
            <p class="text-gray-300">Welcome, {{ user.value.name || user.value.email }}!</p>
            <div class="mt-8">
                <button @click="logout"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { ref, onMounted } from "vue";

export default {
    setup() {
        const { user, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
        const isAdminUser = ref(false);

        const checkAdminRole = async () => {
            if (!isAuthenticated.value) return;

            try {
                const token = await getAccessTokenSilently();
                const payload = JSON.parse(atob(token.split(".")[1]));
                const roles = payload["https://fastapi.yourdomain.com/roles"] || [];

                isAdminUser.value = roles.includes("admin");
            } catch (error) {
                console.error("Error checking admin role:", error);
                isAdminUser.value = false;
            }
        };

        onMounted(checkAdminRole);

        return { user, logout, isAdminUser };
    }
};
</script>