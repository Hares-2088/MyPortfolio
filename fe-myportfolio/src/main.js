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

library.add(faGithub, faLinkedin, faEnvelope, faReact, faJs, faLeaf, faJsSquare, faCss3Alt, faCode, faDatabase, faShieldAlt, faMarkdown, faSearch, faBug, faExternalLinkAlt);

const app = createApp(App);

// Configure Auth0
app.use(
    createAuth0({
        domain: 'dev-t0j3i4zhwgva2pgz.us.auth0.com', // Replace with your Auth0 domain
        clientId: 'vulbkenR1ESLLfupyEH9YEJM28g8CUCJ', // Replace with your Auth0 client ID
        authorizationParams: {
            redirect_uri: window.location.origin, // Redirect URI after login
        },
    })
);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(i18n); // Register i18n
app.mount('#app');