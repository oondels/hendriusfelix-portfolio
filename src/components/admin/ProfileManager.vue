<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-accent-light">Profile Manager</h2>
      <button
        @click="saveProfile"
        class="px-4 py-2 bg-white text-black font-medium rounded hover:bg-accent transition-colors duration-200"
      >
        Save Changes
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Personal Information -->
      <div class="bg-background-secondary p-6 rounded border border-accent/10">
        <h3 class="text-xl font-semibold text-accent-light mb-6">Personal Information</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-accent mb-1">Full Name</label>
            <input
              v-model="profile.name"
              type="text"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Title</label>
            <input
              v-model="profile.title"
              type="text"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Email</label>
            <input
              v-model="profile.email"
              type="email"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Location</label>
            <input
              v-model="profile.location"
              type="text"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
          </div>
        </div>
      </div>

      <!-- Professional Summary -->
      <div class="bg-background-secondary p-6 rounded border border-accent/10">
        <h3 class="text-xl font-semibold text-accent-light mb-6">Professional Summary</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-accent mb-1">Bio</label>
            <textarea
              v-model="profile.bio"
              rows="4"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Years of Experience</label>
            <input
              v-model="profile.experience"
              type="number"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div class="bg-background-secondary p-6 rounded border border-accent/10">
        <h3 class="text-xl font-semibold text-accent-light mb-6">Social Links</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-accent mb-1">GitHub</label>
            <input
              v-model="profile.social.github"
              type="url"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">LinkedIn</label>
            <input
              v-model="profile.social.linkedin"
              type="url"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Twitter</label>
            <input
              v-model="profile.social.twitter"
              type="url"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
          </div>
        </div>
      </div>

      <!-- Profile Image -->
      <div class="bg-background-secondary p-6 rounded border border-accent/10">
        <h3 class="text-xl font-semibold text-accent-light mb-6">Profile Image</h3>
        
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <img
              :src="profile.image"
              alt="Profile"
              class="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <label class="block text-sm font-medium text-accent mb-1">Image URL</label>
              <input
                v-model="profile.image"
                type="url"
                class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
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
  // TODO: Implement profile saving logic
  alert('Profile updated successfully!');
};
</script>