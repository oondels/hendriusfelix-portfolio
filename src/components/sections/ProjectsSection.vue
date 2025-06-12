<template>
  <section id="projects" class="section-container bg-[#111111]">
    <div class="max-w-6xl mx-auto">
      <!-- Philosophy Section -->
      <div class="mb-16 bg-white/5 rounded-xl p-8 border border-white/10">
        <h3 class="text-2xl font-bold text-white mb-4">🛠 How I Build</h3>
        <p class="text-lg text-[#D3D3D3] leading-relaxed">
          I craft backend-first systems that are scalable, maintainable, and purpose-driven — always focused on solving
          real problems, not just building features. Every project starts with a clear understanding of the challenge
          and ends with measurable impact.
        </p>
      </div>

      <!-- Category Tabs -->
      <div class="flex space-x-4 mb-12">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="activeCategory = category.id as 'IoT' | 'Backend' | 'WebApp'"
          :class="[
            'px-6 py-3 rounded-lg font-medium transition-all duration-300',
            activeCategory === category.id ? 'bg-white text-black' : 'bg-white/5 text-[#D3D3D3] hover:bg-white/10',
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="bg-white/5 rounded-xl overflow-hidden transition-all duration-500"
          :class="{ 'md:col-span-2': activeProjectId === project.id }"
        >
          <div class="relative overflow-hidden rounded-xl shadow-lg">
            <img :src="project.images[0]" :alt="project.name" class="w-full h-64 object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <span
              v-if="project.status"
              :class="[
                categorizeProjectStatus(project.status).color,
                'absolute top-4 left-4 z-20 inline-flex items-center gap-1',
                'rounded-full px-3 py-1 text-xs font-semibold ring-1',
              ]"
            >
              <svg
                v-if="project.status === 'in-progress'"
                class="h-2.5 w-2.5 animate-pulse fill-current"
                viewBox="0 0 10 10"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              {{ categorizeProjectStatus(project.status).status }}
            </span>

            <div class="absolute bottom-0 p-6">
              <h3 class="text-2xl font-bold text-white mb-1">{{ project.name }}</h3>
              <p class="text-[#D3D3D3] text-sm leading-snug max-w-prose">
                {{ project.summary }}
              </p>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1 bg-white/5 rounded-full text-sm text-[#D3D3D3] border border-white/10"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Expand / Collapse trigger -->
            <button @click="toggleProject(project.id)" class="hint-btn">
              {{ activeProjectId === project.id ? "Show Less" : "View Details" }} →
            </button>

            <!-- Details -->
            <Transition name="fade-slide">
              <section v-if="activeProjectId === project.id" class="mt-8 space-y-10">
                <!-- STAR method -->
                <h1>Método STAR</h1>
                <dl class="grid gap-10 md:grid-cols-2">
                  <div
                    v-for="(value, key) in {
                      Situação: project.star_method.situacao,
                      Tarefa: project.star_method.tarefa,
                      Ação: project.star_method.acao,
                      Resultado: project.star_method.resultado,
                    }"
                    :key="key"
                    class="relative pl-6"
                  >
                    <div class="absolute left-0 top-0 h-full w-px bg-white/10"></div>

                    <dt class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {{ key }}
                    </dt>
                    <dd class="text-sm leading-relaxed text-[#D3D3D3]">
                      {{ value }}
                    </dd>
                  </div>
                </dl>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                  <a
                    v-if="project.demo_url"
                    :href="project.demo_url"
                    target="_blank"
                    class="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300"
                  >
                    View Demo
                  </a>

                  <a
                    v-if="project.github_url"
                    :href="project.github_url"
                    target="_blank"
                    class="px-6 py-3 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    GitHub Repo
                  </a>
                </div>
              </section>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { projectService } from "../../services/ProjectService";
import { Project } from "../../types";

const projects = ref<Project[]>([]);
const getProjects = async () => {
  projects.value = await projectService.getProjects();
};
getProjects();

const categorizeProjectStatus = (status: string) => {
  switch (status) {
    case "completed":
      return { status: "Concluído", color: "text-green-500" };
    case "in-progress":
      return { status: "Em Progresso", color: "text-yellow-500" };
    case "refactoring":
      return { status: "Refatoração", color: "text-blue-500" };
    default:
      return { status: "Desconhecido", color: "text-gray-500" };
  }
};

const activeCategory = ref<"IoT" | "Backend" | "WebApp">("WebApp");
const activeProjectId = ref<number | null>(null);
const showBuildLog = ref(false);

const categories = [
  { id: "WebApp", name: "Web Applications" },
  { id: "IoT", name: "IoT & Automation" },
  { id: "Backend", name: "Backend" },
];

const filteredProjects = computed(() => {
  return projects.value.filter((project) => project.category === activeCategory.value);
});

const toggleProject = (projectId: number) => {
  if (activeProjectId.value === projectId) {
    activeProjectId.value = null;
    showBuildLog.value = false;
  } else {
    activeProjectId.value = projectId;
    showBuildLog.value = true;
  }
};
</script>
