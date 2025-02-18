import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Ensure router is imported
import i18n from './i18n'; // Import the i18n instance
import './assets/styles/main.css'; // Correct the import path
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createAuth0 } from '@auth0/auth0-vue'; // Import Auth0
import { createPinia } from 'pinia'; // Import Pinia
import '@/utils/fontAwesomeIcons'; // Import the FontAwesome icons

const app = createApp(App);

// Configure Auth0 from .env
app.use(
    createAuth0({
        domain: process.env.VUE_APP_AUTH0_DOMAIN,
        clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
            audience: process.env.VUE_APP_AUTH0_AUDIENCE,
        },
        useRefreshTokens: true,
        cacheLocation: 'localstorage',
    })
);

app.use(createPinia()); // Register Pinia
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(i18n); // Register i18n
app.mount('#app');