<script setup lang="ts">
import { ref } from 'vue';
import TerminalShell from './cli/TerminalShell.vue';
import MainContent from './components/MainContent.vue';
import Header from './components/Header.vue';

const isTerminalMode = ref(true);

const exitTerminal = () => {
  isTerminalMode.value = false;
};

const enterTerminal = () => {
  isTerminalMode.value = true;
};
</script>

<template>
  <div class="min-h-screen" :class="{ 'bg-[#1E1E2E]': isTerminalMode }">
    <template v-if="isTerminalMode">
      <TerminalShell @exit="exitTerminal" />
    </template>
    <template v-else>
      <Header @toggle-terminal="enterTerminal" />
      <MainContent />
    </template>
  </div>
</template>