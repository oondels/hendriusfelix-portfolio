/**
 * System Commands
 * Comandos de sistema: help, clear, exit, history
 */

import { Command, CommandContext, CommandResult } from '../types/terminal.types';
import { format, separator, colors } from '../utils';

// Help Command
export const helpCommand: Command = {
  name: 'help',
  description: 'Mostra ajuda sobre comandos disponíveis',
  usage: 'help [comando]',
  aliases: ['?', 'man'],
  examples: [
    'help',
    'help ls',
    'help cd'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { args } = context;
    
    if (args.length === 0) {
      return {
        output: [
          `${colors.bright}Portfolio Terminal - Comandos Disponíveis${colors.reset}`,
          '',
          separator('═'),
          '',
          `${colors.cyan}NAVEGAÇÃO${colors.reset}`,
          '  ls [path]              Lista arquivos e diretórios',
          '  cd <path>              Muda para o diretório especificado',
          '  pwd                    Mostra o diretório atual',
          '  tree [path]            Mostra estrutura em árvore',
          '',
          `${colors.cyan}VISUALIZAÇÃO${colors.reset}`,
          '  cat <file>             Exibe conteúdo de um arquivo',
          '  less <file>            Visualiza arquivo com paginação',
          '  head <file> [-n NUM]   Mostra primeiras linhas',
          '  tail <file> [-n NUM]   Mostra últimas linhas',
          '',
          `${colors.cyan}BUSCA${colors.reset}`,
          '  find <pattern>         Busca arquivos por nome',
          '  grep <pattern> <file>  Busca texto em arquivo',
          '',
          `${colors.cyan}SISTEMA${colors.reset}`,
          '  help [comando]         Mostra esta ajuda',
          '  clear                  Limpa a tela',
          '  history                Mostra histórico de comandos',
          '  exit                   Volta para o modo visual',
          '',
          `${colors.cyan}PORTFOLIO${colors.reset}`,
          '  portfolio              Tour guiado do portfolio',
          '  projects [categoria]   Lista projetos',
          '  skills [categoria]     Lista habilidades',
          '  contact                Informações de contato',
          '  whoami                 Sobre o desenvolvedor',
          '',
          separator('═'),
          '',
          `${format.info('💡 Dica:')} Use ${colors.bright}help <comando>${colors.reset} para mais detalhes`,
          `${format.info('💡 Dica:')} Use ${colors.bright}Tab${colors.reset} para auto-complete (em breve)`,
          ''
        ],
        exitCode: 0
      };
    }

    // Help para comando específico
    const commandName = args[0].toLowerCase();
    const helpTexts: Record<string, string[]> = {
      ls: [
        `${colors.bright}ls${colors.reset} - Lista arquivos e diretórios`,
        '',
        `${colors.yellow}USO:${colors.reset}`,
        '  ls [opções] [path]',
        '',
        `${colors.yellow}OPÇÕES:${colors.reset}`,
        '  -l    Lista detalhada (permissões, tamanho, data)',
        '  -a    Mostra arquivos ocultos (começam com .)',
        '  -la   Combinação de -l e -a',
        '',
        `${colors.yellow}EXEMPLOS:${colors.reset}`,
        '  ls',
        '  ls projects',
        '  ls -l',
        '  ls -la /about'
      ],
      cd: [
        `${colors.bright}cd${colors.reset} - Muda o diretório atual`,
        '',
        `${colors.yellow}USO:${colors.reset}`,
        '  cd <path>',
        '',
        `${colors.yellow}CAMINHOS ESPECIAIS:${colors.reset}`,
        '  cd /          Vai para raiz',
        '  cd ~          Vai para home',
        '  cd ..         Sobe um nível',
        '  cd -          Volta ao diretório anterior',
        '',
        `${colors.yellow}EXEMPLOS:${colors.reset}`,
        '  cd projects',
        '  cd /about',
        '  cd ../skills'
      ],
      pwd: [
        `${colors.bright}pwd${colors.reset} - Print Working Directory`,
        '',
        `${colors.yellow}USO:${colors.reset}`,
        '  pwd',
        '',
        'Mostra o caminho completo do diretório atual'
      ],
      cat: [
        `${colors.bright}cat${colors.reset} - Exibe conteúdo de arquivo`,
        '',
        `${colors.yellow}USO:${colors.reset}`,
        '  cat <arquivo>',
        '',
        `${colors.yellow}EXEMPLOS:${colors.reset}`,
        '  cat README.md',
        '  cat about/experience.txt',
        '  cat /projects/iot/list.json'
      ],
      tree: [
        `${colors.bright}tree${colors.reset} - Mostra estrutura em árvore`,
        '',
        `${colors.yellow}USO:${colors.reset}`,
        '  tree [path]',
        '',
        `${colors.yellow}EXEMPLOS:${colors.reset}`,
        '  tree',
        '  tree projects',
        '  tree /skills'
      ],
      clear: [
        `${colors.bright}clear${colors.reset} - Limpa a tela do terminal`,
        '',
        `${colors.yellow}USO:${colors.reset}`,
        '  clear',
        '',
        'Remove todo o histórico visível do terminal'
      ],
      history: [
        `${colors.bright}history${colors.reset} - Mostra histórico de comandos`,
        '',
        `${colors.yellow}USO:${colors.reset}`,
        '  history',
        '',
        'Lista todos os comandos executados nesta sessão'
      ],
      exit: [
        `${colors.bright}exit${colors.reset} - Sai do terminal`,
        '',
        `${colors.yellow}USO:${colors.reset}`,
        '  exit',
        '',
        'Retorna para o modo de visualização normal do portfolio'
      ]
    };

    const helpText = helpTexts[commandName];
    if (helpText) {
      return {
        output: ['', ...helpText, ''],
        exitCode: 0
      };
    }

    return {
      output: [
        format.error(`Comando '${commandName}' não encontrado`),
        '',
        'Use "help" para ver todos os comandos disponíveis'
      ],
      exitCode: 1
    };
  }
};

