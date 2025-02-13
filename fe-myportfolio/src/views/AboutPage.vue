<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Hero Section -->
    <div class="container mx-auto py-12">
      <div class="text-center">
        <div class="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary">
          <img src="@/assets/profile-picture.png" alt="Profile Picture" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-4xl font-bold mt-6 text-foreground">{{ $t('aboutMe') }}</h1>
        <p class="text-lg text-muted-foreground mt-4">
          👋 Hi! I'm Adem, a passionate software developer with expertise in both frontend and backend technologies.
          Currently studying Computer Science at Champlain College.
        </p>
        <a
          :href="require('@/assets/Resume.pdf').default"
          download
          target="_blank"
          class="inline-flex items-center px-6 py-2 mt-6 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
        >
          {{ $t('downloadCV') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjects } from '@/api/projects';

export default {
  name: 'AboutPage',
  data() {
    return {
      projects: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      this.projects = await getProjects();
    } catch (error) {
      this.error = error.message || 'Failed to fetch projects';
    } finally {
      this.loading = false;
    }
  },
};
</script>