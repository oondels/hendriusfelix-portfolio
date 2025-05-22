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
    <span class="text-green-500 mr-2">hendrius@portfolio.dev:~$</span>
    <input
      ref="inputRef"
      type="text"
      :value="modelValue"
      @input="handleInput"
      @keydown="handleKeydown"
      :disabled="disabled"
      class="bg-transparent outline-none flex-1 text-green-400 caret-green-400"
      autocomplete="off"
      autofocus
    />
  </div>
</template>