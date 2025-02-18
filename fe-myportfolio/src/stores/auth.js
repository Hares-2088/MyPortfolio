import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref, onMounted, watch } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const roles = ref([]);

    const checkToken = async () => {
        if (!isAuthenticated.value) {
            console.warn("User is not authenticated. Skipping token fetch.");
            return;
        }

        try {
            const token = await getAccessTokenSilently();
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            console.log("Decoded Token:", decodedToken);
            roles.value = decodedToken[`${process.env.VUE_APP_AUTH0_NAMESPACE}roles`] || [];
        } catch (error) {
            console.error("Error getting token:", error);
        }
    };

    onMounted(() => {
        if (isAuthenticated.value) {
            checkToken();
        }
    });

    watch(isAuthenticated, (newValue) => {
        if (newValue) {
            checkToken();
        }
    });

    const hasRole = (role) => {
        return roles.value.includes(role);
    };

    return {
        roles,
        checkToken,
        hasRole,
    };
});