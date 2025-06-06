<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-admin">Projects Manager</h2>
      <button
        @click="openNewProjectModal"
        class="px-4 py-2 bg-admin text-white font-medium rounded-lg hover:bg-admin/90 transition-colors duration-200"
      >
        Add New Project
      </button>
    </div>

    <!-- Projects List -->
    <div class="grid gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-admin-card p-6 rounded-lg border border-admin-border"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-semibold text-admin-light mb-2">
              {{ project.title }}
            </h3>
            <p class="text-admin-text mb-4">{{ project.summary }}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1 text-sm bg-admin/5 rounded-full text-admin-light border border-admin-border"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button
              @click="editProject(project)"
              class="p-2 text-admin hover:text-admin-light transition-colors duration-200"
            >
              <PencilIcon class="w-5 h-5" />
            </button>
            <button
              @click="deleteProject(project.id)"
              class="p-2 text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
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
                  <DialogTitle class="text-xl font-bold text-admin mb-6">
                    {{ editingProject ? 'Edit Project' : 'New Project' }}
                  </DialogTitle>

                  <form @submit.prevent="saveProject" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Title</label>
                      <input
                        v-model="projectForm.title"
                        type="text"
                        class="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Summary</label>
                      <textarea
                        v-model="projectForm.summary"
                        rows="2"
                        class="admin-input"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Description</label>
                      <textarea
                        v-model="projectForm.description"
                        rows="4"
                        class="admin-input"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Technologies</label>
                      <div class="flex items-center gap-2">
                        <input
                          v-model="techInput"
                          @keydown.enter.prevent="addTechnology"
                          type="text"
                          placeholder="Press Enter to add"
                          class="admin-input"
                        />
                      </div>
                      <div class="flex flex-wrap gap-2 mt-2">
                        <span
                          v-for="tech in projectForm.technologies"
                          :key="tech"
                          class="px-3 py-1 text-sm bg-admin/5 rounded-full text-admin-light border border-admin-border flex items-center"
                        >
                          {{ tech }}
                          <button
                            @click="removeTechnology(tech)"
                            class="ml-2 text-admin hover:text-admin-light"
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
                        class="px-4 py-2 text-admin-text hover:text-admin-light transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="admin-button"
                      >
                        {{ editingProject ? 'Update' : 'Create' }}
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

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  category: 'web' | 'iot' | 'opensource';
  image: string;
  challenge: string;
  solution: string;
  impact: string;
  demoUrl?: string;
  githubUrl?: string;
}

const projects = ref<Project[]>([
  {
    id: 'flowcare',
    title: 'FlowCare',
    summary: 'Hospital management system with real-time queue optimization',
    description: 'Complete hospital management system integrating appointment scheduling, queue management, and automated workflows.',
    category: 'web',
    image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    technologies: ['Node.js', 'PostgreSQL', 'Docker', 'Vue 3', 'WebSocket'],
    challenge: 'Streamline patient flow and reduce wait times in a high-volume hospital environment.',
    solution: 'Implemented real-time queue management with predictive algorithms and automated notification system.',
    impact: 'Reduced average wait times by 45% and improved patient satisfaction scores by 60%.',
    demoUrl: 'https://flowcare.demo.dev',
    githubUrl: 'https://github.com/hendrius/flowcare'
  }
]);

const showModal = ref(false);
const editingProject = ref<string | null>(null);
const techInput = ref('');

const projectForm = reactive({
  title: '',
  summary: '',
  description: '',
  technologies: [] as string[]
});

const openNewProjectModal = () => {
  editingProject.value = null;
  resetForm();
  showModal.value = true;
};

const editProject = (project: Project) => {
  editingProject.value = project.id;
  Object.assign(projectForm, project);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  projectForm.title = '';
  projectForm.summary = '';
  projectForm.description = '';
  projectForm.technologies = [];
  techInput.value = '';
};

const addTechnology = () => {
  if (techInput.value.trim() && !projectForm.technologies.includes(techInput.value.trim())) {
    projectForm.technologies.push(techInput.value.trim());
    techInput.value = '';
  }
};

const removeTechnology = (tech: string) => {
  projectForm.technologies = projectForm.technologies.filter(t => t !== tech);
};

const saveProject = () => {
  if (editingProject.value) {
    const index = projects.value.findIndex(p => p.id === editingProject.value);
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...projectForm };
    }
  } else {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectForm,
      category: 'web',
      image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
      challenge: '',
      solution: '',
      impact: ''
    };
    projects.value.push(newProject);
  }
  closeModal();
};

const deleteProject = (id: string) => {
  if (confirm('Are you sure you want to delete this project?')) {
    projects.value = projects.value.filter(p => p.id !== id);
  }
};
</script>