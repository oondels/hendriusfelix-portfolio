<script setup lang="ts">
interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  role: string;
  status: string;
  link?: string;
  image: string;
}

const projects = ref<Project[]>([
  {
    id: 'flowcare',
    title: 'FlowCare',
    description: 'Sistema hospitalar completo com agendamento, gerenciamento de filas, atendimentos e relatórios. Integração com sistemas legados e implementação de workflows automatizados.',
    stack: ['Node.js', 'PostgreSQL', 'Docker', 'Vue 3'],
    role: 'Full Stack Developer (foco em backend)',
    status: 'MVP em andamento',
    image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'smartgrid-monitor',
    title: 'SmartGrid Monitor',
    description: 'Sistema de monitoramento para redes elétricas inteligentes, permitindo análise em tempo real do consumo energético e prevenção de falhas através de machine learning.',
    stack: ['Node.js', 'InfluxDB', 'React', 'WebSocket'],
    role: 'Backend Developer',
    status: 'Em produção',
    link: 'https://smartgrid.demo.dev',
    image: 'https://images.pexels.com/photos/2467236/pexels-photo-2467236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'factory-automation',
    title: 'Factory Automation Suite',
    description: 'Suite completa para automação industrial integrando sensores, atuadores e sistemas de gestão. Desenvolvida para aumentar a eficiência produtiva.',
    stack: ['C++', 'Python', 'OPC UA', 'MongoDB'],
    role: 'IoT Specialist',
    status: 'Em produção',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
]);
</script>

<template>
  <section id="projects" class="section-container bg-[#2F3438]">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title">Projetos</h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in projects" :key="project.id" 
          class="bg-[#444B54] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
          <div class="h-48 overflow-hidden">
            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xl font-semibold text-[#F5F5F5]">{{ project.title }}</h3>
              <span class="px-2 py-1 text-xs rounded-full bg-[#2F3438] text-[#D3D3D3]">
                {{ project.status }}
              </span>
            </div>
            
            <p class="text-[#D3D3D3] mb-4">{{ project.description }}</p>
            
            <div class="mb-4">
              <h4 class="text-sm font-medium text-[#F5F5F5] mb-2">Stack Tecnológica</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.stack" :key="tech" 
                  class="px-3 py-1 bg-[#2F3438] text-[#D3D3D3] rounded-full text-xs font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <div class="mb-4">
              <h4 class="text-sm font-medium text-[#F5F5F5] mb-1">Função</h4>
              <p class="text-[#D3D3D3] text-sm">{{ project.role }}</p>
            </div>
            
            <div class="flex justify-between items-center">
              <button class="text-[#D3D3D3] font-medium hover:text-[#F5F5F5] transition-colors duration-200">
                Ver detalhes →
              </button>
              <a 
                v-if="project.link" 
                :href="project.link" 
                target="_blank"
                class="text-[#D3D3D3] hover:text-[#F5F5F5] text-sm underline"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>