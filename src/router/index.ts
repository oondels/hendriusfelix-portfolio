import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '../components/admin/AdminLogin.vue';
import AdminLayout from '../components/admin/AdminLayout.vue';
import AdminDashboard from '../components/admin/AdminDashboard.vue';
import ProjectsManager from '../components/admin/ProjectsManager.vue';
import CertificationsManager from '../components/admin/CertificationsManager.vue';
import ProfileManager from '../components/admin/ProfileManager.vue';
import MainContent from '../components/MainContent.vue'
import Terminal from '../features/terminal/components/Terminal.vue';

const routes = [
  {
    path: '/login',
    component: AdminLogin,
    meta: {
      title: 'Admin Login'
    }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true
    },
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
    path: '/terminal-mode',
    component: Terminal,
    meta: {
      title: 'Terminal Mode'
    }
  },
  // {
  //   path: '/terminal-access-47892',
  //   component: AdminLogin,
  //   meta: {
  //     title: '404 Not Found'
  //   }
  // },
  {
    path: '/',
    component: MainContent,
    meta: {
      title: 'Main'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('admin_token');

  if (requiresAuth && !hasToken) {
    next({ path: '/login' });
    return;
  }

  if (to.path === '/login' && hasToken) {
    next({ path: '/admin' });
    return;
  }

  next();
})



export default router;
