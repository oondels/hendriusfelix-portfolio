<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Certification {
  title: string;
  institution: string;
  year: string;
  status?: string;
  logo?: string;
  description: string;
  impact: string;
  skills: string[];
  projects?: string[];
}

interface CareerMilestone {
  year: string;
  title: string;
  description: string;
  achievements: string[];
}

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['close']);

const activeTab = ref<'certifications' | 'journey'>('certifications');

const certifications: Certification[] = [
  {
    title: 'MBA in Software Engineering',
    institution: 'PUC-Rio',
    year: '2025',
    status: 'In progress',
    logo: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    description: 'Advanced study in software architecture, distributed systems, and enterprise application development. Focus on scalable solutions and modern architectural patterns.',
    impact: 'Applied learning directly to industrial automation projects, improving system reliability by 40%.',
    skills: ['System Architecture', 'Enterprise Patterns', 'Technical Leadership'],
    projects: ['Factory Automation Suite', 'SmartGrid Monitor']
  },
  {
    title: 'Node.js Back-End Developer',
    institution: 'Curso em Vídeo / Fundação Bradesco',
    year: '2024',
    logo: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
    description: 'Comprehensive back-end development focusing on scalable architectures, real-time applications, and microservices.',
    impact: 'Led development of real-time monitoring system for industrial processes.',
    skills: ['Node.js', 'Express', 'MongoDB', 'WebSocket'],
    projects: ['Real-time Process Monitor', 'Data Collection API']
  },
  {
    title: 'Docker for Developers',
    institution: 'Udemy',
    year: '2024',
    logo: 'https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg',
    description: 'Container orchestration and microservices deployment in production environments.',
    impact: 'Reduced deployment time by 60% and improved system reliability.',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Microservices'],
    projects: ['Containerized IoT Platform']
  },
  {
    title: 'PostgreSQL with Node.js',
    institution: 'Code with Mosh',
    year: '2023',
    logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    description: 'Advanced database design and optimization for enterprise applications.',
    impact: 'Optimized database performance in manufacturing execution system.',
    skills: ['PostgreSQL', 'Database Design', 'Performance Tuning'],
    projects: ['Manufacturing Execution System']
  }
];

const careerMilestones: CareerMilestone[] = [
  {
    year: '2024',
    title: 'Technical Project Manager - Industrial Automation',
    description: 'Leading cross-functional teams in implementing IoT solutions and automation systems.',
    achievements: [
      'Reduced machine downtime by 35% through predictive maintenance system',
      'Led team of 8 developers in modernizing legacy systems',
      'Implemented real-time monitoring for 200+ industrial sensors'
    ]
  },
  {
    year: '2023',
    title: 'Senior Software Engineer - Manufacturing Solutions',
    description: 'Architected and developed integrated manufacturing execution systems.',
    achievements: [
      'Developed custom ERP integration solutions',
      'Automated data collection from PLCs and industrial equipment',
      'Reduced manual data entry by 80%'
    ]
  },
  {
    year: '2022',
    title: 'IoT Solutions Developer',
    description: 'Specialized in connecting industrial equipment to cloud platforms.',
    achievements: [
      'Built real-time monitoring dashboard for production lines',
      'Integrated legacy PLC systems with modern web interfaces',
      'Implemented predictive maintenance algorithms'
    ]
  }
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
          class="relative w-full max-w-6xl bg-[#1a1a1a] rounded-xl shadow-2xl border border-white/10"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 class="text-2xl font-bold text-white">Professional Journey</h2>
              <p class="text-[#D3D3D3] mt-1">A timeline of continuous learning and growth</p>
            </div>
            <button
              @click="$emit('close')"
              class="text-[#D3D3D3] hover:text-white transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Navigation Tabs -->
          <div class="flex border-b border-white/10">
            <button
              v-for="tab in ['certifications', 'journey']"
              :key="tab"
              @click="activeTab = tab as 'certifications' | 'journey'"
              class="px-6 py-3 text-sm font-medium transition-colors duration-200"
              :class="[
                activeTab === tab
                  ? 'text-white border-b-2 border-white'
                  : 'text-[#D3D3D3] hover:text-white'
              ]"
            >
              {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 max-h-[70vh] overflow-y-auto">
            <!-- Certifications Tab -->
            <div v-if="activeTab === 'certifications'" class="space-y-8">
              <div
                v-for="cert in certifications"
                :key="cert.title"
                class="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div class="flex items-start gap-6">
                  <div class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      :src="cert.logo"
                      :alt="cert.institution"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="text-xl font-semibold text-white">{{ cert.title }}</h3>
                        <p class="text-[#D3D3D3] text-sm">{{ cert.institution }}</p>
                      </div>
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
                    
                    <p class="mt-4 text-[#D3D3D3]">{{ cert.description }}</p>
                    
                    <div class="mt-4">
                      <h4 class="text-sm font-semibold text-white mb-2">Impact & Application</h4>
                      <p class="text-[#D3D3D3]">{{ cert.impact }}</p>
                    </div>
                    
                    <div class="mt-4">
                      <h4 class="text-sm font-semibold text-white mb-2">Key Skills</h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="skill in cert.skills"
                          :key="skill"
                          class="px-2 py-1 text-xs bg-white/5 rounded-full text-[#D3D3D3] border border-white/10"
                        >
                          {{ skill }}
                        </span>
                      </div>
                    </div>
                    
                    <div v-if="cert.projects" class="mt-4">
                      <h4 class="text-sm font-semibold text-white mb-2">Related Projects</h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="project in cert.projects"
                          :key="project"
                          class="px-2 py-1 text-xs bg-white/5 rounded-full text-[#D3D3D3] border border-white/10"
                        >
                          {{ project }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Career Journey Tab -->
            <div v-else class="space-y-8">
              <div class="bg-white/5 rounded-lg p-6 border border-white/10 mb-8">
                <h3 class="text-xl font-semibold text-white mb-4">Professional Evolution</h3>
                <p class="text-[#D3D3D3]">
                  From independent development to leading industrial automation initiatives, my journey 
                  reflects a commitment to bridging software and hardware technologies while driving 
                  innovation in manufacturing and IoT solutions.
                </p>
              </div>

              <div class="relative">
                <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10"></div>
                
                <div
                  v-for="milestone in careerMilestones"
                  :key="milestone.year"
                  class="relative pl-10 pb-8"
                >
                  <div class="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-white/10 border-4 border-[#1a1a1a]"></div>
                  
                  <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div class="flex items-start justify-between mb-4">
                      <h3 class="text-lg font-semibold text-white">{{ milestone.title }}</h3>
                      <span class="text-sm text-[#888]">{{ milestone.year }}</span>
                    </div>
                    
                    <p class="text-[#D3D3D3] mb-4">{{ milestone.description }}</p>
                    
                    <ul class="space-y-2">
                      <li
                        v-for="achievement in milestone.achievements"
                        :key="achievement"
                        class="flex items-start gap-2 text-sm text-[#D3D3D3]"
                      >
                        <span class="text-white">•</span>
                        {{ achievement }}
                      </li>
                    </ul>
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