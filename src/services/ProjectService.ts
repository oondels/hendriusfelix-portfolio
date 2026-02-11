import { Project } from '../types/index';
import { ip } from '../config/ip';
import { MOCK_PROJECTS } from '../data/mockProjects';
import axios from "axios"

class ProjectService {
  async getProjects(): Promise<Project[]> {
    try {
      const response = await axios.get(`${ip}/api/projects`)
      const data = response.data;

      if (response.status === 200 && Array.isArray(data) && data.length > 0) {
        return data;
      }

      console.warn("API indisponível ou vazia. Servindo dados de Mock.");
      return MOCK_PROJECTS;
    } catch (error) {
      console.warn("API indisponível ou vazia. Servindo dados de Mock.");
      return MOCK_PROJECTS;
    }
  }

  async createProject(projectData: Project): Promise<Project> {
    try {
      const response = await axios.post(`${ip}/api/projects`, projectData)
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw new Error("Failed to create project");
    }
  }

  async updateProject(projectId: number, projectData: Project): Promise<Project> {
    try {
      const response = await axios.put(`${ip}/api/projects/${projectId}`, projectData)
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw new Error("Failed to update project");
    }
  }

  async deleteProject(projectId: number): Promise<void> {
    try {
      await axios.delete(`${ip}/api/projects/${projectId}`)
    } catch (error) {
      console.error("Error deleting project:", error);
      throw new Error("Failed to delete project");
    }
  }
}

export const projectService = new ProjectService();
