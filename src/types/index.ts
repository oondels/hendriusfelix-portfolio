export interface Project {
  id: number;
  name: string;
  summary: string;
  description: string;
  category: 'IoT' | 'Backend' | 'WebApp';
  technologies: string[];
  star_method: {
    situacao: string;
    tarefa: string;
    acao: string;
    resultado: string;
  };
  images: string[];
  github_url: string;
  demo_url?: string;
  status?: 'complete' | 'in-progress' | 'refactoring';
  createdAt: string;
  updatedAt: string;
}
