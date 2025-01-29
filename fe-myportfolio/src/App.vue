<template>
  <v-app :class="{ 'v-application--is-lt': !isDarkTheme, 'v-application--is-dt': isDarkTheme }" :dark="isDarkTheme">
    <v-app-bar app>
      <v-toolbar-title>{{ $t('home') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">{{ $t('home') }}</v-btn>
      <v-btn text to="/projects">{{ $t('projects') }}</v-btn>
      <v-btn text to="/about">{{ $t('about') }}</v-btn>
      <v-btn text @click="login">{{ $t('adminLogin') }}</v-btn>
      <v-select
        :items="languages"
        v-model="currentLanguage"
        @change="changeLanguage"
        class="ml-4"
        dense
        hide-details
        solo
      ></v-select>
      <v-switch v-model="isDarkTheme" class="ml-4">{{ isDarkTheme ? 'Dark' : 'Light' }}</v-switch>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      languages: ['en', 'fr'],
      currentLanguage: 'en',
      isDarkTheme: false
    };
  },
  watch: {
    isDarkTheme(newVal) {
      this.$vuetify.theme.dark = newVal;
    }
  },
  methods: {
    login() {
      // Placeholder for Auth0 login logic
      console.log('Admin login clicked');
    },
    changeLanguage(language) {
      this.$i18n.locale = language;
    }
  }
};
</script>

<style>
/* Add global styles here */
</style>
