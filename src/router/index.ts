import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '../components/admin/AdminLogin.vue';
import AdminLayout from '../components/admin/AdminLayout.vue';
import AdminDashboard from '../components/admin/AdminDashboard.vue';
import ProjectsManager from '../components/admin/ProjectsManager.vue';
import CertificationsManager from '../components/admin/CertificationsManager.vue';
import ProfileManager from '../components/admin/ProfileManager.vue';

const routes = [
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: '',
        component: AdminDashboard,
        name: 'admin-dashboard'
      },
      {
        path: 'projects',
        component: ProjectsManager,
        name: 'projects-manager'
      },
      {
        path: 'certifications',
        component: CertificationsManager,
        name: 'certifications-manager'
      },
      {
        path: 'profile',
        component: ProfileManager,
        name: 'profile-manager'
      }
    ]
  },
  {
    path: '/terminal-access-47892',
    component: AdminLogin,
    meta: {
      title: '404 Not Found'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;