<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from './composables/useTheme';

const { theme } = useTheme();

onMounted(() => {
  document.documentElement.classList.add(theme.value);
});
</script>