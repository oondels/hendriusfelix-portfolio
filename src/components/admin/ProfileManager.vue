<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-admin-accent">Gerenciamento de Perfil</h2>
      <button
        @click="saveProfile"
        class="px-4 py-2 bg-admin-accent text-white font-medium rounded-lg hover:bg-admin-accent/90 transition-colors duration-200"
      >
        Salvar
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Personal Information -->
      <div class="bg-admin-card p-6 rounded-lg border border-admin-border">
        <h3 class="text-xl font-semibold text-admin-accent-light mb-6">Informações Pessoais</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">Nome Completo</label>
            <input
              v-model="profile.name"
              type="text"
              class="admin-input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">Título</label>
            <input
              v-model="profile.title"
              type="text"
              class="admin-input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">Email</label>
            <input
              v-model="profile.email"
              type="email"
              class="admin-input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">Localização</label>
            <input
              v-model="profile.location"
              type="text"
              class="admin-input"
            />
          </div>
        </div>
      </div>

      <!-- Professional Summary -->
      <div class="bg-admin-card p-6 rounded-lg border border-admin-border">
        <h3 class="text-xl font-semibold text-admin-accent-light mb-6">Resumo Profissional</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">Bio</label>
            <textarea
              v-model="profile.bio"
              rows="4"
              class="admin-input"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">Anos de Experiência</label>
            <input
              v-model="profile.experience"
              type="number"
              class="admin-input"
            />
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div class="bg-admin-card p-6 rounded-lg border border-admin-border">
        <h3 class="text-xl font-semibold text-admin-accent-light mb-6">Redes Sociais</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">GitHub</label>
            <input
              v-model="profile.social.github"
              type="url"
              class="admin-input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">LinkedIn</label>
            <input
              v-model="profile.social.linkedin"
              type="url"
              class="admin-input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-admin-text mb-1">Twitter</label>
            <input
              v-model="profile.social.twitter"
              type="url"
              class="admin-input"
            />
          </div>
        </div>
      </div>

      <!-- Profile Image -->
      <div class="bg-admin-card p-6 rounded-lg border border-admin-border">
        <h3 class="text-xl font-semibold text-admin-accent-light mb-6">Imagem de Perfil</h3>
        
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <img
              :src="profile.image"
              alt="Profile"
              class="w-24 h-24 rounded-full object-cover border-2 border-admin-border"
            />
            <div class="flex-1">
              <label class="block text-sm font-medium text-admin-text mb-1">Image URL</label>
              <input
                v-model="profile.image"
                type="url"
                class="admin-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

interface Profile {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  experience: number;
  image: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const profile = reactive<Profile>({
  name: 'Hendrius Félix',
  title: 'Full Stack Developer | IoT Specialist',
  email: 'hendrius@email.com',
  location: 'São Paulo, Brazil',
  bio: 'Full Stack Developer with expertise in IoT systems and industrial automation. Passionate about creating robust, scalable solutions that bridge the physical and digital worlds.',
  experience: 5,
  image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  social: {
    github: 'https://github.com/hendrius',
    linkedin: 'https://linkedin.com/in/hendrius',
    twitter: 'https://twitter.com/hendrius'
  }
});

const saveProfile = () => {
  toast.success('Profile updated successfully!');
};
</script>