<template>
  <div class="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-8">
      <h1 class="text-2xl font-bold mb-2 text-white">Admin Access</h1>
      <p class="text-sm text-[#D3D3D3] mb-6">Insira sua chave de acesso para continuar.</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm text-[#D3D3D3] mb-2">Access Key</label>
          <input
            v-model="token"
            type="password"
            class="admin-input w-full"
            placeholder="••••••••"
            autocomplete="off"
            required
          />
        </div>

        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>

        <button type="submit" class="admin-button w-full">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const token = ref("");
const error = ref("");

const handleSubmit = () => {
  error.value = "";
  const value = token.value.trim();
  if (!value) {
    error.value = "Informe a Access Key.";
    return;
  }

  localStorage.setItem("admin_token", value);
  router.push("/admin");
};
</script>
