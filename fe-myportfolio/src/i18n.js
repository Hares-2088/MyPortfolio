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
        viewOnGitHub: 'View on GitHub',
        leaveComment: 'Leave a Comment',
        submitComment: 'Submit Comment',
        noComments: 'No comments yet.',
        addComment: 'Add a comment...',
        commentingAs: 'Commenting as',
        downloadResume: 'Download Resume',
        letsConnect: "Let's connect",
        hiThere: 'Hi there,',
        myNameIs: 'My name is',
        iAmA: 'I am a',
        fullStackDeveloper: 'Full-Stack Developer',
        whereIdeasComeToLife: 'Where ideas come to life through code and creativity.',
        loadingProjects: 'Loading projects...',
        hideComments: 'Hide Comments',
        loadingComments: 'Loading comments...',
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
        viewOnGitHub: 'Voir sur GitHub',
        leaveComment: 'Laisser un commentaire',
        submitComment: 'Soumettre un commentaire',
        noComments: 'Pas encore de commentaires.',
        addComment: 'Ajouter un commentaire',
        commentingAs: 'Commentaire en tant que',
        downloadResume: 'Télécharger le CV',
        letsConnect: 'Connectons-nous',
        hiThere: 'Bonjour,',
        myNameIs: 'Je m\'appelle',
        iAmA: 'Je suis un',
        fullStackDeveloper: 'Développeur Full-Stack',
        whereIdeasComeToLife: 'Où les idées prennent vie grâce au code et à la créativité.',
        loadingProjects: 'Chargement des projets...',
        hideComments: 'Masquer les commentaires',
        loadingComments: 'Chargement des commentaires...',
    }
};

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

export default i18n;
