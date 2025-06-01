<script setup lang="ts">
import { ref, computed } from 'vue';

interface Article {
  id: string;
  title: string;
  titlePt: string;
  summary: string;
  summaryPt: string;
  date: string;
  category: 'technical' | 'reflection' | 'case-study';
  tags: string[];
  readTime: number;
  image: string;
  url: string;
}

const activeCategory = ref<'all' | 'technical' | 'reflection' | 'case-study'>('all');
const currentLanguage = ref<'en' | 'pt'>('en');

const articles: Article[] = [
  {
    id: 'iot-manufacturing',
    title: 'Implementing IoT Solutions in Manufacturing',
    titlePt: 'Implementando Soluções IoT na Manufatura',
    summary: 'A comprehensive guide on integrating IoT devices with industrial equipment, including real-world examples and best practices.',
    summaryPt: 'Um guia completo sobre a integração de dispositivos IoT com equipamentos industriais, incluindo exemplos práticos e melhores práticas.',
    date: '2024-03-15',
    category: 'technical',
    tags: ['IoT', 'Manufacturing', 'Industry 4.0'],
    readTime: 12,
    image: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg',
    url: '/blog/iot-manufacturing'
  },
  {
    id: 'automation-journey',
    title: 'From Manual to Automated: A Manufacturing Evolution',
    titlePt: 'Do Manual ao Automatizado: Uma Evolução na Manufatura',
    summary: 'Case study on transforming a traditional manufacturing facility into a smart factory using modern automation techniques.',
    summaryPt: 'Estudo de caso sobre a transformação de uma fábrica tradicional em uma fábrica inteligente usando técnicas modernas de automação.',
    date: '2024-02-28',
    category: 'case-study',
    tags: ['Automation', 'Digital Transformation', 'Smart Factory'],
    readTime: 15,
    image: 'https://images.pexels.com/photos/2159062/pexels-photo-2159062.jpeg',
    url: '/blog/automation-journey'
  },
  {
    id: 'tech-leadership',
    title: 'Technical Leadership in Industrial Innovation',
    titlePt: 'Liderança Técnica na Inovação Industrial',
    summary: 'Reflections on leading technical teams through digital transformation projects and fostering innovation culture.',
    summaryPt: 'Reflexões sobre a liderança de equipes técnicas em projetos de transformação digital e fomento à cultura de inovação.',
    date: '2024-01-15',
    category: 'reflection',
    tags: ['Leadership', 'Innovation', 'Team Management'],
    readTime: 8,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    url: '/blog/tech-leadership'
  }
];

const categories = [
  { id: 'all', label: 'All Articles', labelPt: 'Todos os Artigos' },
  { id: 'technical', label: 'Technical Guides', labelPt: 'Guias Técnicos' },
  { id: 'reflection', label: 'Reflections', labelPt: 'Reflexões' },
  { id: 'case-study', label: 'Case Studies', labelPt: 'Estudos de Caso' }
];

const filteredArticles = computed(() => {
  return articles.filter(article => 
    activeCategory.value === 'all' || article.category === activeCategory.value
  );
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(
    currentLanguage.value === 'en' ? 'en-US' : 'pt-BR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
};
</script>

<template>
  <section id="blog" class="section-container bg-[#111111]">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-4xl font-bold text-white mb-4">
            {{ currentLanguage === 'en' ? 'Blog & Publications' : 'Blog & Publicações' }}
          </h2>
          <p class="text-lg text-[#D3D3D3]">
            {{ currentLanguage === 'en' 
              ? 'Sharing knowledge and experiences in technology and industrial automation'
              : 'Compartilhando conhecimento e experiências em tecnologia e automação industrial' 
            }}
          </p>
        </div>
        
        <button
          @click="currentLanguage = currentLanguage === 'en' ? 'pt' : 'en'"
          class="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[#D3D3D3] hover:bg-white/10 transition-colors duration-200"
        >
          {{ currentLanguage === 'en' ? 'PT-BR' : 'EN-US' }}
        </button>
      </div>

      <!-- Categories -->
      <div class="flex gap-4 mb-12 overflow-x-auto pb-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="activeCategory = category.id as typeof activeCategory.value"
          class="px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-300"
          :class="[
            activeCategory === category.id
              ? 'bg-white text-black'
              : 'bg-white/5 text-[#D3D3D3] hover:bg-white/10'
          ]"
        >
          {{ currentLanguage === 'en' ? category.label : category.labelPt }}
        </button>
      </div>

      <!-- Articles Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in filteredArticles"
          :key="article.id"
          class="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <a :href="article.url" class="block">
            <div class="relative h-48">
              <img
                :src="article.image"
                :alt="currentLanguage === 'en' ? article.title : article.titlePt"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <div class="flex items-center gap-2 text-sm text-[#D3D3D3] mb-2">
                  <span>{{ formatDate(article.date) }}</span>
                  <span>•</span>
                  <span>{{ article.readTime }} min read</span>
                </div>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-3">
                {{ currentLanguage === 'en' ? article.title : article.titlePt }}
              </h3>
              
              <p class="text-[#D3D3D3] mb-4">
                {{ currentLanguage === 'en' ? article.summary : article.summaryPt }}
              </p>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="px-3 py-1 text-sm bg-white/5 rounded-full text-[#D3D3D3] border border-white/10"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>