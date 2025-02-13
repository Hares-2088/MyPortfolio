<template>
    <div class="min-h-screen text-foreground py-12 relative z-20">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-white mb-8">Dashboard</h1>
            <p class="text-gray-300">Welcome, {{ user.name || user.email }}!</p>
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
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const { user, logout } = useAuth0();

        return {
            user,
            logout,
        };
    },
};
</script>