<script setup lang="ts">
import { onMounted, ref } from "vue";
import { certificationService } from "../../services/CertificationService";
import type { Certification } from "../../services/CertificationService";

const certifications = ref<Certification[]>([]);

const fetchCertifications = async () => {
  try {
    certifications.value = await certificationService.getCertifications();
  } catch (error) {
    certifications.value = [];
  }
};

const formatDate = (value?: string) => {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });
};

onMounted(() => {
  fetchCertifications();
});
</script>

<template>
  <section id="certifications" class="section-container bg-[#111111] mt-5">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-4xl font-bold text-white mb-4">Certificações</h2>
          <p class="text-lg text-[#D3D3D3]">
            Certificações e formações relevantes para minha atuação profissional.
          </p>
        </div>
      </div>

      <div v-if="certifications.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="cert in certifications"
          :key="cert.id ?? cert.name"
          class="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div class="space-y-2">
            <h3 class="text-xl font-semibold text-white">{{ cert.name }}</h3>
            <p class="text-[#D3D3D3] text-sm">{{ cert.issuing_organization }}</p>
            <p class="text-[#9CA3AF] text-sm">
              Emitido em {{ formatDate(cert.issue_date) }}
            </p>
          </div>

          <div class="mt-4">
            <a
              v-if="cert.credential_url"
              :href="cert.credential_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300"
            >
              Ver Credencial
            </a>
          </div>
        </article>
      </div>

      <div v-else class="bg-white/5 rounded-xl p-8 border border-white/10">
        <p class="text-[#D3D3D3]">
          Em breve. Novas certificações serão listadas aqui.
        </p>
      </div>
    </div>
  </section>
</template>
