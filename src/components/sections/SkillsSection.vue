<script setup lang="ts">
interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number;
}

const skillCategories = [
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 5 },
      { name: 'TypeScript', level: 5 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'Redis', level: 4 },
      { name: 'JWT/OAuth', level: 4 }
    ]
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'Vue.js', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Axios', level: 4 },
      { name: 'HTML/CSS', level: 4 },
      { name: 'JavaScript', level: 5 }
    ]
  },
  {
    name: 'DevOps & Infra',
    skills: [
      { name: 'Docker', level: 4 },
      { name: 'Nginx', level: 3 },
      { name: 'CI/CD', level: 4 },
      { name: 'Linux/WSL', level: 4 },
      { name: 'Git', level: 5 }
    ]
  },
  {
    name: 'IoT & Automação',
    skills: [
      { name: 'ESP32', level: 5 },
      { name: 'RFID', level: 4 },
      { name: 'Arduino', level: 5 },
      { name: 'WebSocket', level: 4 },
      { name: 'RabbitMQ', level: 4 }
    ]
  }
];
</script>

<template>
  <section id="skills" class="section-container bg-[#2F3438]">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title">Habilidades Técnicas</h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="(category, index) in skillCategories" :key="index" class="bg-[#444B54] p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold mb-4 text-[#F5F5F5]">{{ category.name }}</h3>
          
          <div class="space-y-4">
            <div v-for="skill in category.skills" :key="skill.name" class="mb-2">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[#F5F5F5] font-medium">{{ skill.name }}</span>
                <span class="text-[#D3D3D3] text-sm">{{ skill.level }}/5</span>
              </div>
              <div class="w-full bg-[#2F3438] rounded-full h-2">
                <div class="bg-[#D3D3D3] h-2 rounded-full transition-all duration-300" 
                     :style="{ width: `${skill.level * 20}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>