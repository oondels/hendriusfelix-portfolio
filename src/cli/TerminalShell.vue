<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useEventListener } from '@vueuse/core';
import { executeCommand } from './commands/models/FileSystem';

interface HistoryEntry {
  command: string;
  output: string[];
}

const emit = defineEmits(['exit']);

const commandHistory = ref<HistoryEntry[]>([]);
const currentCommand = ref('');
const historyIndex = ref(-1);
const historyBuffer = ref<string[]>([]);
const suggestions = ref<string[]>([]);
const showSuggestions = ref(false);

const terminalRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const prompt = 'hendrius@portfolio:~$ ';

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
  
  // Initial welcome message
  commandHistory.value.push({
    command: '',
    output: [
      'Welcome to Hendrius Félix\'s Portfolio Terminal',
      'Type "help" to see available commands',
      ''
    ]
  });
});

const handleCommand = async () => {
  const cmd = currentCommand.value.trim();
  if (!cmd) return;

  // Add command to history
  historyBuffer.value.push(cmd);
  historyIndex.value = historyBuffer.value.length;

  // Handle exit command specially
  if (cmd.toLowerCase() === 'exit') {
    commandHistory.value.push({
      command: cmd,
      output: ['Exiting terminal...']
    });
    
    setTimeout(() => {
      emit('exit');
    }, 1000);
    
    return;
  }

  // Execute command and get output
  const output = await executeCommand(cmd);

  // Add to display history
  commandHistory.value.push({
    command: cmd,
    output: output
  });

  // Clear current command
  currentCommand.value = '';
  showSuggestions.value = false;

  // Scroll to bottom
  setTimeout(() => {
    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }
  }, 50);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleCommand();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex.value > 0) {
      historyIndex.value--;
      currentCommand.value = historyBuffer.value[historyIndex.value];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex.value < historyBuffer.value.length - 1) {
      historyIndex.value++;
      currentCommand.value = historyBuffer.value[historyIndex.value];
    } else {
      historyIndex.value = historyBuffer.value.length;
      currentCommand.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    handleTabCompletion();
  }
};

const handleTabCompletion = () => {
  const availableCommands = [
    'help', 'clear', 'whoami', 'ls', 'cat', 
    'projects', 'skills', 'contact', 'about',
    'exit'
  ];

  const input = currentCommand.value.toLowerCase();
  suggestions.value = availableCommands.filter(cmd => 
    cmd.startsWith(input) && cmd !== input
  );

  if (suggestions.value.length === 1) {
    currentCommand.value = suggestions.value[0];
    showSuggestions.value = false;
  } else if (suggestions.value.length > 1) {
    showSuggestions.value = true;
  }
};

// Keep focus on input
useEventListener(document, 'click', () => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

// Clean up
onUnmounted(() => {
  historyBuffer.value = [];
  commandHistory.value = [];
});
</script>

<template>
  <div class="min-h-screen bg-[#1E1E2E] text-[#CDD6F4] font-mono p-4">
    <div 
      ref="terminalRef"
      class="terminal-output overflow-y-auto max-h-[calc(100vh-8rem)]"
    >
      <div v-for="(entry, index) in commandHistory" :key="index">
        <!-- Command -->
        <div v-if="entry.command" class="flex">
          <span class="text-[#89B4FA] mr-2">{{ prompt }}</span>
          <span>{{ entry.command }}</span>
        </div>
        
        <!-- Output -->
        <div 
          v-for="(line, lineIndex) in entry.output" 
          :key="lineIndex"
          class="ml-4 whitespace-pre-wrap"
        >
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
        @keydown="handleKeydown"
        type="text"
        class="flex-1 bg-transparent outline-none caret-[#89B4FA]"
        autocomplete="off"
      />
    </div>

    <!-- Tab suggestions -->
    <div 
      v-if="showSuggestions && suggestions.length > 0"
      class="mt-2 ml-4 text-[#BAC2DE]"
    >
      <div v-for="suggestion in suggestions" :key="suggestion">
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-output::-webkit-scrollbar {
  width: 8px;
}

.terminal-output::-webkit-scrollbar-track {
  background: #1E1E2E;
}

.terminal-output::-webkit-scrollbar-thumb {
  background: #45475A;
  border-radius: 4px;
}

.terminal-output::-webkit-scrollbar-thumb:hover {
  background: #585B70;
}
</style>