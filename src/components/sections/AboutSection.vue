<script setup lang="ts">
// Component logic
</script>

<template>
  <section id="about" class="section-container bg-[#2F3438]">
    <div class="max-w-4xl mx-auto">
      <h2 class="section-title">Sobre Mim</h2>
      <div class="grid md:grid-cols-12 gap-8">
        <div class="md:col-span-4">
          <div class="aspect-square rounded-lg bg-[#444B54] mb-4 overflow-hidden shadow-lg">
            <img 
              src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Hendrius Félix" 
              class="w-full h-full object-cover" 
            />
          </div>
        </div>
        <div class="md:col-span-8">
          <div class="mb-6">
            <h3 class="text-3xl font-bold mb-2 text-[#F5F5F5]">Hendrius Félix</h3>
            <p class="text-xl text-[#D3D3D3] mb-4">Engenheiro de Software | Backend, IoT & Automação</p>
            <p class="text-lg text-[#D3D3D3] italic">"Conecto software e hardware para transformar ideias em soluções reais."</p>
          </div>

          <div class="space-y-4 text-[#D3D3D3]">
            <p>
              Desenvolvedor back-end com uma sólida formação em Engenharia Mecânica, 
              combinando conhecimento técnico com expertise em desenvolvimento de software.
            </p>
            
            <div class="space-y-2">
              <h4 class="text-[#F5F5F5] font-semibold">Formação Acadêmica</h4>
              <ul class="list-disc list-inside space-y-1">
                <li>Engenharia Mecânica – Universidade Federal</li>
                <li>MBA em Engenharia de Software – PUC-Rio (em andamento)</li>
              </ul>
            </div>

            <div class="space-y-2">
              <h4 class="text-[#F5F5F5] font-semibold">Filosofia de Trabalho</h4>
              <p>
                Busco constantemente a excelência através da eficiência, segurança e consistência,
                mantendo um forte compromisso com a inovação e o aprendizado contínuo.
              </p>
            </div>
          </div>
          
          <div class="mt-8 flex space-x-4">
            <a href="#projects" class="btn btn-primary">Ver Projetos</a>
            <a href="#contact" class="btn bg-[#444B54] text-[#F5F5F5] hover:bg-[#D3D3D3] hover:text-[#2F3438]">Contato</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>