<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    formData.value = {
      name: '',
      email: '',
      message: ''
    };
    
    isSubmitted.value = true;
    setTimeout(() => {
      isSubmitted.value = false;
    }, 5000);
  } catch (error) {
    errorMessage.value = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="contact" class="section-container bg-[#2F3438]">
    <div class="max-w-4xl mx-auto">
      <h2 class="section-title">Contato</h2>
      
      <div class="grid md:grid-cols-12 gap-8">
        <div class="md:col-span-5">
          <div class="bg-[#444B54] p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-4 text-[#F5F5F5]">Informações de Contato</h3>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-[#D3D3D3] mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-[#F5F5F5] font-medium">Email</p>
                  <a href="mailto:contato@hendriusfelix.dev" class="text-[#D3D3D3] hover:text-[#F5F5F5] transition-colors duration-200">contato@hendriusfelix.dev</a>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-[#D3D3D3] mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-[#F5F5F5] font-medium">Telefone</p>
                  <a href="tel:+5511987654321" class="text-[#D3D3D3] hover:text-[#F5F5F5] transition-colors duration-200">(11) 98765-4321</a>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-[#D3D3D3] mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-[#F5F5F5] font-medium">Localização</p>
                  <p class="text-[#D3D3D3]">São Paulo, Brasil</p>
                </div>
              </div>
              
              <div class="pt-4">
                <h4 class="text-lg font-medium mb-3 text-[#F5F5F5]">Redes Sociais</h4>
                <div class="flex space-x-4">
                  <a href="#" class="text-[#D3D3D3] hover:text-[#F5F5F5] transition-colors duration-200">
                    <span class="sr-only">LinkedIn</span>
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" class="text-[#D3D3D3] hover:text-[#F5F5F5] transition-colors duration-200">
                    <span class="sr-only">GitHub</span>
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" class="text-[#D3D3D3] hover:text-[#F5F5F5] transition-colors duration-200">
                    <span class="sr-only">Twitter</span>
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:col-span-7">
          <div class="bg-[#444B54] p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-4 text-[#F5F5F5]">Envie uma Mensagem</h3>
            
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-[#D3D3D3] mb-1">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  class="w-full px-3 py-2 bg-[#2F3438] text-[#F5F5F5] border border-[#D3D3D3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D3D3D3] focus:border-transparent" 
                  required
                />
              </div>
              
              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-[#D3D3D3] mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  class="w-full px-3 py-2 bg-[#2F3438] text-[#F5F5F5] border border-[#D3D3D3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D3D3D3] focus:border-transparent" 
                  required
                />
              </div>
              
              <div class="mb-4">
                <label for="message" class="block text-sm font-medium text-[#D3D3D3] mb-1">Mensagem</label>
                <textarea 
                  id="message" 
                  v-model="formData.message" 
                  rows="4" 
                  class="w-full px-3 py-2 bg-[#2F3438] text-[#F5F5F5] border border-[#D3D3D3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D3D3D3] focus:border-transparent" 
                  required
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  class="w-full btn btn-primary"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Enviando...</span>
                  <span v-else>Enviar Mensagem</span>
                </button>
              </div>
              
              <div v-if="isSubmitted" class="mt-4 p-3 bg-[#2F3438] text-[#D3D3D3] rounded-md">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
              
              <div v-if="errorMessage" class="mt-4 p-3 bg-[#2F3438] text-red-400 rounded-md">
                {{ errorMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>