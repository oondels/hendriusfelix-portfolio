<template>
  <div class="space-y-6">
    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="bg-admin-card p-6 rounded-lg border border-admin-border"
      >
        <div class="flex items-center">
          <component :is="stat.icon" class="w-8 h-8 text-admin" />
          <div class="ml-4">
            <p class="text-sm text-admin-light">{{ stat.name }}</p>
            <p class="text-2xl font-semibold text-admin">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <!-- <div class="bg-admin-card rounded-lg border border-admin-border">
      <div class="p-6">
        <h2 class="text-xl text-admin font-mono mb-4">Recent Activity</h2>
        <div class="space-y-4">
          <div
            v-for="(activity, index) in recentActivity"
            :key="index"
            class="flex items-center p-4 bg-admin-bg rounded-lg"
          >
            <component :is="activity.icon" class="w-5 h-5 text-admin-light" />
            <div class="ml-4">
              <p class="text-admin-light">{{ activity.description }}</p>
              <p class="text-sm text-admin/60">{{ activity.timestamp }}</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="action in quickActions"
        :key="action.name"
        class="bg-admin-card p-6 rounded-lg border border-admin-border cursor-pointer hover:bg-admin/5 transition-colors duration-200"
        @click="action.onClick"
      >
        <div class="flex items-center">
          <component :is="action.icon" class="w-6 h-6 text-admin" />
          <div class="ml-4">
            <h3 class="text-admin-light">{{ action.name }}</h3>
            <p class="text-sm text-admin/60">{{ action.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Projects Table -->
    <div class="bg-admin-card rounded-lg border border-admin-border overflow-hidden">
      <div class="p-6">
        <h2 class="text-xl text-admin font-mono mb-4">Recent Projects</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-admin-border">
                <th class="text-left py-3 px-4 text-admin-light font-medium">Project</th>
                <th class="text-left py-3 px-4 text-admin-light font-medium">Status</th>
                <th class="text-left py-3 px-4 text-admin-light font-medium">Last Updated</th>
                <th class="text-left py-3 px-4 text-admin-light font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in recentProjects" :key="project.id" class="border-b border-admin-border">
                <td class="py-3 px-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded bg-admin/10 flex items-center justify-center">
                      <component :is="project.icon" class="w-4 h-4 text-admin" />
                    </div>
                    <div class="ml-3">
                      <p class="text-admin-text font-medium">{{ project.name }}</p>
                      <p class="text-sm text-admin-text-dim">{{ project.description }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span :class="[
                    'px-2 py-1 text-xs rounded-full',
                    project.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                    project.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-admin/10 text-admin'
                  ]">
                    {{ project.status }}
                  </span>
                </td>
                <td class="py-3 px-4 text-admin-text-dim">{{ project.lastUpdated }}</td>
                <td class="py-3 px-4">
                  <button class="text-admin hover:text-admin-light transition-colors duration-200">
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
  PlusIcon,
  CodeBracketIcon,
  BeakerIcon,
  CubeIcon
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

const recentProjects = [
  {
    id: 1,
    name: 'SmartGrid Monitor',
    description: 'IoT-based power grid monitoring',
    status: 'Active',
    lastUpdated: '1 hour ago',
    icon: BeakerIcon
  },
  {
    id: 2,
    name: 'Factory Automation',
    description: 'Industrial automation system',
    status: 'In Progress',
    lastUpdated: '3 hours ago',
    icon: CubeIcon
  },
  {
    id: 3,
    name: 'API Gateway',
    description: 'Microservices integration',
    status: 'Planning',
    lastUpdated: '1 day ago',
    icon: CodeBracketIcon
  }
];
</script>