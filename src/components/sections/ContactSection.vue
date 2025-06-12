```vue
<script setup lang="ts">
import { ref } from 'vue';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const formData = ref<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const errorMessage = ref('');

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async () => {
  if (!validateEmail(formData.value.email)) {
    errorMessage.value = 'Please enter a valid email address';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showSuccess.value = true;
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  } catch (error) {
    errorMessage.value = 'Failed to send message. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const contactInfo = [
  {
    icon: 'M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z',
    label: 'Email',
    value: 'hendriusfelix.dev@gmail.com',
    link: 'mailto:hendriusfelix.dev@gmail.com'
  },
  {
    icon: 'M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z',
    label: 'WhatsApp',
    value: '+55 75 982466703',
    link: 'https://wa.me/5575982466703'
  },
  {
    icon: 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z',
    label: 'Telegram',
    value: '@hendriusfelix',
    link: 'https://t.me/hendriusfelix'
  }
];

const socialLinks = [
  {
    icon: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm2.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/hendriusfelix/'
  },
  {
    icon: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z',
    label: 'GitHub',
    link: 'https://github.com/oondels'
  }
];
</script>

<template>
  <section id="contact" class="section-container bg-[#111111] mt-5">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-white mb-4">Vamos construir algo juntos</h2>
        <p class="text-lg text-[#D3D3D3]">
          Projeto, ideia ou oportunidade — adoraria ouvir você.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-[#D3D3D3] mb-2">Nome</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                placeholder="Seu Nome/Nome da Empresa"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-[#D3D3D3] mb-2">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-[#D3D3D3] mb-2">Assunto (Opcional)</label>
              <input
                id="subject"
                v-model="formData.subject"
                type="text"
                class="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                placeholder="Sobre o que se trata?"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-[#D3D3D3] mb-2">Mensagem</label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="4"
                class="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                placeholder="Sua Mensagem..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-[#D3D3D3] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
            >
              <span v-if="isSubmitting">
                <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </span>
              <span v-else>Mandar Mensagem</span>
            </button>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p class="text-green-400 text-center">Mensagem enviada com sucesso! Vou responder em breve.</p>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p class="text-red-400 text-center">{{ errorMessage }}</p>
            </div>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Direct Contact -->
          <div class="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <h3 class="text-xl font-semibold text-white mb-6">Entre em Contato</h3>
            <div class="space-y-6">
              <a
                v-for="contact in contactInfo"
                :key="contact.label"
                :href="contact.link"
                class="flex items-start group hover:bg-white/5 p-4 rounded-lg transition-all duration-300"
              >
                <svg class="w-6 h-6 text-[#D3D3D3] group-hover:text-white transition-colors duration-300" viewBox="0 0 16 16" fill="currentColor">
                  <path :d="contact.icon" />
                </svg>
                <div class="ml-4">
                  <p class="text-[#D3D3D3] font-medium">{{ contact.label }}</p>
                  <p class="text-white group-hover:text-[#D3D3D3] transition-colors duration-300">
                    {{ contact.value }}
                  </p>
                </div>
              </a>
            </div>
          </div>

          <!-- Social Links -->
          <div class="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <h3 class="text-xl font-semibold text-white mb-6">Conecte-se Comigo</h3>
            <div class="flex gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group border border-white/10"
              >
                <svg class="w-6 h-6 text-[#D3D3D3] group-hover:text-white transition-colors duration-300" viewBox="0 0 16 16" fill="currentColor">
                  <path :d="social.icon" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```