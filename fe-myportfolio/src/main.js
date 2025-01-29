import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Ensure router is imported
import vuetify from './plugins/vuetify'
import i18n from './i18n'; // Import the i18n instance
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(i18n); // Register i18n
app.mount('#app');