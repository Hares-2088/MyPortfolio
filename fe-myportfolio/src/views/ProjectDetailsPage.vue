<template>
  <v-app>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-img :src="project.image" height="400px"></v-img>
          <h1 class="text-h2 font-weight-bold">{{ project.name }}</h1>
          <p>{{ project.description }}</p>
          <v-btn :href="project.url" target="_blank" color="primary">{{ $t('viewOnGitHub') }}</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2 class="text-center text-h4 font-weight-bold">{{ $t('comments') }}</h2>
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
  props: ['id'],
  setup(props) {
    const project = ref({});

    onMounted(async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/yourgithub/yourrepo/main/projects/${props.id}.json`);
        project.value = await response.json();
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    });

    useGiscus();  // This loads the Giscus comments widget

    return { project };
  }
};
</script>

<style scoped>
/* Add any specific styles for the Project Details page here */
</style>
