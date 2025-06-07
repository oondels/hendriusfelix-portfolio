<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'submit']);

const inputRef = ref<HTMLInputElement | null>(null);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleSubmit = () => {
  if (props.disabled) return;
  emit('submit', props.modelValue);
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSubmit();
  }
};
</script>

<template>
  <div class="terminal-prompt flex items-center">
    <span class="text-[#BD93F9] mr-2">hendrius@portfolio.dev:~$</span>
    <input
      ref="inputRef"
      type="text"
      :value="modelValue"
      @input="handleInput"
      @keydown="handleKeydown"
      :disabled="disabled"
      class="bg-transparent outline-none flex-1 text-[#F8F8F2] caret-[#BD93F9] animate-[blink_1s_steps(2,start)_infinite]"
      autocomplete="off"
      autofocus
    />
  </div>
</template>

<style scoped>
@keyframes blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

input.animate-\[blink_1s_steps\(2,start\)_infinite\] {
  animation: blink 1s steps(2, start) infinite;
}
</style>
