<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Certification {
  title: string;
  institution: string;
  year: string;
  status?: string;
  logo?: string;
}

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['close']);

const certifications: Certification[] = [
  {
    title: 'MBA in Software Engineering',
    institution: 'PUC-Rio',
    year: '2025',
    status: 'In progress',
    logo: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
  },
  {
    title: 'Node.js Back-End Developer',
    institution: 'Curso em Vídeo / Fundação Bradesco',
    year: '2024',
    logo: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
  },
  {
    title: 'Docker for Developers',
    institution: 'Udemy',
    year: '2024',
    logo: 'https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg',
  },
  {
    title: 'PostgreSQL with Node.js',
    institution: 'Code with Mosh',
    year: '2023',
    logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
  },
  {
    title: 'JavaScript Modern Practices',
    institution: 'Rocketseat',
    year: '2023',
    logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
  },
  {
    title: 'Vue.js from Zero to Advanced',
    institution: 'Udemy / Origamid',
    year: '2023',
    logo: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
  },
  {
    title: 'IoT Projects with ESP32 and WebSocket',
    institution: 'Hands-on project based',
    year: '2023',
    logo: 'https://images.pexels.com/photos/163125/board-electronics-computer-data-processing-163125.jpeg',
  },
  {
    title: 'Git & GitHub Essentials',
    institution: 'Digital Innovation One',
    year: '2022',
    logo: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg',
  },
];

const modalRef = ref<HTMLElement | null>(null);

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};

const handleClickOutside = (e: MouseEvent) => {
  if (modalRef.value && !modalRef.value.contains(e.target as Node)) {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div
          ref="modalRef"
          class="relative w-full max-w-4xl bg-[#1a1a1a] rounded-xl shadow-2xl border border-white/10"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-white/10">
            <h2 class="text-2xl font-bold text-white">Certifications & Courses</h2>
            <button
              @click="$emit('close')"
              class="text-[#D3D3D3] hover:text-white transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 max-h-[70vh] overflow-y-auto">
            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="cert in certifications"
                :key="cert.title"
                class="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div class="flex items-start gap-4">
                  <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      :src="cert.logo"
                      :alt="cert.institution"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white mb-1">{{ cert.title }}</h3>
                    <p class="text-[#D3D3D3] text-sm mb-2">{{ cert.institution }}</p>
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-[#888]">{{ cert.year }}</span>
                      <span
                        v-if="cert.status"
                        class="px-2 py-1 text-xs rounded-full bg-white/10 text-[#D3D3D3]"
                      >
                        {{ cert.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-white/10">
            <button
              @click="$emit('close')"
              class="w-full px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>