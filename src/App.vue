<script setup lang="ts">
import { ref } from 'vue';
import TerminalShell from './cli/TerminalShell.vue';
import MainContent from './components/MainContent.vue';
import Header from './components/Header.vue';
import CertificationsModal from './components/CertificationsModal.vue';

const isTerminalMode = ref(false);
const showCertifications = ref(false);

const exitTerminal = () => {
  isTerminalMode.value = false;
};

const enterTerminal = () => {
  isTerminalMode.value = true;
};

const toggleCertifications = () => {
  showCertifications.value = !showCertifications.value;
};
</script>

<template>
  <div class="min-h-screen bg-[#111111]">
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