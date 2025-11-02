<template>
  <div class="min-h-screen bg-[#1E1E2E] text-[#CDD6F4] font-mono p-4">
    <div ref="terminalRef" class="terminal-output overflow-y-auto max-h-[calc(100vh-8rem)]">
      <div v-for="(entry, index) in history" :key="index">
        <!-- Command -->
        <div v-if="entry.command" class="flex">
          <span class="text-[#89B4FA] mr-2">{{ prompt }}</span>
          <span>{{ entry.command }}</span>
        </div>

        <!-- Output -->
        <div v-for="(line, lineIndex) in entry.output" :key="lineIndex" 
             class="whitespace-pre-wrap"
             :class="{ 'ml-0': !entry.command, 'ml-4': entry.command }"
             v-html="ansiToHtml(line)">
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
        @keyup.enter="handleCommandInput"
        type="text"
        class="flex-1 bg-transparent outline-none caret-[#89B4FA] text-[#CDD6F4]"
        autocomplete="off"
        spellcheck="false"
      />
    </div>

    <!-- Tab suggestions -->
    <div v-if="showSuggestions && suggestions.length > 0" class="mt-2 p-2 bg-[#181825] rounded border border-[#45475a]">
      <div class="text-[#BAC2DE] text-sm mb-1">Sugestões disponíveis:</div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <div 
          v-for="(suggestion, index) in suggestions" 
          :key="index" 
          class="text-[#89B4FA] hover:bg-[#313244] px-2 py-1 rounded cursor-pointer transition-colors"
        >
          {{ suggestion }}
        </div>
      </div>
      <div class="text-[#6C7086] text-xs mt-2">
        💡 Pressione Tab novamente para ver mais opções ou continue digitando
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useTerminalState } from "@/features/terminal/composables/useTerminalState";
import { useAutoComplete } from "@/features/terminal/composables/useAutoComplete";
import { useCommandHistory } from "@/features/terminal/composables/useCommandHistory";
import { CommandExecutor } from "@/features/terminal/commands/executor";
import { getFileContent } from "@/features/terminal/filesystem/content";
import type { HistoryEntry } from "@/features/terminal/types/terminal.types";

const router = useRouter();
const { state, prompt: statePrompt, addToHistory } = useTerminalState();
const { autoComplete, getContextualSuggestions } = useAutoComplete();
const { 
  addCommand, 
  navigatePrevious, 
  navigateNext, 
  resetNavigation 
} = useCommandHistory();

const history = ref<HistoryEntry[]>([]);
const currentCommand = ref("");
const suggestions = ref<string[]>([]);
const showSuggestions = ref(false);

const terminalRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const prompt = computed(() => statePrompt.value);

// Convert ANSI codes to HTML
function ansiToHtml(text: string): string {
  if (!text) return '';
  
  const ansiMap: Record<string, string> = {
    '\x1b[0m': '</span>',
    '\x1b[1m': '<span style="font-weight: bold">',
    '\x1b[2m': '<span style="opacity: 0.6">',
    '\x1b[30m': '<span style="color: #45475a">',
    '\x1b[31m': '<span style="color: #f38ba8">',
    '\x1b[32m': '<span style="color: #a6e3a1">',
    '\x1b[33m': '<span style="color: #f9e2af">',
    '\x1b[34m': '<span style="color: #89b4fa">',
    '\x1b[35m': '<span style="color: #f5c2e7">',
    '\x1b[36m': '<span style="color: #94e2d5">',
    '\x1b[37m': '<span style="color: #cdd6f4">',
  };

  let result = text;
  for (const [ansi, html] of Object.entries(ansiMap)) {
    result = result.replaceAll(ansi, html);
  }
  
  return result;
}

async function handleCommandInput() {
  const input = currentCommand.value.trim();
  
  if (!input) {
    currentCommand.value = "";
    return;
  }

  // Adiciona ao histórico de comandos
  addCommand(input);

  // Execute command
  const result = await CommandExecutor.execute(input);
  
  // Check for special commands
  if (result.output[0] === '__CLEAR__') {
    history.value = [];
    currentCommand.value = "";
    return;
  }
  
  if (result.output[0] === '__EXIT__') {
    router.push("/");
    return;
  }

  // Add to history
  const entry: HistoryEntry = {
    command: input,
    output: result.output,
    timestamp: Date.now(),
    exitCode: result.exitCode
  };
  
  history.value.push(entry);
  addToHistory(entry);
  
  currentCommand.value = "";
  resetNavigation();
  
  // Scroll to bottom
  await nextTick();
  if (terminalRef.value) {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }
}

function handleKeydown(event: KeyboardEvent) {
  // Arrow Up - previous command
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    currentCommand.value = navigatePrevious(currentCommand.value);
    return;
  }
  
  // Arrow Down - next command
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    currentCommand.value = navigateNext(currentCommand.value);
    return;
  }
  
  // Tab - autocomplete
  if (event.key === 'Tab') {
    event.preventDefault();
    
    const result = autoComplete(currentCommand.value);
    
    if (result.hasMultipleSuggestions) {
      // Mostra sugestões
      suggestions.value = result.suggestions;
      showSuggestions.value = true;
      // Completa até o prefixo comum
      currentCommand.value = result.completed;
    } else if (result.completed !== currentCommand.value) {
      // Completou - esconde sugestões
      currentCommand.value = result.completed;
      suggestions.value = [];
      showSuggestions.value = false;
    } else {
      // Nenhuma sugestão - mostra opções contextuais
      const contextual = getContextualSuggestions(currentCommand.value);
      if (contextual.length > 0) {
        suggestions.value = contextual;
        showSuggestions.value = true;
      }
    }
    return;
  }
  
  // Qualquer outra tecla - esconde sugestões
  if (event.key !== 'Tab') {
    showSuggestions.value = false;
    suggestions.value = [];
  }
}

onMounted(async () => {
  // Focus input
  if (inputRef.value) {
    inputRef.value.focus();
  }

  // Show welcome message
  const welcomeContent = getFileContent('.welcome');
  if (welcomeContent) {
    history.value.push({
      command: '',
      output: welcomeContent.split('\n'),
      timestamp: Date.now()
    });
  }

  // Scroll to bottom
  await nextTick();
  if (terminalRef.value) {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }
});

// Keep focus on input when clicking anywhere
function handleDocumentClick() {
  if (inputRef.value) {
    inputRef.value.focus();
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
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

/* Adicionar cursor piscando */
input:focus {
  outline: none;
}

/* Animação do cursor */
@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}
</style>
