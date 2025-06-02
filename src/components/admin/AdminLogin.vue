<template>
  <div class="min-h-screen bg-[#0a0a0f] text-[#00b4d8] font-mono p-4 flex items-center justify-center overflow-hidden">
    <div class="w-full max-w-3xl">
      <!-- Boot Sequence -->
      <div v-if="bootPhase < 100" class="space-y-2">
        <div v-for="(line, index) in bootLines" :key="index" 
             v-motion
             :initial="{ opacity: 0, y: 20 }"
             :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
             :class="{ 'opacity-0': index > bootPhase }"
             class="transition-opacity duration-100">
          {{ line }}
        </div>
        <div class="h-4 relative overflow-hidden rounded">
          <div class="absolute inset-0 bg-[#00b4d8]/20">
            <div class="h-full bg-[#00b4d8]" 
                 :style="{ width: `${bootPhase}%` }">
            </div>
          </div>
        </div>
      </div>

      <!-- Login Terminal -->
      <div v-else class="space-y-6">
        <!-- Dynamic Welcome Message -->
        <div ref="welcomeEl" class="text-[#90e0ef] mb-8"></div>

        <div class="space-y-4">
          <div class="flex items-center space-x-2" 
               :class="{ 'opacity-50': currentField !== 'username' }">
            <span class="text-[#00b4d8]">login:</span>
            <input 
              ref="usernameInput"
              v-model="username"
              type="text"
              :disabled="currentField !== 'username'"
              @keydown.enter="focusPassword"
              class="bg-transparent border-none outline-none text-[#48cae4] caret-[#48cae4] flex-1"
              autocomplete="off"
            >
          </div>

          <div class="flex items-center space-x-2" 
               :class="{ 'opacity-50': currentField !== 'password' }">
            <span class="text-[#00b4d8]">password:</span>
            <input 
              ref="passwordInput"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :disabled="currentField !== 'password'"
              @keydown.enter="attemptLogin"
              class="bg-transparent border-none outline-none text-[#48cae4] caret-[#48cae4] flex-1"
              autocomplete="off"
            >
          </div>
        </div>

        <!-- Terminal Output -->
        <div v-if="error" class="text-red-400 mt-4 font-mono">
          > Error: {{ error }}
        </div>

        <div v-if="isLoading" class="text-[#00b4d8] mt-4 font-mono">
          > Authenticating...
          <span class="animate-pulse">_</span>
        </div>

        <!-- Integrated Terminal -->
        <div class="mt-8 pt-4 border-t border-[#00b4d8]/20">
          <div class="bg-[#0a0a0f] rounded-lg p-4">
            <div ref="terminalContainer" class="h-48"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import Typed from 'typed.js';
import 'xterm/css/xterm.css';

const router = useRouter();
const bootPhase = ref(0);
const currentField = ref<'username' | 'password'>('username');
const username = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const showPassword = ref(false);

const usernameInput = ref<HTMLInputElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);
const welcomeEl = ref<HTMLElement | null>(null);
const terminalContainer = ref<HTMLElement | null>(null);

let terminal: Terminal | null = null;
let fitAddon: FitAddon | null = null;
let typedInstance: Typed | null = null;

const bootLines = [
  'BIOS Version 3.0.1',
  'Initializing System Components...',
  'CPU: Quantum Core i9 @ 5.2GHz',
  'Memory Test: 64GB Quantum RAM OK',
  'Neural Network Interface: Online',
  'Quantum Encryption Protocols: Active',
  'Establishing Secure Connection...',
  'Terminal Interface: Ready'
];

const commands = {
  help: () => {
    return `Available commands:
  help     - Show this help message
  clear    - Clear terminal
  about    - Show system information
  exit     - Exit terminal
  login    - Start login sequence`;
  },
  about: () => {
    return `Secure Terminal v3.0.1
Quantum-Enhanced Authentication System
Copyright © ${new Date().getFullYear()} Hendrius Labs`;
  },
  clear: () => {
    terminal?.clear();
    return '';
  },
  login: () => {
    currentField.value = 'username';
    usernameInput.value?.focus();
    return 'Initiating login sequence...';
  }
};

const initTerminal = () => {
  if (!terminalContainer.value) return;

  terminal = new Terminal({
    theme: {
      background: '#0a0a0f',
      foreground: '#00b4d8',
      cursor: '#48cae4'
    },
    cursorBlink: true,
    fontSize: 14
  });

  fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  terminal.open(terminalContainer.value);
  fitAddon.fit();

  terminal.writeln('Terminal ready. Type "help" for available commands.');
  terminal.write('\r\n$ ');

  let commandBuffer = '';
  terminal.onKey(({ key, domEvent }) => {
    const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

    if (domEvent.keyCode === 13) { // Enter
      terminal.writeln('');
      if (commandBuffer.trim()) {
        const cmd = commandBuffer.trim().toLowerCase();
        if (cmd in commands) {
          const output = commands[cmd as keyof typeof commands]();
          terminal.writeln(output);
        } else {
          terminal.writeln(`Command not found: ${cmd}`);
        }
      }
      commandBuffer = '';
      terminal.write('$ ');
    } else if (domEvent.keyCode === 8) { // Backspace
      if (commandBuffer.length > 0) {
        commandBuffer = commandBuffer.slice(0, -1);
        terminal.write('\b \b');
      }
    } else if (printable) {
      commandBuffer += key;
      terminal.write(key);
    }
  });
};

const initTyped = () => {
  if (!welcomeEl.value) return;
  
  typedInstance = new Typed(welcomeEl.value, {
    strings: [
      'Welcome to Quantum-Secured Terminal',
      `Local Time: ${new Date().toLocaleString()}`,
      'Awaiting Authentication...'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
};

const simulateBoot = async () => {
  for (let i = 0; i <= 100; i++) {
    bootPhase.value = i;
    await new Promise(r => setTimeout(r, 30));
  }
  usernameInput.value?.focus();
};

const focusPassword = () => {
  if (username.value) {
    currentField.value = 'password';
    passwordInput.value?.focus();
  }
};

const attemptLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'All fields are required';
    return;
  }

  isLoading.value = true;
  error.value = '';
  terminal?.writeln(`Attempting authentication for user: ${username.value}`);

  await new Promise(r => setTimeout(r, 2000));

  if (username.value === 'admin' && password.value === 'matrix') {
    terminal?.writeln('Authentication successful');
    router.push('/admin');
  } else {
    error.value = 'Access denied. Invalid credentials.';
    terminal?.writeln('Authentication failed');
  }

  isLoading.value = false;
};

// Watch for boot phase completion
watch(() => bootPhase.value, (newValue) => {
  if (newValue === 100) {
    // Initialize components after boot sequence
    setTimeout(() => {
      initTyped();
      initTerminal();
    }, 100);
  }
});

onMounted(() => {
  simulateBoot();
  
  // Handle window resize
  const handleResize = () => fitAddon?.fit();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', () => fitAddon?.fit());
  terminal?.dispose();
  typedInstance?.destroy();
});
</script>

<style scoped>
input::placeholder {
  color: rgba(0, 180, 216, 0.5);
}

input:focus {
  outline: none;
  caret-color: rgb(72, 202, 228);
}

.xterm-viewport::-webkit-scrollbar {
  width: 8px;
}

.xterm-viewport::-webkit-scrollbar-track {
  background: #0a0a0f;
}

.xterm-viewport::-webkit-scrollbar-thumb {
  background: rgba(0, 180, 216, 0.3);
  border-radius: 4px;
}

.xterm-viewport::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 180, 216, 0.5);
}
</style>