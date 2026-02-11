import { api } from '../config/api';

export interface DashboardStats {
  projects: number;
  certifications: number;
  blogs: number;
}

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await api.get(`/api/dashboard`)
      const data = response.data;

      if (response.status === 200 && data?.stats) {
        return data.stats;
      }

      console.warn("API indisponível ou vazia. Retornando stats zerados.");
      return { projects: 0, certifications: 0, blogs: 0 };
    } catch (error) {
      console.warn("API indisponível ou vazia. Retornando stats zerados.");
      return { projects: 0, certifications: 0, blogs: 0 };
    }
  }
}

export const dashboardService = new DashboardService();
