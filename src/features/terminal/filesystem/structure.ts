/**
 * Terminal File System Structure
 * Estrutura de arquivos virtual do portfolio
 */

import { FileNode } from '../types/terminal.types';

export const portfolioFileSystem: FileNode = {
  type: 'directory',
  name: '~',
  metadata: {
    description: 'Home directory - Portfolio Hendrius Félix',
    permissions: 'drwxr-xr-x'
  },
  children: {
    'about': {
      type: 'directory',
      name: 'about',
      metadata: {
        description: 'Informações sobre mim',
        permissions: 'drwxr-xr-x'
      },
      children: {
        'README.md': {
          type: 'file',
          name: 'README.md',
          metadata: {
            description: 'Apresentação e bio',
            language: 'markdown',
            size: 1024,
            permissions: '-rw-r--r--'
          },
          content: ''  // Será preenchido em content.ts
        },
        'experience.txt': {
          type: 'file',
          name: 'experience.txt',
          metadata: {
            description: 'Experiência profissional',
            language: 'text',
            size: 2048,
            permissions: '-rw-r--r--'
          },
          content: ''
        },
        'education.txt': {
          type: 'file',
          name: 'education.txt',
          metadata: {
            description: 'Formação acadêmica',
            language: 'text',
            size: 512,
            permissions: '-rw-r--r--'
          },
          content: ''
        }
      }
    },
    'projects': {
      type: 'directory',
      name: 'projects',
      metadata: {
        description: 'Portfólio de projetos',
        permissions: 'drwxr-xr-x'
      },
      children: {
        'iot': {
          type: 'directory',
          name: 'iot',
          metadata: {
            description: 'Projetos de IoT',
            category: 'IoT',
            permissions: 'drwxr-xr-x'
          },
          children: {
            'list.json': {
              type: 'file',
              name: 'list.json',
              metadata: {
                description: 'Lista de projetos IoT',
                language: 'json',
                permissions: '-rw-r--r--'
              },
              content: ''
            }
          }
        },
        'backend': {
          type: 'directory',
          name: 'backend',
          metadata: {
            description: 'Projetos Backend',
            category: 'Backend',
            permissions: 'drwxr-xr-x'
          },
          children: {
            'list.json': {
              type: 'file',
              name: 'list.json',
              metadata: {
                description: 'Lista de projetos Backend',
                language: 'json',
                permissions: '-rw-r--r--'
              },
              content: ''
            }
          }
        },
        'webapp': {
          type: 'directory',
          name: 'webapp',
          metadata: {
            description: 'Aplicações Web',
            category: 'WebApp',
            permissions: 'drwxr-xr-x'
          },
          children: {
            'list.json': {
              type: 'file',
              name: 'list.json',
              metadata: {
                description: 'Lista de Web Apps',
                language: 'json',
                permissions: '-rw-r--r--'
              },
              content: ''
            }
          }
        },
        'README.md': {
          type: 'file',
          name: 'README.md',
          metadata: {
            description: 'Visão geral dos projetos',
            language: 'markdown',
            permissions: '-rw-r--r--'
          },
          content: ''
        }
      }
    },
    'skills': {
      type: 'directory',
      name: 'skills',
      metadata: {
        description: 'Habilidades técnicas',
        permissions: 'drwxr-xr-x'
      },
      children: {
        'languages.txt': {
          type: 'file',
          name: 'languages.txt',
          metadata: {
            description: 'Linguagens de programação',
            language: 'text',
            category: 'languages',
            permissions: '-rw-r--r--'
          },
          content: ''
        },
        'frameworks.txt': {
          type: 'file',
          name: 'frameworks.txt',
          metadata: {
            description: 'Frameworks e bibliotecas',
            language: 'text',
            category: 'frameworks',
            permissions: '-rw-r--r--'
          },
          content: ''
        },
        'tools.txt': {
          type: 'file',
          name: 'tools.txt',
          metadata: {
            description: 'Ferramentas e DevOps',
            language: 'text',
            category: 'tools',
            permissions: '-rw-r--r--'
          },
          content: ''
        },
        'databases.txt': {
          type: 'file',
          name: 'databases.txt',
          metadata: {
            description: 'Bancos de dados',
            language: 'text',
            category: 'databases',
            permissions: '-rw-r--r--'
          },
          content: ''
        }
      }
    },
    'contact': {
      type: 'directory',
      name: 'contact',
      metadata: {
        description: 'Informações de contato',
        permissions: 'drwxr-xr-x'
      },
      children: {
        'social.txt': {
          type: 'file',
          name: 'social.txt',
          metadata: {
            description: 'Redes sociais',
            language: 'text',
            permissions: '-rw-r--r--'
          },
          content: ''
        },
        'email.txt': {
          type: 'file',
          name: 'email.txt',
          metadata: {
            description: 'Endereço de email',
            language: 'text',
            permissions: '-rw-r--r--'
          },
          content: ''
        },
        'links.txt': {
          type: 'file',
          name: 'links.txt',
          metadata: {
            description: 'Links importantes',
            language: 'text',
            permissions: '-rw-r--r--'
          },
          content: ''
        }
      }
    },
    'blog': {
      type: 'directory',
      name: 'blog',
      metadata: {
        description: 'Artigos e posts',
        permissions: 'drwxr-xr-x'
      },
      children: {
        'README.md': {
          type: 'file',
          name: 'README.md',
          metadata: {
            description: 'Em breve...',
            language: 'markdown',
            permissions: '-rw-r--r--'
          },
          content: '# Blog\n\nEm breve, artigos sobre desenvolvimento, IoT e tecnologia.\n'
        }
      }
    },
    'config': {
      type: 'directory',
      name: 'config',
      metadata: {
        description: 'Configurações do sistema',
        permissions: 'drwxr-xr-x'
      },
      children: {
        'theme.conf': {
          type: 'file',
          name: 'theme.conf',
          metadata: {
            description: 'Configuração de tema',
            language: 'config',
            permissions: '-rw-r--r--'
          },
          content: '# Terminal Theme\nTHEME=catppuccin-mocha\nCOLOR_SCHEME=dark\nFONT=JetBrains Mono\n'
        },
        'system.info': {
          type: 'file',
          name: 'system.info',
          metadata: {
            description: 'Informações do sistema',
            language: 'text',
            permissions: '-r--r--r--'
          },
          content: 'Portfolio Terminal v1.0.0\nBuilt with Vue 3 + TypeScript\nPowered by xterm.js\n'
        }
      }
    },
    'README.md': {
      type: 'file',
      name: 'README.md',
      metadata: {
        description: 'Bem-vindo ao portfolio',
        language: 'markdown',
        permissions: '-rw-r--r--'
      },
      content: ''
    },
    '.welcome': {
      type: 'file',
      name: '.welcome',
      metadata: {
        description: 'Mensagem de boas-vindas',
        language: 'text',
        permissions: '-rw-r--r--'
      },
      content: ''
    }
  }
};
