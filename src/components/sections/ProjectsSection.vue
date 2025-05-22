<script setup lang="ts">
import { ref } from 'vue';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const projects = ref<Project[]>([
  {
    id: 'assistente-jarvix',
    title: 'Assistente Jarvix',
    description: 'Assistente pessoal com IA e automação, desenvolvido para integrar sistemas domésticos e auxiliar na rotina diária. Utiliza processamento de linguagem natural para entender comandos e se adapta às preferências do usuário.',
    tags: ['Python', 'AI', 'IoT', 'Automação'],
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'smartgrid-monitor',
    title: 'SmartGrid Monitor',
    description: 'Sistema de monitoramento para redes elétricas inteligentes, permitindo análise em tempo real do consumo energético e prevenção de falhas. Implementa algoritmos de predição para otimização de recursos.',
    tags: ['Node.js', 'MQTT', 'Time Series DB', 'Análise de Dados'],
    image: 'https://images.pexels.com/photos/2467236/pexels-photo-2467236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'factory-automation',
    title: 'Factory Automation Suite',
    description: 'Suite completa para automação industrial que integra sensores, atuadores e sistemas de gestão. Desenvolvida para aumentar a eficiência produtiva e reduzir desperdícios em ambientes industriais.',
    tags: ['Java', 'C++', 'PLC Integration', 'SCADA'],
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
            <h3 class="text-xl font-semibold mb-2 text-[#F5F5F5]">{{ project.title }}</h3>
            <p class="text-[#D3D3D3] mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in project.tags" :key="tag" 
                class="px-3 py-1 bg-[#2F3438] text-[#D3D3D3] rounded-full text-xs font-medium">
                {{ tag }}
              </span>
            </div>
            <button class="text-[#D3D3D3] font-medium hover:text-[#F5F5F5] transition-colors duration-200">
              Ver detalhes →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>