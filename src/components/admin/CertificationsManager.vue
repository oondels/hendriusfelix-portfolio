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
        :key="cert.id ?? cert.name"
        class="bg-admin-card p-6 rounded-lg border border-admin-border"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="mb-4">
              <h3 class="text-xl font-semibold text-admin-accent-light">
                {{ cert.name }}
              </h3>
              <p class="text-admin-text">{{ cert.issuing_organization }}</p>
            </div>

            <div class="text-sm text-admin-text-dim space-y-1">
              <p>Emissão: {{ formatDate(cert.issue_date) }}</p>
              <p>
                Credencial:
                <a
                  :href="cert.credential_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-admin-accent hover:text-admin-accent-light transition-colors duration-200"
                >
                  {{ cert.credential_url }}
                </a>
              </p>
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
              @click="deleteCertification(cert.id)"
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
                      <label class="block text-sm font-medium text-admin-text mb-1">Name</label>
                      <input
                        v-model="certForm.name"
                        type="text"
                        class="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Issuing Organization</label>
                      <input
                        v-model="certForm.issuing_organization"
                        type="text"
                        class="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Issue Date</label>
                      <input
                        v-model="certForm.issue_date"
                        type="date"
                        class="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-admin-text mb-1">Link da Credencial</label>
                      <input
                        v-model="certForm.credential_url"
                        type="url"
                        class="admin-input"
                        required
                      />
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
import { onMounted, ref, reactive } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { certificationService } from '../../services/CertificationService';
import type { Certification } from '../../services/CertificationService';
import { useToast } from "vue-toastification";

const toast = useToast();
const certifications = ref<Certification[]>([]);

const showModal = ref(false);
const editingCert = ref<number | null>(null);

const certForm = reactive({
  name: '',
  issuing_organization: '',
  issue_date: '',
  credential_url: ''
});

const fetchCertifications = async () => {
  try {
    certifications.value = await certificationService.getCertifications();
  } catch (error) {
    toast.error("Erro ao carregar certificações.");
  }
};

onMounted(() => {
  fetchCertifications();
});

const openNewCertModal = () => {
  editingCert.value = null;
  resetForm();
  showModal.value = true;
};

const editCertification = (cert: Certification) => {
  editingCert.value = cert.id ?? null;
  Object.assign(certForm, {
    name: cert.name || '',
    issuing_organization: cert.issuing_organization || '',
    issue_date: cert.issue_date ? cert.issue_date.slice(0, 10) : '',
    credential_url: cert.credential_url || ''
  });
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  Object.assign(certForm, {
    name: '',
    issuing_organization: '',
    issue_date: '',
    credential_url: ''
  });
};

const formatDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("pt-BR");
};

const saveCertification = async () => {
  try {
    if (editingCert.value) {
      await certificationService.updateCertification(editingCert.value, certForm as Certification);
      toast.success("Certificação atualizada com sucesso!");
    } else {
      const newCert = await certificationService.createCertification(certForm as Certification);
      if (newCert.id) {
        toast.success("Certificação criada com sucesso!");
      }
    }
    closeModal();
    await fetchCertifications();
  } catch (error) {
    toast.error("Erro ao salvar certificação.");
  }
};

const deleteCertification = async (id?: number) => {
  if (!id) return;
  if (confirm('Are you sure you want to delete this certification?')) {
    try {
      await certificationService.deleteCertification(id);
      toast.success("Certificação excluída com sucesso!");
      await fetchCertifications();
    } catch (error) {
      toast.error("Erro ao excluir certificação.");
    }
  }
};
</script>
