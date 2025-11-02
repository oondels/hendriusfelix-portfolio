/**
 * Custom Portfolio Commands
 * Comandos personalizados para o portfolio
 */

import { Command, CommandContext, CommandResult } from '../types/terminal.types';
import { format, colors, separator, centerText } from '../utils';
import { projects } from '../../../cli/data/projects';
import { skills } from '../../../cli/data/skills';

// Portfolio Tour Command
export const portfolioCommand: Command = {
  name: 'portfolio',
  description: 'Tour guiado pelo portfolio',
  usage: 'portfolio',
  examples: ['portfolio'],
  execute: (): CommandResult => {
    return {
      output: [
        '',
        `${colors.cyan}╔═══════════════════════════════════════════════════════════╗${colors.reset}`,
        `${colors.cyan}║${colors.reset} ${colors.bright}${centerText('🎯 TOUR GUIADO - PORTFOLIO HENDRIUS FÉLIX', 57)}${colors.reset} ${colors.cyan}║${colors.reset}`,
        `${colors.cyan}╚═══════════════════════════════════════════════════════════╝${colors.reset}`,
        '',
        `${colors.yellow}Bem-vindo ao tour interativo!${colors.reset}`,
        '',
        `${colors.bright}📍 Navegação Recomendada:${colors.reset}`,
        '',
        `${colors.cyan}1. Sobre Mim${colors.reset}`,
        `   ${colors.dim}→${colors.reset} cd about`,
        `   ${colors.dim}→${colors.reset} cat README.md`,
        `   ${colors.dim}→${colors.reset} cat experience.txt`,
        '',
        `${colors.cyan}2. Meus Projetos${colors.reset}`,
        `   ${colors.dim}→${colors.reset} cd /projects`,
        `   ${colors.dim}→${colors.reset} tree`,
        `   ${colors.dim}→${colors.reset} projects        ${colors.dim}# comando especial${colors.reset}`,
        '',
        `${colors.cyan}3. Habilidades Técnicas${colors.reset}`,
        `   ${colors.dim}→${colors.reset} cd /skills`,
        `   ${colors.dim}→${colors.reset} ls -l`,
        `   ${colors.dim}→${colors.reset} skills          ${colors.dim}# comando especial${colors.reset}`,
        '',
        `${colors.cyan}4. Contato${colors.reset}`,
        `   ${colors.dim}→${colors.reset} cd /contact`,
        `   ${colors.dim}→${colors.reset} contact         ${colors.dim}# comando especial${colors.reset}`,
        `   ${colors.dim}→${colors.reset} social          ${colors.dim}# links redes sociais${colors.reset}`,
        '',
        separator('─'),
        '',
        `${format.info('💡 Dica:')} Use ${colors.bright}help${colors.reset} para ver todos os comandos disponíveis`,
        `${format.info('💡 Dica:')} Use ${colors.bright}Tab${colors.reset} para auto-complete`,
        ''
      ],
      exitCode: 0
    };
  }
};

