<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Skill {
  name: string;
  level: number;
  icon: string;
  description: string;
  yearLearned: number;
  useCase: string;
  tooling: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

const activeSkill = ref<string | null>(null);
const isInView = ref(false);

const skillCategories: SkillCategory[] = [
  {
    name: 'Backend',
    icon: '🔧',
    skills: [
      {
        name: 'Node.js',
        level: 5,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        description: 'Core backend technology for scalable microservices',
        yearLearned: 2019,
        useCase: 'Used in FlowCare for real-time patient queue management',
        tooling: 'Express.js, TypeScript, Jest for testing'
      },
      {
        name: 'PostgreSQL',
        level: 4,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        description: 'Primary database for complex data relationships',
        yearLearned: 2020,
        useCase: 'Multi-tenant data architecture in hospital management system',
        tooling: 'Prisma ORM, pgAdmin, Docker containers'
      },
      {
        name: 'Redis',
        level: 4,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
        description: 'In-memory data store for caching and real-time features',
        yearLearned: 2020,
        useCase: 'Cache layer in real-time dashboard applications',
        tooling: 'Redis Cluster, Redis Sentinel'
      }
    ]
  },
  {
    name: 'DevOps & Infra',
    icon: '⚙️',
    skills: [
      {
        name: 'Docker',
        level: 4,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        description: 'Container platform for deployment consistency',
        yearLearned: 2020,
        useCase: 'Containerized microservices deployment in production',
        tooling: 'Docker Compose, Docker Swarm'
      },
      {
        name: 'RabbitMQ',
        level: 4,
        icon: 'https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg',
        description: 'Message broker for distributed systems',
        yearLearned: 2021,
        useCase: 'Event-driven architecture in IoT systems',
        tooling: 'AMQP protocol, message queues'
      }
    ]
  },
  {
    name: 'IoT & Automation',
    icon: '🤖',
    skills: [
      {
        name: 'ESP32',
        level: 5,
        icon: 'https://www.vectorlogo.zone/logos/espressif/espressif-icon.svg',
        description: 'Microcontroller for IoT devices',
        yearLearned: 2019,
        useCase: 'Smart factory sensor network implementation',
        tooling: 'Arduino IDE, ESP-IDF'
      },
      {
        name: 'RFID',
        level: 4,
        icon: 'https://www.vectorlogo.zone/logos/arduino/arduino-icon.svg',
        description: 'Radio-frequency identification systems',
        yearLearned: 2020,
        useCase: 'Asset tracking in industrial environments',
        tooling: 'MFRC522, NFC protocols'
      }
    ]
  }
];

const handleSkillClick = (skillName: string) => {
  activeSkill.value = activeSkill.value === skillName ? null : skillName;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isInView.value = entry.isIntersecting;
    },
    { threshold: 0.2 }
  );

  const section = document.querySelector('#skills');
  if (section) {
    observer.observe(section);
  }
});
</script>

<template>
  <section id="skills" class="section-container bg-[#111111] mt-5">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-white mb-4">Conhecimento Técnico</h2>

      <!-- Categories Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="category in skillCategories" :key="category.name" 
             class="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div class="flex items-center gap-3 mb-6">
            <span class="text-2xl">{{ category.icon }}</span>
            <h3 class="text-xl font-semibold text-white">{{ category.name }}</h3>
          </div>

          <div class="space-y-6">
            <div v-for="skill in category.skills" :key="skill.name" 
                 class="group cursor-pointer" @click="handleSkillClick(skill.name)">
              <!-- Skill Header -->
              <div class="flex items-center gap-4 mb-2">
                <img :src="skill.icon" :alt="skill.name" class="w-6 h-6" />
                <span class="text-[#D3D3D3] font-medium">{{ skill.name }}</span>
              </div>

              <!-- Skill Bar -->
              <div class="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="absolute inset-y-0 left-0 bg-white/20 rounded-full transition-all duration-1000"
                     :class="{ 'w-0': !isInView }"
                     :style="{ width: isInView ? `${skill.level * 20}%` : '0%' }">
                </div>
              </div>

              <!-- Tooltip -->
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2">
                <p class="text-sm text-[#D3D3D3]">{{ skill.description }}</p>
              </div>

              <!-- Expanded Details -->
              <div v-if="activeSkill === skill.name" 
                   class="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 space-y-2">
                <p class="text-sm text-[#D3D3D3]">
                  <span class="text-white font-medium">Since:</span> {{ skill.yearLearned }}
                </p>
                <p class="text-sm text-[#D3D3D3]">
                  <span class="text-white font-medium">Use Case:</span> {{ skill.useCase }}
                </p>
                <p class="text-sm text-[#D3D3D3]">
                  <span class="text-white font-medium">Tooling:</span> {{ skill.tooling }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>