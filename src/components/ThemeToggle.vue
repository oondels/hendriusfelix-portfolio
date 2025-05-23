<script setup lang="ts">
import { useTheme } from '../composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button
    @click="toggleTheme"
    class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10"
    :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <span class="sr-only">Toggle theme</span>
    
    <!-- Sun icon -->
    <svg
      v-if="theme === 'dark'"
      class="h-5 w-5 text-[#D3D3D3]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    
    <!-- Moon icon -->
    <svg
      v-else
      class="h-5 w-5 text-[#D3D3D3]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>