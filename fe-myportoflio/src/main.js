import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Ensure router is imported
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)  // Use router here!
  .use(vuetify)
  .mount('#app')
