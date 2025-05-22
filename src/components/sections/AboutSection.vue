<script setup lang="ts">
// Component logic
</script>

<template>
  <section id="about" class="min-h-screen flex items-center bg-[#111111] relative overflow-hidden">
    <!-- Background gradient effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#111111] opacity-50"></div>
    
    <!-- Subtle grid pattern overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSA2MEgwVjBoNjB2NjBoLS41eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-10"></div>

    <div class="section-container relative z-10">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left column: Text content -->
          <div class="space-y-8">
            <div class="space-y-4">
              <h1 class="text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Hendrius Félix
              </h1>
              <p class="text-xl lg:text-2xl text-[#888] font-light">
                Engenheiro de Software | Backend, IoT & Automação
              </p>
            </div>

            <div class="prose prose-invert">
              <p class="text-lg text-[#D3D3D3] leading-relaxed">
                Desenvolvedor back-end com expertise em automação e IoT, 
                transformando complexidade em soluções elegantes e eficientes.
              </p>
            </div>

            <div class="flex flex-wrap gap-4 text-sm">
              <div class="px-4 py-2 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                <span class="block text-[#888]">Experiência</span>
                <span class="text-white font-medium">5+ Anos</span>
              </div>
              <div class="px-4 py-2 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                <span class="block text-[#888]">Projetos</span>
                <span class="text-white font-medium">50+ Entregues</span>
              </div>
              <div class="px-4 py-2 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                <span class="block text-[#888]">Especialidade</span>
                <span class="text-white font-medium">Backend & IoT</span>
              </div>
            </div>

            <div class="flex gap-4">
              <a href="#projects" 
                class="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300">
                Ver Projetos
              </a>
              <a href="#contact" 
                class="px-6 py-3 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300">
                Contato
              </a>
            </div>
          </div>

          <!-- Right column: Visual elements -->
          <div class="relative">
            <!-- Main image with modern treatment -->
            <div class="relative aspect-square rounded-2xl overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img 
                src="https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg"
                alt="Hendrius Félix"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Floating stats/badges -->
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p class="text-2xl font-bold text-white">100+</p>
                  <p class="text-[#888] text-sm">Commits</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-white">15+</p>
                  <p class="text-[#888] text-sm">Tecnologias</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-white">3+</p>
                  <p class="text-[#888] text-sm">Certificações</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>