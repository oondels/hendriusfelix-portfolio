<script setup lang="ts">
import { ref } from 'vue';

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: 'web' | 'iot' | 'opensource';
  image: string;
  technologies: string[];
  challenge: string;
  solution: string;
  impact: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  buildSteps?: string[];
  videoUrl?: string;
}

const activeCategory = ref<'web' | 'iot' | 'opensource'>('web');
const activeProjectId = ref<string | null>(null);
const showBuildLog = ref(false);

const categories = [
  { id: 'web', name: 'Web Applications' },
  { id: 'iot', name: 'IoT & Automation' },
  { id: 'opensource', name: 'Open Source' },
];

const projects: Project[] = [
  {
    id: 'flowcare',
    title: 'FlowCare',
    summary: 'Hospital management system with real-time queue optimization',
    description: 'Complete hospital management system integrating appointment scheduling, queue management, and automated workflows.',
    category: 'web',
    image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    technologies: ['Node.js', 'PostgreSQL', 'Docker', 'Vue 3', 'WebSocket'],
    challenge: 'Streamline patient flow and reduce wait times in a high-volume hospital environment.',
    solution: 'Implemented real-time queue management with predictive algorithms and automated notification system.',
    impact: 'Reduced average wait times by 45% and improved patient satisfaction scores by 60%.',
    demoUrl: 'https://flowcare.demo.dev',
    githubUrl: 'https://github.com/hendrius/flowcare',
    buildSteps: [
      '🚀 Installing dependencies...',
      '📦 Building Docker containers...',
      '🔄 Migrating database...',
      '✨ Optimizing assets...',
      '✅ Deployment complete!'
    ]
  },
  {
    id: 'smartgrid',
    title: 'SmartGrid Monitor',
    summary: 'Real-time power grid monitoring with predictive maintenance',
    description: 'IoT-based power grid monitoring system with real-time analytics and predictive maintenance.',
    category: 'iot',
    image: 'https://images.pexels.com/photos/2467236/pexels-photo-2467236.jpeg',
    technologies: ['ESP32', 'MQTT', 'InfluxDB', 'Machine Learning', 'React'],
    challenge: 'Prevent power grid failures through early detection and predictive maintenance.',
    solution: 'Developed a network of IoT sensors with real-time monitoring and ML-based prediction system.',
    impact: 'Prevented 12 potential grid failures and reduced maintenance costs by 30%.',
    videoUrl: 'https://example.com/smartgrid-demo.mp4',
    githubUrl: 'https://github.com/hendrius/smartgrid',
    caseStudyUrl: '/case-studies/smartgrid'
  },
  {
    id: 'factory-automation',
    title: 'Factory Automation Suite',
    summary: 'End-to-end industrial automation system',
    description: 'Comprehensive industrial automation system integrating sensors, actuators, and management systems.',
    category: 'iot',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
    technologies: ['C++', 'Python', 'OPC UA', 'MongoDB', 'Docker'],
    challenge: 'Automate and optimize manufacturing processes while ensuring reliability.',
    solution: 'Created a modular automation system with fault tolerance and remote monitoring capabilities.',
    impact: 'Increased production efficiency by 35% and reduced downtime by 50%.',
    demoUrl: 'https://factory.demo.dev',
    githubUrl: 'https://github.com/hendrius/factory-automation'
  }
];

const filteredProjects = computed(() => {
  return projects.filter(project => project.category === activeCategory.value);
});

const toggleProject = (projectId: string) => {
  if (activeProjectId.value === projectId) {
    activeProjectId.value = null;
    showBuildLog.value = false;
  } else {
    activeProjectId.value = projectId;
    showBuildLog.value = true;
  }
};
</script>

<template>
  <section id="projects" class="section-container bg-[#111111]">
    <div class="max-w-6xl mx-auto">
      <!-- Philosophy Section -->
      <div class="mb-16 bg-white/5 rounded-xl p-8 border border-white/10">
        <h3 class="text-2xl font-bold text-white mb-4">🛠 How I Build</h3>
        <p class="text-lg text-[#D3D3D3] leading-relaxed">
          I craft backend-first systems that are scalable, maintainable, and purpose-driven — always focused on solving 
          real problems, not just building features. Every project starts with a clear understanding of the challenge 
          and ends with measurable impact.
        </p>
      </div>

      <!-- Category Tabs -->
      <div class="flex space-x-4 mb-12">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="activeCategory = category.id as 'web' | 'iot' | 'opensource'"
          :class="[
            'px-6 py-3 rounded-lg font-medium transition-all duration-300',
            activeCategory === category.id 
              ? 'bg-white text-black' 
              : 'bg-white/5 text-[#D3D3D3] hover:bg-white/10'
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="bg-white/5 rounded-xl overflow-hidden transition-all duration-500"
          :class="{ 'md:col-span-2': activeProjectId === project.id }"
        >
          <!-- Project Header -->
          <div class="relative">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-64 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-0 p-6">
              <h3 class="text-2xl font-bold text-white mb-2">{{ project.title }}</h3>
              <p class="text-[#D3D3D3]">{{ project.summary }}</p>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="px-3 py-1 bg-white/5 rounded-full text-sm text-[#D3D3D3] border border-white/10"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Expand/Collapse Button -->
            <button 
              @click="toggleProject(project.id)"
              class="text-[#D3D3D3] hover:text-white transition-colors duration-300"
            >
              {{ activeProjectId === project.id ? 'Show Less' : 'View Details' }} →
            </button>

            <!-- Expanded Content -->
            <div 
              v-if="activeProjectId === project.id"
              class="mt-6 space-y-6"
            >
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-4">
                  <div>
                    <h4 class="text-lg font-semibold text-white mb-2">The Challenge</h4>
                    <p class="text-[#D3D3D3]">{{ project.challenge }}</p>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-white mb-2">The Solution</h4>
                    <p class="text-[#D3D3D3]">{{ project.solution }}</p>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-white mb-2">Impact</h4>
                    <p class="text-[#D3D3D3]">{{ project.impact }}</p>
                  </div>
                </div>

                <!-- Build Log or Video -->
                <div class="bg-black/50 rounded-lg p-4">
                  <div v-if="project.buildSteps && showBuildLog" class="font-mono text-sm">
                    <div 
                      v-for="(step, index) in project.buildSteps" 
                      :key="index"
                      class="text-[#D3D3D3] mb-2"
                    >
                      {{ step }}
                    </div>
                  </div>
                  <video 
                    v-if="project.videoUrl" 
                    :src="project.videoUrl"
                    controls
                    class="w-full rounded-lg"
                  ></video>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-4">
                <a 
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  class="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300"
                >
                  View Demo
                </a>
                <a 
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  class="px-6 py-3 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  GitHub Repo
                </a>
                <a 
                  v-if="project.caseStudyUrl"
                  :href="project.caseStudyUrl"
                  class="px-6 py-3 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  Case Study
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>