<script setup lang="ts">
import { ref } from 'vue';

const links = [
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Contato', href: '#contact' },
];

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

defineEmits(['toggle-terminal']);
</script>

<template>
  <header class="bg-white shadow-sm fixed top-0 w-full z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-primary-700">Hendrius Félix</span>
          </div>
        </div>
        
        <!-- Desktop menu -->
        <nav class="hidden md:ml-6 md:flex md:space-x-8">
          <a v-for="link in links" :key="link.name" :href="link.href"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
            {{ link.name }}
          </a>
        </nav>

        <div class="flex items-center">
          <button 
            @click="$emit('toggle-terminal')"
            class="ml-4 flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            aria-label="Open terminal mode">
            <span class="text-lg font-mono">&gt;_</span>
          </button>
          
          <!-- Mobile menu button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open -->
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <a v-for="link in links" :key="link.name" :href="link.href"
          class="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
          @click="isMobileMenuOpen = false">
          {{ link.name }}
        </a>
      </div>
    </div>
  </header>
</template>