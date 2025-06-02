import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '../components/admin/AdminLogin.vue';

const routes = [
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