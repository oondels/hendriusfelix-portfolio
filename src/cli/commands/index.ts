export const executeCommand = async (command: string): Promise<string[]> => {
  const cmd = command.toLowerCase().trim();
  const args = cmd.split(' ');

  switch (args[0]) {
    case 'help':
    case '?':
      return [
        'Available commands:',
        '',
        'help, ?          Show this help message',
        'about            Display information about me',
        'projects         List all projects',
        'project <name>   Show detailed project information',
        'skills          List technical skills',
        'contact         Show contact information',
        'clear           Clear the terminal',
        'whoami          Display quick intro',
        'ls              List available sections',
        'cat <file>      Display file contents',
        'exit            Exit terminal mode',
        '',
        'Tips:',
        '- Use Tab for command completion',
        '- Use ↑/↓ arrows to navigate command history',
        '- Commands are case-insensitive',
      ];

    case 'clear':
      return [];

    case 'whoami':
      return [
        'Hendrius Félix',
        'Full Stack Developer | IoT Specialist | Automation Engineer',
        '',
        '> Passionate about building robust systems that bridge',
        '  the physical and digital worlds through technology.',
        '',
        'Type "about" for more information.',
      ];

    case 'about':
      return about;

    case 'projects':
    case 'project':
      if (args[1]) {
        const project = projects.find(p => 
          p.id.toLowerCase() === args[1].toLowerCase()
        );
        return project 
          ? [
              `Project: ${project.name}`,
              '',
              project.description,
              '',
              'Technologies:',
              ...project.technologies.map(t => `- ${t}`),
              '',
              `GitHub: ${project.github}`,
              project.demo ? `Demo: ${project.demo}` : '',
            ]
          : ['Project not found. Use "projects" to list all projects.'];
      }
      return [
        'Projects:',
        '',
        ...projects.map(p => `${p.id} - ${p.name}`),
        '',
        'Use "project <name>" for details about a specific project.',
      ];

    case 'skills':
      return [
        'Technical Skills:',
        '',
        ...Object.entries(skills).map(([category, items]) => 
          `${category}:\n${items.map(item => `  - ${item}`).join('\n')}`
        ),
      ];

    case 'contact':
      return [
        'Contact Information:',
        '',
        'Email: hendrius@example.com',
        'LinkedIn: linkedin.com/in/hendrius',
        'GitHub: github.com/hendrius',
        '',
        'Location: São Paulo, Brazil',
      ];

    case 'ls':
      return [
        'Available sections:',
        '',
        'about.txt',
        'projects/',
        'skills.md',
        'contact.txt',
        '',
      ];

    case 'cat':
      if (!args[1]) {
        return ['Usage: cat <filename>'];
      }
      switch (args[1]) {
        case 'about.txt':
          return about;
        case 'skills.md':
          return [
            '# Skills',
            '',
            ...Object.entries(skills).map(([category, items]) => 
              `## ${category}\n${items.map(item => `- ${item}`).join('\n')}`
            ),
          ];
        default:
          return [`File '${args[1]}' not found.`];
      }

    default:
      return [`Command not found: ${cmd}. Type "help" for available commands.`];
  }
};

import { about } from '../data/about';
import { projects } from '../data/projects';
import { skills } from '../data/skills';