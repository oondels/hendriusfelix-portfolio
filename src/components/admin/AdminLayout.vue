<template>
  <div class="min-h-screen bg-[#0a0a0f]">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 bg-[#0f0f15] border-r border-[#00b4d8]/20">
      <div class="flex items-center justify-between h-16 px-4 border-b border-[#00b4d8]/20">
        <span class="text-[#00b4d8] font-mono text-lg">Admin Console</span>
        <button @click="toggleSidebar" class="lg:hidden text-[#00b4d8]">
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>
      
      <nav class="mt-4 px-2">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="flex items-center px-4 py-2 mt-2 text-[#90e0ef] rounded-lg hover:bg-[#00b4d8]/10 transition-colors duration-200"
          :class="{ 'bg-[#00b4d8]/20': currentRoute === item.to }"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64">
      <div class="flex items-center justify-between h-16 px-4 bg-[#0f0f15] border-b border-[#00b4d8]/20">
        <h1 class="text-[#00b4d8] font-mono">{{ currentPageTitle }}</h1>
        <div class="flex items-center space-x-4">
          <button
            @click="logout"
            class="px-4 py-2 text-[#00b4d8] border border-[#00b4d8]/20 rounded-lg hover:bg-[#00b4d8]/10 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      <main class="p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  HomeIcon,
  FolderIcon,
  AcademicCapIcon,
  UserIcon,
  Bars3Icon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();

const navigation = [
  { name: 'Dashboard', to: '/admin', icon: HomeIcon },
  { name: 'Projects', to: '/admin/projects', icon: FolderIcon },
  { name: 'Certifications', to: '/admin/certifications', icon: AcademicCapIcon },
  { name: 'Profile', to: '/admin/profile', icon: UserIcon }
];

const currentRoute = computed(() => route.path);
const currentPageTitle = computed(() => {
  const current = navigation.find(item => item.to === route.path);
  return current ? current.name : 'Admin Console';
});

const toggleSidebar = () => {
  // Implement sidebar toggle for mobile
};

const logout = () => {
  localStorage.removeItem('admin_authenticated');
  router.push('/terminal-access-47892');
};
</script>