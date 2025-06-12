<script setup lang="ts">
import AboutSection from './sections/AboutSection.vue';
import ProjectsSection from './sections/ProjectsSection.vue';
import SkillsSection from './sections/SkillsSection.vue';
import BlogSection from './sections/BlogSection.vue';
import ContactSection from './sections/ContactSection.vue';
import Header from "./Header.vue"
</script>

<template>
  <main class="pt-16 bg-[#111111]">
    <Header/>
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <BlogSection />
    <ContactSection />
  </main>
</template>