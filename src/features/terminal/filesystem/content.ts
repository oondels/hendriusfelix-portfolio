/**
 * Terminal File System Content
 * Conteúdo dos arquivos do portfolio
 */

import { projects } from '../../../cli/data/projects';
import { skills } from '../../../cli/data/skills';

export const fileContents = {
  // Root README
  'README.md': `# 👋 Bem-vindo ao Portfolio Terminal de Hendrius Félix

Este é um terminal interativo onde você pode explorar meu portfolio de forma diferente!

## 🚀 Começando

Digite \`help\` para ver os comandos disponíveis.

## 📁 Estrutura

- \`/about\`    - Informações sobre mim
- \`/projects\` - Portfólio de projetos
- \`/skills\`   - Habilidades técnicas
- \`/contact\`  - Como me encontrar
- \`/blog\`     - Artigos (em breve)

## 💡 Dicas

- Use \`ls\` para listar arquivos
- Use \`cd\` para navegar entre pastas
- Use \`cat\` para ler arquivos
- Use \`tree\` para ver a estrutura completa

Explore à vontade! 🎯
`,

  // Welcome message
  '.welcome': `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ██╗  ██╗███████╗███╗   ██╗██████╗ ██████╗ ██╗██╗   ██╗███████╗
║   ██║  ██║██╔════╝████╗  ██║██╔══██╗██╔══██╗██║██║   ██║██╔════╝
║   ███████║█████╗  ██╔██╗ ██║██║  ██║██████╔╝██║██║   ██║███████╗
║   ██╔══██║██╔══╝  ██║╚██╗██║██║  ██║██╔══██╗██║██║   ██║╚════██║
║   ██║  ██║███████╗██║ ╚████║██████╔╝██║  ██║██║╚██████╔╝███████║
║   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚══════╝
║                                                               ║
║              Full Stack Developer & IoT Enthusiast            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Welcome to my interactive portfolio terminal!

Type 'help' to see available commands
Type 'portfolio' for a guided tour
`,

  // About section
  'about/README.md': `# 👨‍💻 Sobre Hendrius Félix

## 🚀 Desenvolvedor Full Stack & Entusiasta de IoT

Profissional apaixonado por criar soluções inovadoras que conectam o mundo 
físico ao digital através de software robusto e sistemas de automação.

## 💼 Experiência Profissional

**5+ anos** desenvolvendo sistemas escaláveis e soluções IoT

### Especialidades
- 🔧 Desenvolvimento Backend (Node.js, Python, Java)
- 🌐 Aplicações Web Full Stack
- 📡 Sistemas IoT e Automação Industrial
- 🏗️ Arquitetura de Software
- 🐳 DevOps e Cloud (Docker, Kubernetes, AWS)

## 🎯 Filosofia

> "Construindo pontes entre os mundos físico e digital através de 
> soluções de software inovadoras e sistemas de automação."

## 📚 Formação

- 🎓 Bacharelado em Engenharia de Software
- 📜 Certificações em IoT e Automação Industrial
- 🏆 Constante aprendizado em novas tecnologias

---

📝 Para mais detalhes:
- Execute: \`cat experience.txt\` para ver experiência
- Execute: \`cat education.txt\` para ver formação
- Execute: \`cd /skills\` para ver habilidades técnicas
`,

  'about/experience.txt': `EXPERIÊNCIA PROFISSIONAL

════════════════════════════════════════════════════════════════

Senior Full Stack Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 2020 - Presente

• Liderança técnica em projetos de IoT e automação
• Desenvolvimento de arquiteturas escaláveis
• Integração de sistemas industriais com soluções digitais
• Mentoria de equipes de desenvolvimento
• Stack: Node.js, Python, React, Docker, AWS

════════════════════════════════════════════════════════════════

Backend Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 2018 - 2020

• Desenvolvimento de APIs RESTful e microserviços
• Implementação de sistemas de monitoramento em tempo real
• Otimização de performance e escalabilidade
• Stack: Java, Spring Boot, PostgreSQL, Redis

════════════════════════════════════════════════════════════════

PROJETOS DESTACADOS:

✨ 15+ projetos IoT implementados
✨ 10+ sistemas de automação industrial
✨ 100+ APIs desenvolvidas e mantidas
✨ 50+ integrações de sistemas legados

════════════════════════════════════════════════════════════════
`,

  'about/education.txt': `FORMAÇÃO ACADÊMICA

════════════════════════════════════════════════════════════════

🎓 Bacharelado em Engenharia de Software
   Universidade Federal
   2014 - 2018

════════════════════════════════════════════════════════════════

CERTIFICAÇÕES

📜 AWS Certified Solutions Architect
📜 IoT Developer Certification
📜 Industrial Automation Specialist
📜 Kubernetes Administrator (CKA)
📜 MongoDB Certified Developer

════════════════════════════════════════════════════════════════

CURSOS E TREINAMENTOS

• Advanced Node.js Development
• Industrial IoT Systems
• Machine Learning for IoT
• Cloud Architecture Patterns
• Microservices Architecture

════════════════════════════════════════════════════════════════
`,

  // Projects
  'projects/README.md': `# 📁 Meus Projetos

Aqui você encontra uma seleção dos meus principais projetos organizados por categoria.

## 📂 Categorias

### 🔌 IoT (Internet of Things)
\`cd iot\` - Projetos de Internet das Coisas e automação

### 🖥️ Backend
\`cd backend\` - APIs, microserviços e sistemas backend

### 🌐 Web Apps
\`cd webapp\` - Aplicações web full stack

## 📊 Estatísticas

- Total de Projetos: ${projects.length}
- Tecnologias Usadas: 15+
- Anos de Experiência: 5+

## 🔍 Como Explorar

\`\`\`bash
cd iot              # Entrar na pasta de IoT
cat list.json       # Ver lista de projetos
\`\`\`

---

💡 Dica: Use o comando \`projects\` para ver uma visualização formatada!
`,

  'projects/iot/list.json': JSON.stringify(
    projects.filter(p => p.id.includes('smart') || p.id.includes('factory')),
    null,
    2
  ),

  'projects/backend/list.json': JSON.stringify(
    projects.filter(p => !p.id.includes('smart') && !p.id.includes('factory')),
    null,
    2
  ),

  'projects/webapp/list.json': JSON.stringify(
    [
      {
        id: 'portfolio',
        name: 'Interactive Portfolio Terminal',
        description: 'Este próprio portfolio - um terminal interativo construído com Vue 3 e TypeScript',
        technologies: ['Vue 3', 'TypeScript', 'xterm.js', 'Tailwind CSS'],
        github: 'https://github.com/hendrius/portfolio',
        demo: 'https://hendrius.dev'
      }
    ],
    null,
    2
  ),

  // Skills
  'skills/languages.txt': `LINGUAGENS DE PROGRAMAÇÃO

════════════════════════════════════════════════════════════════

${skills['Programming Languages'].map((lang, i) => `${i + 1}. ${lang}`).join('\n')}

════════════════════════════════════════════════════════════════

💡 Proficiência: Avançado a Expert em todas as listadas
📊 Mais usado: Python, TypeScript, JavaScript

════════════════════════════════════════════════════════════════
`,

  'skills/frameworks.txt': `FRAMEWORKS E TECNOLOGIAS BACKEND

════════════════════════════════════════════════════════════════

${skills['Backend & Infrastructure'].map((fw, i) => `${i + 1}. ${fw}`).join('\n')}

════════════════════════════════════════════════════════════════

IoT & AUTOMAÇÃO

${skills['IoT & Automation'].map((tech, i) => `${i + 1}. ${tech}`).join('\n')}

════════════════════════════════════════════════════════════════
`,

  'skills/databases.txt': `BANCOS DE DADOS E ARMAZENAMENTO

════════════════════════════════════════════════════════════════

${skills['Databases'].map((db, i) => `${i + 1}. ${db}`).join('\n')}

════════════════════════════════════════════════════════════════

ESPECIALIDADES:

✓ Modelagem de dados relacional e NoSQL
✓ Otimização de queries e índices
✓ Replicação e sharding
✓ Backup e recovery strategies
✓ Time series databases para IoT

════════════════════════════════════════════════════════════════
`,

  'skills/tools.txt': `FERRAMENTAS E PRÁTICAS

════════════════════════════════════════════════════════════════

${skills['Tools & Practices'].map((tool, i) => `${i + 1}. ${tool}`).join('\n')}

════════════════════════════════════════════════════════════════

METODOLOGIAS:

• Agile/Scrum
• Test-Driven Development (TDD)
• Continuous Integration/Deployment
• Code Review Best Practices
• Documentation as Code

════════════════════════════════════════════════════════════════
`,

  // Contact
  'contact/social.txt': `REDES SOCIAIS E PRESENÇA ONLINE

════════════════════════════════════════════════════════════════

🐙 GitHub
   https://github.com/hendriusfelix

💼 LinkedIn
   https://linkedin.com/in/hendriusfelix

🐦 Twitter/X
   https://twitter.com/hendriusdev

📝 Dev.to
   https://dev.to/hendrius

🌐 Portfolio
   https://hendrius.dev

════════════════════════════════════════════════════════════════

💡 Sinta-se à vontade para me seguir e acompanhar meus projetos!

════════════════════════════════════════════════════════════════
`,

  'contact/email.txt': `CONTATO POR EMAIL

════════════════════════════════════════════════════════════════

📧 Email Principal:
   hendrius.felix@email.com

💼 Email Profissional:
   hendrius@professional.dev

════════════════════════════════════════════════════════════════

📝 Prefiro emails para:

• Oportunidades profissionais
• Colaborações em projetos
• Consultorias técnicas
• Palestras e workshops

Respondo geralmente em até 24-48 horas úteis.

════════════════════════════════════════════════════════════════
`,

  'contact/links.txt': `LINKS IMPORTANTES

════════════════════════════════════════════════════════════════

📚 PORTFÓLIO E PROJETOS
─────────────────────────────────────────────────────────────────
🌐 Website:        https://hendrius.dev
🐙 GitHub:         https://github.com/hendriusfelix
📦 npm packages:   https://npmjs.com/~hendrius

════════════════════════════════════════════════════════════════

💼 PROFISSIONAL
─────────────────────────────────────────────────────────────────
💼 LinkedIn:       https://linkedin.com/in/hendriusfelix
📄 CV Online:      https://hendrius.dev/resume
🎥 Talks:          https://hendrius.dev/talks

════════════════════════════════════════════════════════════════

📱 SOCIAL
─────────────────────────────────────────────────────────────────
🐦 Twitter:        https://twitter.com/hendriusdev
📝 Blog:           https://blog.hendrius.dev
📺 YouTube:        https://youtube.com/@hendriusdev

════════════════════════════════════════════════════════════════
`,
};

// Função helper para obter conteúdo de um arquivo
export function getFileContent(path: string): string | undefined {
  // Remove leading slash and normalize path
  const normalizedPath = path.replace(/^\//, '').replace(/^~\//, '');
  return fileContents[normalizedPath as keyof typeof fileContents];
}
