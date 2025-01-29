<template>
  <v-col cols="12" md="12" class="project-details" :class="{'reverse': reverse}">
    <div class="project-text" :class="{'order-md-2': reverse, 'indent-right': reverse}">
      <h3 class="text-h5 font-weight-bold">{{ project.name }}</h3>
      <p>{{ project.description }}</p>
      <div v-for="feature in project.features" :key="feature" class="feature">
        <v-icon left>mdi-check-circle</v-icon>
        <span>{{ feature }}</span>
      </div>
    </div>
    <v-img :src="project.image" alt="Project Image" class="project-image" :class="{'order-md-1': reverse}" />
  </v-col>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    },
    reverse: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
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
</style>
