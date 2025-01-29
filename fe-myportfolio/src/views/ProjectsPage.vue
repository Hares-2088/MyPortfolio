<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-center text-h4 font-weight-bold">{{ $t('allProjects') }}</h2>
          <v-row>
            <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" md="4" lg="3">
              <v-card elevation="3">
                <v-img :src="project.image" height="200px"></v-img>
                <v-card-title>{{ project.name }}</v-card-title>
                <v-card-subtitle>{{ project.description }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn :to="{ name: 'ProjectDetails', params: { id: project.id } }" color="primary">{{ $t('viewDetails') }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const projects = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/yourgithub/yourrepo/main/all-projects.json');
        projects.value = await response.json();
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    });

    return { projects };
  }
};
</script>

<style scoped>
/* Add any specific styles for the Projects page here */
</style>
