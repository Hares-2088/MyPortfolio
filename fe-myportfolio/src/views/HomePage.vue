<template>
    <v-app>
      <v-container>
        <!-- Hero Section -->
        <v-row justify="center" align="center" class="hero">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold">Adem Bessam</h1>
            <h3 class="text-h5 font-weight-medium">Full-Stack Developer | Cybersecurity Enthusiast</h3>
            <v-btn href="https://github.com/Hares-2088" target="_blank" color="primary" class="mr-2 mt-4">
              GitHub
            </v-btn>
            <v-btn href="https://linkedin.com/in/yourlinkedin" target="_blank" color="secondary" class="mt-4">
              LinkedIn
            </v-btn>
          </v-col>
        </v-row>
  
        <!-- Featured Projects Section -->
        <v-row>
          <v-col cols="12">
            <h2 class="text-center text-h4 font-weight-bold">Featured Projects</h2>
            <v-row>
              <v-col v-for="project in projects" :key="project.id" cols="12" md="6" lg="4">
                <v-card elevation="3">
                  <v-card-title>{{ project.name }}</v-card-title>
                  <v-card-subtitle>{{ project.description }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn :href="project.url" target="_blank" color="primary">View on GitHub</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  
        <!-- About Me Section -->
        <v-row>
          <v-col cols="12">
            <h2 class="text-center text-h4 font-weight-bold">About Me</h2>
            <p class="text-center">
              I'm a passionate full-stack developer with a keen interest in cybersecurity and building efficient web applications.
            </p>
          </v-col>
        </v-row>
  
        <!-- Comments Section (Giscus) -->
        <v-row>
          <v-col cols="12">
            <h2 class="text-center text-h4 font-weight-bold">Community Feedback</h2>
            <div id="giscus"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useGiscus } from '@/composables/useGiscus';
  
  export default {
  setup() {
    const projects = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/yourgithub/yourrepo/main/featured-projects.json');
        projects.value = await response.json();
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    });

    useGiscus();  // This loads the Giscus comments widget

    return { projects };
  }
};
  </script>
  
  <style scoped>
  .hero {
    text-align: center;
    margin-bottom: 40px;
  }
  </style>
  