// Projects Command
export const projectsCommand: Command = {
  name: 'projects',
  description: 'Lista projetos do portfolio',
  usage: 'projects [categoria]',
  examples: [
    'projects',
    'projects iot',
    'projects backend',
    'projects webapp'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { args } = context;
    const category = args[0]?.toLowerCase();

    // Mapear projetos por categoria
    const categorizedProjects: Record<string, typeof projects> = {
      iot: projects.filter(p => p.id.includes('smart') || p.id.includes('factory')),
      backend: projects.filter(p => p.id === 'jarvix'),
      webapp: [
        {
          id: 'portfolio',
          name: 'Interactive Portfolio Terminal',
          description: 'Portfolio interativo com terminal funcional usando Vue 3 + TypeScript',
          technologies: ['Vue 3', 'TypeScript', 'xterm.js', 'Tailwind CSS', 'Vite'],
          github: 'https://github.com/oondels/hendriusfelix-portfolio',
          demo: null
        }
      ]
    };

    const output: string[] = [
      '',
      `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
      `${colors.bright}  📁 PROJETOS - PORTFOLIO${colors.reset}`,
      `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
      ''
    ];

    // Se especificou categoria
    if (category && categorizedProjects[category]) {
      const categoryProjects = categorizedProjects[category];
      const categoryNames: Record<string, string> = {
        iot: 'IoT & Automação',
        backend: 'Backend & APIs',
        webapp: 'Web Applications'
      };

      output.push(`${colors.yellow}Categoria:${colors.reset} ${categoryNames[category]}`);
      output.push('');

      categoryProjects.forEach((project, index) => {
        output.push(`${colors.bright}${index + 1}. ${project.name}${colors.reset}`);
        output.push(`   ${colors.dim}${project.description}${colors.reset}`);
        output.push('');
        output.push(`   ${colors.cyan}Tecnologias:${colors.reset} ${project.technologies.join(', ')}`);
        if (project.github) {
          output.push(`   ${colors.green}GitHub:${colors.reset} ${project.github}`);
        }
        if (project.demo) {
          output.push(`   ${colors.blue}Demo:${colors.reset} ${project.demo}`);
        }
        output.push('');
        output.push(separator('─', 59));
        output.push('');
      });
    } else if (category) {
      return {
        output: [
          format.error(`Categoria '${category}' não encontrada`),
          '',
          'Categorias disponíveis: iot, backend, webapp'
        ],
        exitCode: 1
      };
    } else {
      // Mostrar todas as categorias
      output.push(`${colors.yellow}📊 Resumo:${colors.reset}`);
      output.push(`   Total de Projetos: ${colors.bright}${projects.length + 1}${colors.reset}`);
      output.push(`   Categorias: ${colors.bright}3${colors.reset}`);
      output.push('');
      output.push(separator('─', 59));
      output.push('');

      // IoT
      output.push(`${colors.cyan}🔌 IoT & Automação${colors.reset} (${categorizedProjects.iot.length} projetos)`);
      categorizedProjects.iot.forEach(p => {
        output.push(`   • ${colors.bright}${p.name}${colors.reset}`);
        output.push(`     ${colors.dim}${p.description.substring(0, 50)}...${colors.reset}`);
      });
      output.push('');

      // Backend
      output.push(`${colors.green}🖥️  Backend & APIs${colors.reset} (${categorizedProjects.backend.length} projeto)`);
      categorizedProjects.backend.forEach(p => {
        output.push(`   • ${colors.bright}${p.name}${colors.reset}`);
        output.push(`     ${colors.dim}${p.description.substring(0, 50)}...${colors.reset}`);
      });
      output.push('');

      // WebApp
      output.push(`${colors.blue}🌐 Web Applications${colors.reset} (${categorizedProjects.webapp.length} projeto)`);
      categorizedProjects.webapp.forEach(p => {
        output.push(`   • ${colors.bright}${p.name}${colors.reset}`);
        output.push(`     ${colors.dim}${p.description.substring(0, 50)}...${colors.reset}`);
      });
      output.push('');
      output.push(separator('─', 59));
      output.push('');
      output.push(`${format.info('💡')} Use ${colors.bright}projects <categoria>${colors.reset} para detalhes`);
      output.push(`${format.info('💡')} Exemplo: ${colors.bright}projects iot${colors.reset}`);
    }

    output.push('');
    return {
      output,
      exitCode: 0
    };
  }
};

// Skills Command
export const skillsCommand: Command = {
  name: 'skills',
  description: 'Lista habilidades técnicas',
  usage: 'skills [categoria]',
  examples: [
    'skills',
    'skills languages',
    'skills backend',
    'skills iot',
    'skills databases',
    'skills tools'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { args } = context;
    const category = args[0]?.toLowerCase();

    const output: string[] = [
      '',
      `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
      `${colors.bright}  🛠️  HABILIDADES TÉCNICAS${colors.reset}`,
      `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
      ''
    ];

    const categoryMap: Record<string, string> = {
      languages: 'Programming Languages',
      backend: 'Backend & Infrastructure',
      iot: 'IoT & Automation',
      databases: 'Databases',
      tools: 'Tools & Practices'
    };

    if (category && categoryMap[category]) {
      const categoryKey = categoryMap[category];
      const items = skills[categoryKey as keyof typeof skills];

      output.push(`${colors.yellow}Categoria:${colors.reset} ${categoryKey}`);
      output.push('');

      items.forEach((skill: string, index: number) => {
        const icon = index % 3 === 0 ? '▸' : index % 3 === 1 ? '▹' : '▸';
        output.push(`   ${colors.cyan}${icon}${colors.reset} ${skill}`);
      });

      output.push('');
      output.push(separator('─', 59));
      output.push(`   ${colors.dim}Total: ${items.length} habilidades${colors.reset}`);
    } else if (category) {
      return {
        output: [
          format.error(`Categoria '${category}' não encontrada`),
          '',
          'Categorias: languages, backend, iot, databases, tools'
        ],
        exitCode: 1
      };
    } else {
      // Mostrar resumo de todas
      Object.entries(skills).forEach(([key, items]) => {
        const icon = key.includes('Language') ? '💻' : 
                     key.includes('Backend') ? '🔧' :
                     key.includes('IoT') ? '📡' :
                     key.includes('Database') ? '🗄️' : '⚙️';
        
        output.push(`${icon} ${colors.bright}${key}${colors.reset} (${items.length})`);
        output.push(`   ${colors.dim}${items.slice(0, 3).join(' • ')}...${colors.reset}`);
        output.push('');
      });

      output.push(separator('─', 59));
      output.push('');
      output.push(`${format.info('💡')} Use ${colors.bright}skills <categoria>${colors.reset} para detalhes`);
      output.push(`${format.info('💡')} Exemplo: ${colors.bright}skills languages${colors.reset}`);
    }

    output.push('');
    return {
      output,
      exitCode: 0
    };
  }
};

