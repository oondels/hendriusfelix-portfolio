<template>
  <div class="space-y-6">
    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="bg-[#0f0f15] p-6 rounded-lg border border-[#00b4d8]/20"
      >
        <div class="flex items-center">
          <component :is="stat.icon" class="w-8 h-8 text-[#00b4d8]" />
          <div class="ml-4">
            <p class="text-sm text-[#90e0ef]">{{ stat.name }}</p>
            <p class="text-2xl font-semibold text-[#00b4d8]">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-[#0f0f15] rounded-lg border border-[#00b4d8]/20">
      <div class="p-6">
        <h2 class="text-xl text-[#00b4d8] font-mono mb-4">Recent Activity</h2>
        <div class="space-y-4">
          <div
            v-for="(activity, index) in recentActivity"
            :key="index"
            class="flex items-center p-4 bg-[#0a0a0f] rounded-lg"
          >
            <component :is="activity.icon" class="w-5 h-5 text-[#90e0ef]" />
            <div class="ml-4">
              <p class="text-[#90e0ef]">{{ activity.description }}</p>
              <p class="text-sm text-[#00b4d8]/60">{{ activity.timestamp }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="action in quickActions"
        :key="action.name"
        class="bg-[#0f0f15] p-6 rounded-lg border border-[#00b4d8]/20 cursor-pointer hover:bg-[#00b4d8]/5 transition-colors duration-200"
        @click="action.onClick"
      >
        <div class="flex items-center">
          <component :is="action.icon" class="w-6 h-6 text-[#00b4d8]" />
          <div class="ml-4">
            <h3 class="text-[#90e0ef]">{{ action.name }}</h3>
            <p class="text-sm text-[#00b4d8]/60">{{ action.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  DocumentPlusIcon,
  AcademicCapIcon,
  UserIcon,
  FolderIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();

const stats = [
  { name: 'Total Projects', value: '12', icon: FolderIcon },
  { name: 'Certifications', value: '8', icon: AcademicCapIcon },
  { name: 'Blog Posts', value: '24', icon: DocumentPlusIcon },
  { name: 'Profile Views', value: '2.4k', icon: UserIcon }
];

const recentActivity = [
  {
    icon: PlusIcon,
    description: 'Added new project: SmartGrid Monitor',
    timestamp: '2 hours ago'
  },
  {
    icon: PencilIcon,
    description: 'Updated certification details',
    timestamp: '5 hours ago'
  },
  {
    icon: TrashIcon,
    description: 'Removed outdated project',
    timestamp: '1 day ago'
  }
];

const quickActions = [
  {
    name: 'Add New Project',
    description: 'Create and publish a new project',
    icon: PlusIcon,
    onClick: () => router.push('/admin/projects')
  },
  {
    name: 'Update Profile',
    description: 'Modify your personal information',
    icon: UserIcon,
    onClick: () => router.push('/admin/profile')
  }
];
</script>