<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useWindowScroll } from '@vueuse/core';
import ThemeToggle from './ThemeToggle.vue';

interface NavLink {
  name: string;
  href: string;
  modal?: boolean;
}

const { y } = useWindowScroll();
const isMobileMenuOpen = ref(false);
const lastScrollY = ref(0);
const isHeaderVisible = ref(true);
const isScrollingUp = ref(true);

const links: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certifications', href: '#', modal: true },
  { name: 'Contact', href: '#contact' },
];

const currentSection = ref('');

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleScroll = () => {
  isScrollingUp.value = y.value < lastScrollY.value;
  isHeaderVisible.value = y.value < 100 || isScrollingUp.value;
  lastScrollY.value = y.value;

  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const sectionTop = (section as HTMLElement).offsetTop - 100;
    const sectionHeight = (section as HTMLElement).offsetHeight;
    if (y.value >= sectionTop && y.value < sectionTop + sectionHeight) {
      currentSection.value = section.id;
    }
  });
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleNavClick = (link: NavLink) => {
  if (link.modal) {
    emit('toggle-certifications');
  } else {
    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  closeMenu();
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const emit = defineEmits(['toggle-terminal', 'toggle-certifications']);
</script>

<template>
  <header 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="[
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
      y > 50 ? 'bg-background-secondary/80 backdrop-blur-md border-b border-accent/10' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="#" class="flex items-center space-x-2">
            <span class="text-2xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">HF</span>
          </a>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a 
            v-for="link in links" 
            :key="link.name"
            :href="link.href"
            @click.prevent="handleNavClick(link)"
            class="relative px-1 py-2 text-sm font-medium transition-colors duration-200"
            :class="[
              currentSection === link.href.substring(1)
                ? 'text-accent-light'
                : 'text-accent hover:text-accent-light'
            ]"
          >
            {{ link.name }}
            <span 
              class="absolute bottom-0 left-0 w-full h-0.5 bg-accent-light transform scale-x-0 transition-transform duration-200"
              :class="{ 'scale-x-100': currentSection === link.href.substring(1) }"
            ></span>
          </a>
          
          <ThemeToggle />
          
          <button 
            @click="$emit('toggle-terminal')"
            class="px-3 py-1 text-sm font-medium bg-accent/5 hover:bg-accent/10 text-accent hover:text-accent-light rounded-lg transition-all duration-200 border border-accent/10"
          >
            <span class="font-mono">&gt;_</span>
            <span class="ml-2">Terminal</span>
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button 
            @click="toggleMobileMenu"
            class="p-2 rounded-lg bg-accent/5 text-accent hover:text-accent-light focus:outline-none"
          >
            <span class="sr-only">Open menu</span>
            <svg 
              class="w-6 h-6 transition-transform duration-300"
              :class="{ 'rotate-90': isMobileMenuOpen }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                v-if="!isMobileMenuOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-show="isMobileMenuOpen"
      class="md:hidden fixed inset-0 z-40"
      @click="closeMenu"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      
      <!-- Menu Content -->
      <div 
        class="absolute right-0 top-16 w-full max-w-sm bg-background border-l border-accent/10 h-screen"
        @click.stop
      >
        <div class="px-4 py-6 space-y-4">
          <a 
            v-for="link in links" 
            :key="link.name"
            :href="link.href"
            @click.prevent="handleNavClick(link)"
            class="block px-4 py-3 text-accent hover:text-accent-light hover:bg-accent/5 rounded-lg transition-colors duration-200"
            :class="{ 'text-accent-light bg-accent/5': currentSection === link.href.substring(1) }"
          >
            {{ link.name }}
          </a>
          
          <button 
            @click="$emit('toggle-terminal'); closeMenu()"
            class="w-full px-4 py-3 text-left text-accent hover:text-accent-light hover:bg-accent/5 rounded-lg transition-colors duration-200"
          >
            <span class="font-mono">&gt;_</span>
            <span class="ml-2">Terminal Mode</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>