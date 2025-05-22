<script setup lang="ts">
import AboutSection from './sections/AboutSection.vue';
import ProjectsSection from './sections/ProjectsSection.vue';
import SkillsSection from './sections/SkillsSection.vue';
import ContactSection from './sections/ContactSection.vue';
</script>

<template>
  <main class="pt-16"> <!-- Add padding-top to account for fixed header -->
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <ContactSection />
  </main>
</template>