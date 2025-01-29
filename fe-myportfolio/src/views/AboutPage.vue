<template>
  <v-app>
    <v-container>
      <!-- Hero Section -->
      <v-row justify="center" align="center" class="hero">
        <v-col cols="12" md="8" class="text-center">
          <v-avatar size="150">
            <img src="path/to/your/profile-picture.jpg" alt="Profile Picture">
          </v-avatar>
          <h1 class="text-h2 font-weight-bold mt-4">{{ $t('aboutMe') }}</h1>
          <p class="text-subtitle-1 font-weight-light">
            👋 Hi! I'm Adem, a passionate software developer with expertise in both frontend and backend technologies.
            Currently studying Computer Science at Champlain College.
          </p>
          <v-btn href="path/to/your/cv.pdf" target="_blank" color="primary" class="mt-4">
            {{ $t('downloadCV') }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- Code Display Section -->
      <v-row justify="center" class="code-display">
        <v-col cols="12" md="10">
          <h2 class="text-center text-h4 font-weight-bold">🛠️ My Developer Profile</h2>
          <pre>
            <code>
{`
const adem = {
  code: [JavaScript, PHP, Java, Python, HTML, CSS, C#, Swift, C++, Kotlin, Typescript],
  tools: [React, Spring Boot, Laravel, Git, Docker, Postman, EmailJS, Linux, Jira, Unity],
  databases: [MongoDB, SQL, Postgres, SQLite],
  methodologies: ["Agile", "Test-Driven Development"],
  projects: [
    { name: "BookWiki", description: "A Goodreads-like application for books." },
    { name: "Fluent Fingers", description: "A Duolingo-like app for sign language." },
    { name: "Dar El Salam Travel", description: "Travel tour management system." },
    { name: "Pet Clinic", description: "Veterinary product management system." },
    { name: "SmartNest", description: "A smart home management system." },
    { name: "ShoppingCart_BE", description: "Shopping cart application with Google OAuth integration using Laravel." },
    { name: "Chess", description: "A Java-based chess game implementation." },
    { name: "SensorViz", description: "A tool for visualizing sensor data." },
    { name: "myLibrary", description: "A personal library management system." },
    { name: "GABI", description: "A music platform app for musicians, utilizing Spotify's API for track samples." }
  ],
  challenge: "Currently working on a travel tour management system for Dar El Salam"
}
`}
            </code>
          </pre>
        </v-col>
      </v-row>

      <!-- Projects Section -->
      <!-- <v-row>
        <v-col cols="12">
          <h2 class="text-center text-h4 font-weight-bold">Projects</h2>
          <v-row>
            <ProjectCard v-for="(project, index) in projects" :key="project.name" :project="project" :reverse="index % 2 === 1" />
          </v-row>
        </v-col>
      </v-row> -->

      <!-- Hobbies Section -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-center text-h4 font-weight-bold">Hobbies</h2>
          <p class="text-center">In my free time, I enjoy reading fantasy books and competing in cross-country races.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// import ProjectCard from '@/components/ProjectCard.vue';

export default {
  name: 'AboutPage',
//   components: {
//     ProjectCard
//   },
  data() {
    return {
      projects: [
        {
          name: "Fluent Fingers",
          description: "This was our project for 2024 mcHacks. It is a Duolingo-like application for sign language. Using CV2, we trained an AI for image recognition, allowing users to interact efficiently. Our team won 3rd place with this project!",
          image: "path/to/fluentfingers-image.jpg",
          features: ["AI-driven sign language recognition", "User-friendly interactive lessons", "Developed in 24 hours during mcHacks"]
        },
        {
          name: "Smart Nest",
          description: "IoT Dashboard with Flask and MQTT, providing real-time and historical data visualization for temperature and humidity.",
          image: "path/to/smartnest-image.jpg",
          features: ["Live Data Monitoring", "Historical Data Tracking", "Interactive Web Interface", "MQTT Integration", "Motion Sensor Alerts", "LED Control"]
        },
        {
          name: "Dar El Salam Travel System",
          description: "A comprehensive platform to streamline operations for Dar El Salam Travel, modernizing their online presence and enhancing user experience.",
          image: "path/to/darelsalam-image.jpg",
          features: ["Customer Booking and Management", "Staff Administration Tools", "Real-time Inventory Tracking", "Community System for Customer Engagement"]
        }
      ]
    };
  }
};
</script>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 40px;
}
.project-details {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.reverse {
  flex-direction: row-reverse;
}
.project-image {
  width: 50%;
  border-radius: 10px;
  margin-right: 20px;
}
.reverse .project-image {
  margin-right: 0;
  margin-left: 20px;
}
.project-text {
  width: 50%;
}
.indent-right {
  padding-right: 20px;
}
.feature {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.feature v-icon {
  margin-right: 10px;
  color: #4caf50;
}
.code-display {
  background-color: #2d2d2d;
  padding: 20px;
  border-radius: 10px;
  margin-top: 40px;
  color: #f8f8f2;
  font-family: 'Fira Code', monospace;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}
code {
  display: block;
  padding: 10px;
  background-color: #1e1e1e;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
