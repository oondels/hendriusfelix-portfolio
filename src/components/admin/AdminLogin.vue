<template>
  <div class="min-h-screen bg-black text-green-500 font-mono p-4 flex items-center justify-center">
    <div class="w-full max-w-2xl">
      <!-- Boot Sequence -->
      <div v-if="bootPhase < 100" class="space-y-2">
        <div v-for="(line, index) in bootLines" :key="index" 
             :class="{ 'opacity-0': index > bootPhase }"
             class="transition-opacity duration-100">
          {{ line }}
        </div>
        <div class="h-4 relative overflow-hidden">
          <div class="absolute inset-0 bg-green-500/20">
            <div class="h-full bg-green-500" 
                 :style="{ width: `${bootPhase}%` }">
            </div>
          </div>
        </div>
      </div>

      <!-- Login Terminal -->
      <div v-else class="space-y-6">
        <!-- ASCII Art Logo -->
        <pre class="text-xs sm:text-sm leading-none mb-8">
 _    _            _      _           
| |  | |          | |    (_)          
| |__| | ___ _ __ | |     _ _ __  _   _ __  
|  __  |/ _ \ '_ \| |    | | '_ \| | | \ \ / /
| |  | |  __/ | | | |____| | | | | |_| |\ V / 
|_|  |_|\___|_| |_|\_____|_|_| |_|\__,_| \_/  
        </pre>

        <div class="space-y-4">
          <div class="flex items-center space-x-2" 
               :class="{ 'opacity-50': currentField !== 'username' }">
            <span class="text-green-500">login:</span>
            <input 
              ref="usernameInput"
              v-model="username"
              type="text"
              :disabled="currentField !== 'username'"
              @keydown.enter="focusPassword"
              class="bg-transparent border-none outline-none text-green-500 caret-green-500 flex-1"
              autocomplete="off"
            >
          </div>

          <div class="flex items-center space-x-2" 
               :class="{ 'opacity-50': currentField !== 'password' }">
            <span class="text-green-500">password:</span>
            <input 
              ref="passwordInput"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :disabled="currentField !== 'password'"
              @keydown.enter="attemptLogin"
              class="bg-transparent border-none outline-none text-green-500 caret-green-500 flex-1"
              autocomplete="off"
            >
          </div>
        </div>

        <!-- Terminal Output -->
        <div v-if="error" class="text-red-500 mt-4">
          > Error: {{ error }}
        </div>

        <div v-if="isLoading" class="text-green-500 mt-4">
          > Authenticating...
          <span class="animate-pulse">_</span>
        </div>

        <!-- Command History -->
        <div class="mt-8 pt-4 border-t border-green-500/20">
          <div v-for="(cmd, index) in commandHistory" 
               :key="index" 
               class="text-sm text-green-500/70">
            > {{ cmd }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const bootPhase = ref(0);
const currentField = ref<'username' | 'password'>('username');
const username = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const showPassword = ref(false);
const commandHistory = ref<string[]>([]);

const usernameInput = ref<HTMLInputElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);

const bootLines = [
  'BIOS Version 2.5.3',
  'CPU: AMD Ryzen 9 5950X @ 3.4GHz',
  'Memory Test: 32768MB OK',
  'Initializing Security Protocols...',
  'Loading Terminal Interface...',
  'Establishing Secure Connection...',
  'Ready.'
];

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
  commandHistory.value.push(`Attempting login for user: ${username.value}`);

  // Simulate API call
  await new Promise(r => setTimeout(r, 2000));

  // Mock authentication
  if (username.value === 'admin' && password.value === 'matrix') {
    commandHistory.value.push('Authentication successful');
    router.push('/admin');
  } else {
    error.value = 'Access denied. Invalid credentials.';
    commandHistory.value.push('Authentication failed');
  }

  isLoading.value = false;
};

onMounted(() => {
  simulateBoot();
});
</script>

<style scoped>
input::placeholder {
  color: rgba(34, 197, 94, 0.5);
}

input:focus {
  outline: none;
  caret-color: rgb(34, 197, 94);
}

@keyframes glitch {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
}

.glitch {
  animation: glitch 0.2s ease-in-out infinite;
}
</style>