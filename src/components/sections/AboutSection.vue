<script setup lang="ts">
// You can add any component-specific logic here
</script>

<template>
  <section id="about" class="section-container bg-white">
    <div class="max-w-4xl mx-auto">
      <h2 class="section-title">Sobre Mim</h2>
      <div class="grid md:grid-cols-12 gap-8">
        <div class="md:col-span-4">
          <div class="aspect-square rounded-lg bg-gray-200 mb-4 overflow-hidden">
            <!-- Placeholder for profile image -->
            <img 
              src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Hendrius Félix" 
              class="w-full h-full object-cover" 
            />
          </div>
        </div>
        <div class="md:col-span-8">
          <h3 class="text-2xl font-semibold mb-4 text-gray-900">Hendrius Félix</h3>
          <p class="text-gray-700 mb-4">
            Sou um desenvolvedor back-end apaixonado por criar soluções tecnológicas que resolvem problemas reais. 
            Com experiência em automação, IoT e engenharia aplicada, meu foco está em desenvolver sistemas robustos e 
            escaláveis que integram perfeitamente hardware e software.
          </p>
          <p class="text-gray-700 mb-4">
            Minha jornada na tecnologia começou com uma curiosidade sobre como as coisas funcionam por trás das interfaces. 
            Essa curiosidade me levou a explorar profundamente os sistemas que impulsionam nossas tecnologias cotidianas.
          </p>
          <p class="text-gray-700">
            Atualmente, trabalho com desenvolvimento de soluções que conectam o mundo físico ao digital, criando sistemas 
            inteligentes que automatizam processos e melhoram a eficiência operacional.
          </p>
          
          <div class="mt-6 flex space-x-4">
            <a href="#contact" class="btn btn-primary">Entre em contato</a>
            <a href="#projects" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300">Ver projetos</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>