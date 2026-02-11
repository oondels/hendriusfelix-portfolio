import { Project } from '../types/index';

const now = new Date().toISOString();

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Jarvix Assistant',
    summary: 'Assistente pessoal com IA para automação residencial e tarefas diárias.',
    description:
      'AI-powered personal assistant for home automation and daily task management. Features natural language processing and adaptive learning capabilities.',
    category: 'IoT',
    technologies: ['Python', 'TensorFlow', 'MQTT', 'Docker', 'PostgreSQL'],
    star_method: {
      situacao: 'Residências com múltiplos dispositivos sem integração eficiente.',
      tarefa: 'Unificar automação e rotinas em um único assistente inteligente.',
      acao: 'Desenho de fluxos de NLP, integrações via MQTT e pipelines de dados.',
      resultado: 'Redução de tarefas manuais e resposta mais rápida às rotinas diárias.'
    },
    images: ['https://placehold.co/600x400'],
    github_url: 'https://github.com/hendrius/jarvix',
    demo_url: 'https://jarvix.demo.dev',
    status: 'complete',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 2,
    name: 'SmartGrid Monitor',
    summary: 'Monitoramento em tempo real de redes elétricas inteligentes.',
    description:
      'Real-time monitoring system for smart electrical grids. Provides analytics and predictive maintenance through IoT sensors and machine learning.',
    category: 'Backend',
    technologies: ['Node.js', 'InfluxDB', 'React', 'WebSocket', 'Grafana'],
    star_method: {
      situacao: 'Falta de visibilidade em tempo real de redes elétricas distribuídas.',
      tarefa: 'Criar um painel com métricas e alertas preditivos confiáveis.',
      acao: 'Implementação de pipeline de telemetria e dashboards com alertas.',
      resultado: 'Detecção antecipada de falhas e melhor tomada de decisão operacional.'
    },
    images: ['https://placehold.co/600x400'],
    github_url: 'https://github.com/hendrius/smartgrid',
    status: 'in-progress',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 3,
    name: 'Factory Automation Suite',
    summary: 'Suite industrial para automação e eficiência de produção.',
    description:
      'Comprehensive industrial automation system integrating sensors, actuators, and management systems for improved production efficiency.',
    category: 'WebApp',
    technologies: ['C++', 'Python', 'OPC UA', 'MongoDB', 'Docker'],
    star_method: {
      situacao: 'Linha de produção com baixa integração entre sensores e gestores.',
      tarefa: 'Conectar dispositivos e centralizar controle de produção.',
      acao: 'Integração de dados industriais e criação de módulos de gestão.',
      resultado: 'Aumento da eficiência e rastreabilidade na cadeia produtiva.'
    },
    images: ['https://placehold.co/600x400'],
    github_url: 'https://github.com/hendrius/factory-automation',
    demo_url: 'https://factory.demo.dev',
    status: 'complete',
    createdAt: now,
    updatedAt: now
  }
];