// Clear Command
export const clearCommand: Command = {
  name: 'clear',
  description: 'Limpa a tela do terminal',
  usage: 'clear',
  aliases: ['cls'],
  execute: (): CommandResult => {
    return {
      output: ['__CLEAR__'], // Sinal especial para limpar o terminal
      exitCode: 0
    };
  }
};

// Exit Command
export const exitCommand: Command = {
  name: 'exit',
  description: 'Sai do terminal e volta para o modo visual',
  usage: 'exit',
  aliases: ['quit', 'q'],
  execute: (): CommandResult => {
    return {
      output: ['__EXIT__'], // Sinal especial para sair do terminal
      exitCode: 0
    };
  }
};

// History Command
export const historyCommand: Command = {
  name: 'history',
  description: 'Mostra o histórico de comandos',
  usage: 'history',
  execute: (context: CommandContext): CommandResult => {
    const history = context.state.commandHistory;
    
    if (history.length === 0) {
      return {
        output: ['Nenhum comando no histórico'],
        exitCode: 0
      };
    }

    const output = [
      `${colors.bright}Histórico de Comandos${colors.reset}`,
      separator('─'),
      '',
      ...history.map((cmd, index) => `  ${colors.dim}${index + 1}${colors.reset}  ${cmd}`),
      ''
    ];

    return {
      output,
      exitCode: 0
    };
  }
};

// Whoami Command (easter egg / custom)
export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Mostra informações sobre o desenvolvedor',
  usage: 'whoami',
  execute: (): CommandResult => {
    return {
      output: [
        '',
        `${colors.cyan}╔═══════════════════════════════════════════════════════════╗${colors.reset}`,
        `${colors.cyan}║${colors.reset}  ${colors.bright}Hendrius Félix${colors.reset}                                        ${colors.cyan}║${colors.reset}`,
        `${colors.cyan}║${colors.reset}  Full Stack Developer & IoT Enthusiast                ${colors.cyan}║${colors.reset}`,
        `${colors.cyan}╚═══════════════════════════════════════════════════════════╝${colors.reset}`,
        '',
        `${colors.yellow}👨‍💻 Desenvolvedor:${colors.reset} Hendrius Félix`,
        `${colors.yellow}🎯 Especialidade:${colors.reset} Backend, IoT, Automação`,
        `${colors.yellow}💼 Experiência:${colors.reset} 5+ anos`,
        `${colors.yellow}📍 Localização:${colors.reset} Brasil`,
        '',
        `${colors.dim}> "Construindo pontes entre os mundos físico e digital"${colors.reset}`,
        '',
        `${format.info('💡')} Digite ${colors.bright}cd about${colors.reset} para saber mais`,
        ''
      ],
      exitCode: 0
    };
  }
};
