<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-admin">Gerenciamento de Projetos</h2>
      <button
        @click="openNewProjectModal"
        class="px-4 py-2 bg-admin text-white font-medium rounded-lg hover:bg-admin/90 transition-colors duration-200"
      >
        Novo Projeto
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
              {{ project.name }}
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
              @click="openDeleteModal(project.id)"
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
                    {{ editingProject ? "Edit Project" : "New Project" }}
                  </DialogTitle>

                  <form @submit.prevent="saveProject" class="space-y-4">
                    <!-- Nome -->
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Nome</label>
                      <input v-model="projectForm.name" type="text" class="admin-input" required />
                    </div>

                    <!-- Resumo -->
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Resumo</label>
                      <textarea v-model="projectForm.summary" rows="2" class="admin-input" required></textarea>
                    </div>

                    <!-- Descrição -->
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Descrição</label>
                      <textarea v-model="projectForm.description" rows="4" class="admin-input" required></textarea>
                    </div>

                    <!-- Tecnologias -->
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Tecnologias</label>
                      <div class="flex items-center gap-2">
                        <input
                          v-model="techInput"
                          @keydown.enter.prevent="addTechnology"
                          type="text"
                          placeholder="Pressione Enter para adicionar"
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
                          <button @click="removeTechnology(tech)" class="ml-2 text-admin hover:text-admin-light">
                            ×
                          </button>
                        </span>
                      </div>
                    </div>

                    <!-- Categoria -->
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Categoria</label>
                      <select v-model="projectForm.category" class="admin-input">
                        <option disabled value="">Selecione uma categoria</option>
                        <option value="web">Web</option>
                        <option value="iot">IoT</option>
                        <option value="opensource">Open Source</option>
                      </select>
                    </div>

                    <!-- Método STAR -->
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Método STAR</label>
                      <div class="space-y-2">
                        <input
                          v-model="projectForm.star_method.situacao"
                          type="text"
                          placeholder="Situação"
                          class="admin-input"
                        />
                        <input
                          v-model="projectForm.star_method.tarefa"
                          type="text"
                          placeholder="Tarefa"
                          class="admin-input"
                        />
                        <input
                          v-model="projectForm.star_method.acao"
                          type="text"
                          placeholder="Ação"
                          class="admin-input"
                        />
                        <input
                          v-model="projectForm.star_method.resultado"
                          type="text"
                          placeholder="Resultado"
                          class="admin-input"
                        />
                      </div>
                    </div>

                    <!-- URLs -->
                    <div class="grid md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-admin-text mb-1">URL do GitHub</label>
                        <input v-model="projectForm.github_url" type="url" class="admin-input" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-admin-text mb-1">URL da Demo</label>
                        <input v-model="projectForm.demo_url" type="url" class="admin-input" />
                      </div>
                    </div>

                    <!-- Imagens (como lista de URLs) -->
                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Imagens</label>
                      <div class="flex items-center gap-2">
                        <!-- <input
                          v-model="imageInput"
                          @keydown.enter.prevent="addImage"
                          type="url"
                          placeholder="Insira a URL da imagem e pressione Enter"
                          class="admin-input"
                        /> -->
                      </div>
                      <div v-if="projectForm.images.length" class="flex flex-wrap gap-2 mt-2">
                        <span
                          v-for="img in projectForm.images"
                          :key="img"
                          class="px-3 py-1 text-sm bg-admin/5 rounded-full text-admin-light border border-admin-border flex items-center"
                        >
                          {{ img }}
                          <!-- <button @click="removeImage(img)" class="ml-2 text-admin hover:text-admin-light">×</button> -->
                        </span>
                      </div>
                      <div v-else>
                        <span>Sem imagens</span>
                      </div>
                    </div>

                    <!-- Status -->
                    <!-- <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Status</label>
                      <select v-model="projectForm.status" class="admin-input">
                        <option disabled value="">Selecione o status</option>
                        <option value="em progresso">Em progresso</option>
                        <option value="concluído">Concluído</option>
                        <option value="em pausa">Em pausa</option>
                      </select>
                    </div> -->

                    <!-- Botões -->
                    <div class="flex justify-end gap-4 mt-6">
                      <button
                        type="button"
                        @click="closeModal"
                        class="px-4 py-2 text-admin-text hover:text-admin-light transition-colors duration-200"
                      >
                        Cancelar
                      </button>
                      <button type="submit" class="admin-button">
                        {{ editingProject ? "Atualizar" : "Criar" }}
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
    
    <!-- Delete Confirmation Modal -->
    <TransitionRoot appear :show="showDeleteModal" as="template">
      <Dialog as="div" @close="closeDeleteModal" class="relative z-50">
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
              <DialogPanel class="w-full max-w-md bg-admin-card rounded-lg shadow-xl border border-admin-border">
                <div class="p-6">
                  <div class="flex items-center gap-4">
                    <div class="flex-shrink-0 bg-red-100/10 rounded-full p-2">
                      <ExclamationTriangleIcon class="w-6 h-6 text-red-500" />
                    </div>
                    <DialogTitle class="text-xl font-bold text-admin">
                      Confirmar Exclusão
                    </DialogTitle>
                  </div>
                  
                  <p class="mt-4 text-admin-text">
                    Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.
                  </p>
                  
                  <div class="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      @click="closeDeleteModal"
                      class="px-4 py-2 text-admin-text hover:text-admin-light transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button 
                      @click="deleteProject"
                      class="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      Excluir
                    </button>
                  </div>
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
import { Project } from "../../types/index";
import { ref, reactive } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from "@headlessui/vue";
import { PencilIcon, TrashIcon, ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import { projectService } from "../../services/ProjectService";
import { useToast } from "vue-toastification";

const toast = useToast();
const projects = ref<Project[]>([]);
const getProjects = async () => {
  projects.value = await projectService.getProjects();
};
getProjects();

const showModal = ref(false);
const showDeleteModal = ref(false);
const projectToDelete = ref<number | null>(null);
const editingProject = ref<number | null>(null);
const techInput = ref("");

const imageInput = ref("");
const projectForm = reactive({
  name: "",
  summary: "",
  description: "",
  technologies: [] as string[],
  category: "",
  star_method: {
    situacao: "",
    tarefa: "",
    acao: "",
    resultado: "",
  },
  images: [] as string[],
  github_url: "",
  demo_url: "",
  status: "",
});

const resetForm = () => {
  projectForm.name = "";
  projectForm.summary = "";
  projectForm.description = "";
  projectForm.technologies = [];
  techInput.value = "";
  projectForm.category = "";
  projectForm.star_method = {
    situacao: "",
    tarefa: "",
    acao: "",
    resultado: "",
  };
  projectForm.images = [];
  projectForm.github_url = "";
  projectForm.demo_url = "";
  projectForm.status = "";
};

const openNewProjectModal = () => {
  editingProject.value = null;
  resetForm();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const addTechnology = () => {
  if (techInput.value.trim() && !projectForm.technologies.includes(techInput.value.trim())) {
    projectForm.technologies.push(techInput.value.trim());
    techInput.value = "";
  }
};

const removeTechnology = (tech: string) => {
  projectForm.technologies = projectForm.technologies.filter((t) => t !== tech);
};

const editProject = (project: Project) => {
  editingProject.value = project.id;
  Object.assign(projectForm, project);
  showModal.value = true;
};

const saveProject = async () => {
  try {
    if (editingProject.value) {
      // Update existing project
      await projectService.updateProject(editingProject.value, projectForm as Project);
      toast.success("Projeto atualizado com sucesso!");
    } else {
      const newProject = await projectService.createProject(projectForm as Project);
      if (newProject.id) {
        toast.success("Projeto criado com sucesso!");
      }
    }
    closeModal();
    await getProjects();
  } catch (error) {
    toast.error("Erro ao salvar o projeto.");
  }
};

const openDeleteModal = (id: number) => {
  projectToDelete.value = id;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  projectToDelete.value = null;
};

const deleteProject = async () => {
  try {
    if (projectToDelete.value) {
      await projectService.deleteProject(projectToDelete.value);
      toast.success("Projeto excluído com sucesso!");
      await getProjects();
      closeDeleteModal();
    }
  } catch (error) {
    toast.error("Erro ao excluir o projeto.");
  }
};
</script>
