<template>
  <div class="min-h-screen bg-[#1E1E2E] text-[#CDD6F4] font-mono p-4">
    <div ref="terminalRef" class="terminal-output overflow-y-auto max-h-[calc(100vh-8rem)]">
      <div v-for="(entry, index) in commandHistory" :key="index">
        <!-- Command -->
        <div v-if="entry.command" class="flex">
          <span class="text-[#89B4FA] mr-2">{{ prompt }}</span>
          <span>{{ entry.command }}</span>
        </div>

        <!-- Output -->
        <div v-for="(line, lineIndex) in entry.output" :key="lineIndex" class="ml-4 whitespace-pre-wrap">
          {{ line }}
        </div>
      </div>
    </div>

    <!-- Current command line -->
    <div class="flex items-center mt-4">
      <span class="text-[#89B4FA] mr-2">{{ prompt }}</span>
      <input
        ref="inputRef"
        v-model="currentCommand"
        
        type="text"
        class="flex-1 bg-transparent outline-none caret-[#89B4FA]"
        autocomplete="off"
      />
    </div>

    <!-- Tab suggestions -->
    <div v-if="showSuggestions && suggestions.length > 0" class="mt-2 ml-4 text-[#BAC2DE]">
      <div v-for="suggestion in suggestions" :key="suggestion">
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// onUnmounted
import { ref, onMounted } from "vue";
// import { useEventListener } from "@vueuse/core";
// import { executeCommand } from "./commands";

interface HistoryEntry {
  command: string;
  output: string[];
}

const emit = defineEmits(["exit"]);

const commandHistory = ref<HistoryEntry[]>([]);
const currentCommand = ref("");
// const historyIndex = ref(-1);
// const historyBuffer = ref<string[]>([]);
const suggestions = ref<string[]>([]);
const showSuggestions = ref(false);

const terminalRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const prompt = "hendrius@portfolio:~$ ";

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }

  // Initial welcome message
  commandHistory.value.push({
    command: "",
    output: ["Welcome to Hendrius Félix's Portfolio Terminal", 'Type "help" to see available commands', ""],
  });
});
</script>

<style scoped>
.terminal-output::-webkit-scrollbar {
  width: 8px;
}

.terminal-output::-webkit-scrollbar-track {
  background: #1e1e2e;
}

.terminal-output::-webkit-scrollbar-thumb {
  background: #45475a;
  border-radius: 4px;
}

.terminal-output::-webkit-scrollbar-thumb:hover {
  background: #585b70;
}
</style>
