import { Project } from '../types/index';
import { ip } from '../config/ip';
import axios from "axios"

class ProjectService {
  async getProjects(): Promise<Project[]> {
    try {
      const response = await axios.get(`${ip}/api/projects`)
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects");
    }
  }
}

export const projectService = new ProjectService();
