<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-accent-light">Certifications Manager</h2>
      <button
        @click="openNewCertModal"
        class="px-4 py-2 bg-white text-black font-medium rounded hover:bg-accent transition-colors duration-200"
      >
        Add New Certification
      </button>
    </div>

    <!-- Certifications List -->
    <div class="grid gap-6">
      <div
        v-for="cert in certifications"
        :key="cert.title"
        class="bg-background-secondary p-6 rounded border border-accent/10"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-4">
              <img
                :src="cert.logo"
                :alt="cert.institution"
                class="w-12 h-12 object-cover rounded"
              />
              <div>
                <h3 class="text-xl font-semibold text-accent-light">
                  {{ cert.title }}
                </h3>
                <p class="text-accent">{{ cert.institution }}</p>
              </div>
            </div>
            
            <p class="text-accent mb-4">{{ cert.description }}</p>
            
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in cert.skills"
                :key="skill"
                class="px-3 py-1 text-sm bg-accent/5 rounded-full text-accent"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <div class="flex gap-2 ml-4">
            <button
              @click="editCertification(cert)"
              class="p-2 text-accent hover:text-accent-light transition-colors duration-200"
            >
              Edit
            </button>
            <button
              @click="deleteCertification(cert.title)"
              class="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Certification Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-background-secondary p-6 rounded-lg w-full max-w-2xl">
        <h3 class="text-xl font-bold text-accent-light mb-6">
          {{ editingCert ? 'Edit Certification' : 'New Certification' }}
        </h3>

        <form @submit.prevent="saveCertification" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-accent mb-1">Title</label>
            <input
              v-model="certForm.title"
              type="text"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Institution</label>
            <input
              v-model="certForm.institution"
              type="text"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Year</label>
            <input
              v-model="certForm.year"
              type="text"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Description</label>
            <textarea
              v-model="certForm.description"
              rows="3"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Impact</label>
            <textarea
              v-model="certForm.impact"
              rows="2"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Logo URL</label>
            <input
              v-model="certForm.logo"
              type="url"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-accent mb-1">Skills</label>
            <input
              v-model="skillInput"
              @keydown.enter.prevent="addSkill"
              type="text"
              placeholder="Press Enter to add"
              class="w-full px-4 py-2 bg-background border border-accent/10 rounded"
            />
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="skill in certForm.skills"
                :key="skill"
                class="px-3 py-1 text-sm bg-accent/5 rounded-full text-accent flex items-center"
              >
                {{ skill }}
                <button
                  @click="removeSkill(skill)"
                  class="ml-2 text-accent hover:text-accent-light"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-accent hover:text-accent-light transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-white text-black font-medium rounded hover:bg-accent transition-colors duration-200"
            >
              {{ editingCert ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Certification {
  title: string;
  institution: string;
  year: string;
  status?: string;
  logo: string;
  description: string;
  impact: string;
  skills: string[];
  projects?: string[];
}

const certifications = ref<Certification[]>([
  {
    title: 'MBA in Software Engineering',
    institution: 'PUC-Rio',
    year: '2025',
    status: 'In progress',
    logo: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    description: 'Advanced study in software architecture, distributed systems, and enterprise application development.',
    impact: 'Applied learning directly to industrial automation projects, improving system reliability by 40%.',
    skills: ['System Architecture', 'Enterprise Patterns', 'Technical Leadership'],
    projects: ['Factory Automation Suite', 'SmartGrid Monitor']
  }
]);

const showModal = ref(false);
const editingCert = ref<string | null>(null);
const skillInput = ref('');

const certForm = reactive({
  title: '',
  institution: '',
  year: '',
  status: '',
  logo: '',
  description: '',
  impact: '',
  skills: [] as string[],
  projects: [] as string[]
});

const openNewCertModal = () => {
  editingCert.value = null;
  resetForm();
  showModal.value = true;
};

const editCertification = (cert: Certification) => {
  editingCert.value = cert.title;
  Object.assign(certForm, cert);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  Object.assign(certForm, {
    title: '',
    institution: '',
    year: '',
    status: '',
    logo: '',
    description: '',
    impact: '',
    skills: [],
    projects: []
  });
  skillInput.value = '';
};

const addSkill = () => {
  if (skillInput.value.trim() && !certForm.skills.includes(skillInput.value.trim())) {
    certForm.skills.push(skillInput.value.trim());
    skillInput.value = '';
  }
};

const removeSkill = (skill: string) => {
  certForm.skills = certForm.skills.filter(s => s !== skill);
};

const saveCertification = () => {
  if (editingCert.value) {
    const index = certifications.value.findIndex(c => c.title === editingCert.value);
    if (index !== -1) {
      certifications.value[index] = { ...certForm };
    }
  } else {
    certifications.value.push({ ...certForm });
  }
  closeModal();
};

const deleteCertification = (title: string) => {
  if (confirm('Are you sure you want to delete this certification?')) {
    certifications.value = certifications.value.filter(c => c.title !== title);
  }
};
</script>