// Contact Command
export const contactCommand: Command = {
  name: 'contact',
  description: 'Informações de contato',
  usage: 'contact',
  examples: ['contact'],
  execute: (): CommandResult => {
    return {
      output: [
        '',
        `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
        `${colors.bright}  📧 INFORMAÇÕES DE CONTATO${colors.reset}`,
        `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
        '',
        `${colors.yellow}📧 Email Principal:${colors.reset}`,
        `   hendrius.felix@email.com`,
        '',
        `${colors.yellow}💼 Email Profissional:${colors.reset}`,
        `   hendrius@professional.dev`,
        '',
        separator('─', 59),
        '',
        `${colors.yellow}🌐 Links Importantes:${colors.reset}`,
        '',
        `   ${colors.cyan}Portfolio:${colors.reset}  https://hendrius.dev`,
        `   ${colors.green}GitHub:${colors.reset}     https://github.com/hendriusfelix`,
        `   ${colors.blue}LinkedIn:${colors.reset}   https://linkedin.com/in/hendriusfelix`,
        '',
        separator('─', 59),
        '',
        `${format.info('💡')} Use ${colors.bright}social${colors.reset} para ver todas as redes sociais`,
        `${format.info('💡')} Use ${colors.bright}cd /contact${colors.reset} e ${colors.bright}ls${colors.reset} para ver arquivos`,
        ''
      ],
      exitCode: 0
    };
  }
};

// Social Command
export const socialCommand: Command = {
  name: 'social',
  description: 'Links para redes sociais',
  usage: 'social',
  examples: ['social'],
  execute: (): CommandResult => {
    return {
      output: [
        '',
        `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
        `${colors.bright}  🌐 REDES SOCIAIS${colors.reset}`,
        `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
        '',
        `${colors.bright}Conecte-se comigo:${colors.reset}`,
        '',
        `   🐙 ${colors.cyan}GitHub${colors.reset}`,
        `      https://github.com/hendriusfelix`,
        '',
        `   💼 ${colors.blue}LinkedIn${colors.reset}`,
        `      https://linkedin.com/in/hendriusfelix`,
        '',
        `   🐦 ${colors.cyan}Twitter/X${colors.reset}`,
        `      https://twitter.com/hendriusdev`,
        '',
        `   📝 ${colors.green}Dev.to${colors.reset}`,
        `      https://dev.to/hendrius`,
        '',
        `   📺 ${colors.red}YouTube${colors.reset}`,
        `      https://youtube.com/@hendriusdev`,
        '',
        `   📚 ${colors.magenta}Blog${colors.reset}`,
        `      https://blog.hendrius.dev`,
        '',
        separator('─', 59),
        '',
        `${colors.dim}Sinta-se à vontade para me seguir e acompanhar meus projetos!${colors.reset}`,
        ''
      ],
      exitCode: 0
    };
  }
};

// Resume Command
export const resumeCommand: Command = {
  name: 'resume',
  description: 'Visualiza CV resumido',
  usage: 'resume',
  examples: ['resume'],
  execute: (): CommandResult => {
    return {
      output: [
        '',
        `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
        `${colors.bright}  📄 CURRÍCULO - HENDRIUS FÉLIX${colors.reset}`,
        `${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`,
        '',
        `${colors.yellow}👨‍💻 Full Stack Developer & IoT Enthusiast${colors.reset}`,
        '',
        separator('─', 59),
        '',
        `${colors.bright}💼 EXPERIÊNCIA${colors.reset}`,
        '',
        `   ${colors.cyan}Senior Full Stack Developer${colors.reset} ${colors.dim}(2020 - Presente)${colors.reset}`,
        `   • Liderança técnica em projetos de IoT`,
        `   • Arquitetura de sistemas escaláveis`,
        `   • Mentoria de equipes`,
        '',
        `   ${colors.cyan}Backend Developer${colors.reset} ${colors.dim}(2018 - 2020)${colors.reset}`,
        `   • APIs RESTful e microserviços`,
        `   • Sistemas de monitoramento`,
        '',
        separator('─', 59),
        '',
        `${colors.bright}🎓 FORMAÇÃO${colors.reset}`,
        '',
        `   • Bacharelado em Engenharia de Software`,
        `   • AWS Certified Solutions Architect`,
        `   • IoT Developer Certification`,
        `   • Kubernetes Administrator (CKA)`,
        '',
        separator('─', 59),
        '',
        `${colors.bright}🛠️ PRINCIPAIS SKILLS${colors.reset}`,
        '',
        `   ${colors.cyan}Backend:${colors.reset} Node.js, Python, Java`,
        `   ${colors.cyan}IoT:${colors.reset} MQTT, OPC UA, Industrial Protocols`,
        `   ${colors.cyan}Cloud:${colors.reset} Docker, Kubernetes, AWS`,
        `   ${colors.cyan}Databases:${colors.reset} PostgreSQL, MongoDB, Redis`,
        '',
        separator('─', 59),
        '',
        `${format.info('💡')} CV completo: ${colors.bright}https://hendrius.dev/resume${colors.reset}`,
        `${format.info('💡')} Para mais detalhes: ${colors.bright}cd /about${colors.reset}`,
        ''
      ],
      exitCode: 0
    };
  }
};
