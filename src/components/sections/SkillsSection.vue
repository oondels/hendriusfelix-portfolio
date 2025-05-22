<script setup lang="ts">
interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 1-5
}

const skillCategories = [
  {
    name: 'Linguagens de Programação',
    skills: [
      { name: 'Python', level: 5 },
      { name: 'Java', level: 4 },
      { name: 'C/C++', level: 4 },
      { name: 'JavaScript', level: 3 },
      { name: 'TypeScript', level: 3 }
    ]
  },
  {
    name: 'Back-end & Servidores',
    skills: [
      { name: 'Node.js', level: 4 },
      { name: 'Spring Boot', level: 4 },
      { name: 'Django', level: 5 },
      { name: 'FastAPI', level: 4 },
      { name: 'Docker', level: 4 }
    ]
  },
  {
    name: 'IoT & Automação',
    skills: [
      { name: 'MQTT', level: 5 },
      { name: 'Raspberry Pi', level: 5 },
      { name: 'Arduino', level: 5 },
      { name: 'Sistemas Embarcados', level: 4 },
      { name: 'PLC Programming', level: 3 }
    ]
  },
  {
    name: 'Banco de Dados',
    skills: [
      { name: 'PostgreSQL', level: 4 },
      { name: 'MongoDB', level: 4 },
      { name: 'Redis', level: 3 },
      { name: 'InfluxDB', level: 4 },
      { name: 'SQLite', level: 5 }
    ]
  }
];
</script>

<template>
  <section id="skills" class="section-container bg-[#2F3438]">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title">Habilidades</h2>
      
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
                <div class="bg-[#D3D3D3] h-2 rounded-full" :style="{ width: `${skill.level * 20}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>