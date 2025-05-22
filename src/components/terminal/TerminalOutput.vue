<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const props = defineProps<{
  content: string | string[];
}>();

const outputLines = computed(() => {
  if (Array.isArray(props.content)) {
    return props.content;
  } else if (props.content) {
    return [props.content];
  }
  return [];
});

const visibleLines = ref<string[]>([]);
const isTyping = ref(false);

onMounted(async () => {
  if (outputLines.value.length === 0) return;
  
  isTyping.value = true;
  visibleLines.value = [];
  
  for (const line of outputLines.value) {
    visibleLines.value.push(line);
    // Add a small delay between lines for the typing effect
    await new Promise(resolve => setTimeout(resolve, 30));
  }
  
  isTyping.value = false;
});
</script>

<template>
  <div class="terminal-output my-1 pl-5">
    <p v-for="(line, index) in visibleLines" :key="index" class="whitespace-pre-wrap">{{ line }}</p>
  </div>
</template>