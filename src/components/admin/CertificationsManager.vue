<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-admin-accent">Certifications Manager</h2>
      <button
        @click="openNewCertModal"
        class="px-4 py-2 bg-admin-accent text-white font-medium rounded-lg hover:bg-admin-accent/90 transition-colors duration-200"
      >
        Adicionar Novo Certificado
      </button>
    </div>

    <!-- Certifications List -->
    <div class="grid gap-6">
      <div
        v-for="cert in certifications"
        :key="cert.title"
        class="bg-admin-card p-6 rounded-lg border border-admin-border"
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
                <h3 class="text-xl font-semibold text-admin-accent-light">
                  {{ cert.title }}
                </h3>
                <p class="text-admin-text">{{ cert.institution }}</p>
              </div>
            </div>
            
            <p class="text-admin-text mb-4">{{ cert.description }}</p>
            
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in cert.skills"
                :key="skill"
                class="px-3 py-1 text-sm bg-admin-accent/5 rounded-full text-admin-accent-light border border-admin-border"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <div class="flex gap-2 ml-4">
            <button
              @click="editCertification(cert)"
              class="p-2 text-admin-accent hover:text-admin-accent-light transition-colors duration-200"
            >
              <PencilIcon class="w-5 h-5" />
            </button>
            <button
              @click="deleteCertification(cert.title)"
              class="p-2 text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Certification Modal -->
    <TransitionRoot appear :show="showModal" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-2xl bg-admin-card rounded-lg shadow-xl border border-admin-border">
                <div class="p-6">
                  <DialogTitle class="text-xl font-bold text-admin-accent mb-6">
                    {{ editingCert ? 'Edit Certification' : 'New Certification' }}
                  </DialogTitle>

                  <form @submit.prevent="saveCertification" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Title</label>
                      <input
                        v-model="certForm.title"
                        type="text"
                        class="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Institution</label>
                      <input
                        v-model="certForm.institution"
                        type="text"
                        class="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Year</label>
                      <input
                        v-model="certForm.year"
                        type="text"
                        class="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Description</label>
                      <textarea
                        v-model="certForm.description"
                        rows="3"
                        class="admin-input"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Impact</label>
                      <textarea
                        v-model="certForm.impact"
                        rows="2"
                        class="admin-input"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Logo URL</label>
                      <input
                        v-model="certForm.logo"
                        type="url"
                        class="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Skills</label>
                      <div class="flex items-center gap-2">
                        <input
                          v-model="skillInput"
                          @keydown.enter.prevent="addSkill"
                          type="text"
                          placeholder="Press Enter to add"
                          class="admin-input"
                        />
                      </div>
                      <div class="flex flex-wrap gap-2 mt-2">
                        <span
                          v-for="skill in certForm.skills"
                          :key="skill"
                          class="px-3 py-1 text-sm bg-admin-accent/5 rounded-full text-admin-accent-light border border-admin-border flex items-center"
                        >
                          {{ skill }}
                          <button
                            @click="removeSkill(skill)"
                            class="ml-2 text-admin-accent hover:text-admin-accent-light"
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
                        class="px-4 py-2 text-admin-text hover:text-admin-accent-light transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="admin-button"
                      >
                        {{ editingCert ? 'Update' : 'Create' }}
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

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