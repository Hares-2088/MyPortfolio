import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        home: 'Home',
        projects: 'Projects',
        about: 'About Me',
        adminLogin: 'Admin Login',
        featuredProjects: 'Featured Projects',
        aboutMe: 'About Me',
        communityFeedback: 'Community Feedback',
        downloadCV: 'Download CV',
        skills: 'Skills',
        allProjects: 'All Projects',
        comments: 'Comments',
        viewDetails: 'View Details',
        viewOnGitHub: 'View on GitHub'
    },
    fr: {
        home: 'Accueil',
        projects: 'Projets',
        about: 'À propos de moi',
        adminLogin: 'Connexion Admin',
        featuredProjects: 'Projets en vedette',
        aboutMe: 'À propos de moi',
        communityFeedback: 'Retour de la communauté',
        downloadCV: 'Télécharger le CV',
        skills: 'Compétences',
        allProjects: 'Tous les projets',
        comments: 'Commentaires',
        viewDetails: 'Voir les détails',
        viewOnGitHub: 'Voir sur GitHub'
    }
};

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
});

export default i18n;
