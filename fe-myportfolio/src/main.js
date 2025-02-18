import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Ensure router is imported
import i18n from './i18n'; // Import the i18n instance
import './assets/styles/main.css'; // Correct the import path
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin, faReact, faJs, faJsSquare, faCss3Alt, faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLeaf, faCode, faDatabase, faShieldAlt, faSearch, faBug, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createAuth0 } from '@auth0/auth0-vue'; // Import Auth0
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons
import { createPinia } from 'pinia'; // Import Pinia

// Add all solid icons to the library
library.add(fas);

library.add(faGithub, faLinkedin, faEnvelope, faReact, faJs, faLeaf, faJsSquare, faCss3Alt, faCode, faDatabase, faShieldAlt, faMarkdown, faSearch, faBug, faExternalLinkAlt);

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