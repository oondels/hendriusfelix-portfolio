<template>
  <div class="min-h-screen bg-background transition-colors duration-300">
    <template v-if="isTerminalMode">
      <TerminalShell @exit="exitTerminal" />
    </template>
    <template v-else>
      <Header 
        @toggle-terminal="enterTerminal"
        @toggle-certifications="toggleCertifications"
      />
      <MainContent />
      <CertificationsModal 
        :show="showCertifications"
        @close="showCertifications = false"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TerminalShell from './cli/TerminalShell.vue';
import MainContent from './components/MainContent.vue';
import Header from './components/Header.vue';
import CertificationsModal from './components/CertificationsModal.vue';
import { useTheme } from './composables/useTheme';

const isTerminalMode = ref(false);
const showCertifications = ref(false);

const { theme } = useTheme();

const exitTerminal = () => {
  isTerminalMode.value = false;
};

const enterTerminal = () => {
  isTerminalMode.value = true;
};

const toggleCertifications = () => {
  showCertifications.value = !showCertifications.value;
};

onMounted(() => {
  // Initialize theme class on document
  document.documentElement.classList.add(theme.value);
});
</script>