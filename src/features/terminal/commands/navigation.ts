/**
 * Navigation Commands
 * Comandos de navegação: ls, cd, pwd, tree
 */

import { Command, CommandContext, CommandResult, FileNode } from '../types/terminal.types';
import { format, colorizeFileName, getFileIcon, formatPermissions, formatDate, formatFileSize, parseArgs, separator, colors } from '../utils';
import { PathResolver } from '../filesystem/resolver';

// LS Command
export const lsCommand: Command = {
  name: 'ls',
  description: 'Lista arquivos e diretórios',
  usage: 'ls [opções] [path]',
  aliases: ['dir'],
  examples: [
    'ls',
    'ls projects',
    'ls -l',
    'ls -la /about'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { currentPath, fileSystem, args } = context;
    const parsed = parseArgs(['ls', ...args].join(' '));
    const flags = parsed.flags;
    
    // Determinar o path a listar
    const targetPath = parsed.args.length > 0 ? parsed.args[0] : currentPath;
    
    // Resolver o path usando o resolver
    const pathResolver = new PathResolver(fileSystem);
    const resolvedPath = pathResolver.resolvePath(currentPath, targetPath);
    const items = pathResolver.listDirectory(resolvedPath);

    if (!items) {
      return {
        output: [format.error(`ls: cannot access '${targetPath}': No such file or directory`)],
        error: 'Path not found',
        exitCode: 1
      };
    }

    // Filtrar arquivos ocultos se -a não foi usado
    let filteredItems = items;
    if (!flags.a && !flags.all) {
      filteredItems = items.filter((item: FileNode) => !item.name.startsWith('.'));
    }

    if (filteredItems.length === 0) {
      return {
        output: [''],
        exitCode: 0
      };
    }

    // Lista simples (sem -l)
    if (!flags.l && !flags.long) {
      const names = filteredItems.map((item: FileNode) => {
        const icon = getFileIcon(item);
        const colored = colorizeFileName(item);
        return `${icon} ${colored}`;
      });
      
      // Organizar em colunas (3 colunas)
      const output: string[] = [];
      for (let i = 0; i < names.length; i += 3) {
        const row = names.slice(i, i + 3).join('  ');
        output.push(`  ${row}`);
      }
      
      return {
        output: ['', ...output, ''],
        exitCode: 0
      };
    }

    // Lista detalhada (-l)
    const output: string[] = [''];
    
    for (const item of filteredItems) {
      const permissions = formatPermissions(item.metadata?.permissions || '');
      const size = item.metadata?.size ? formatFileSize(item.metadata.size) : '-';
      const date = formatDate(item.metadata?.modified);
      const icon = getFileIcon(item);
      const name = colorizeFileName(item);
      
      output.push(`${permissions}  ${size.padStart(8)}  ${date}  ${icon} ${name}`);
    }
    
    output.push('');
    return {
      output,
      exitCode: 0
    };
  }
};

// CD Command
export const cdCommand: Command = {
  name: 'cd',
  description: 'Muda o diretório atual',
  usage: 'cd <path>',
  examples: [
    'cd projects',
    'cd /about',
    'cd ..',
    'cd ~'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { args, state } = context;
    
    if (args.length === 0) {
      // cd sem argumentos vai para home
      state.currentPath = '/';
      return {
        output: [''],
        exitCode: 0
      };
    }

    const targetPath = args[0];
    
    // cd - volta para diretório anterior
    if (targetPath === '-') {
      if (state.pathHistory.length > 1) {
        state.pathHistory.pop();
        const previous = state.pathHistory[state.pathHistory.length - 1];
        state.currentPath = previous;
        return {
          output: [previous],
          exitCode: 0
        };
      } else {
        return {
          output: [format.error('cd: OLDPWD not set')],
          exitCode: 1
        };
      }
    }

    const pathResolver = new PathResolver(context.fileSystem);
    const resolution = pathResolver.resolve(state.currentPath, targetPath);

    if (!resolution.exists) {
      return {
        output: [format.error(`cd: ${targetPath}: No such file or directory`)],
        error: 'Directory not found',
        exitCode: 1
      };
    }

    if (!resolution.isDirectory) {
      return {
        output: [format.error(`cd: ${targetPath}: Not a directory`)],
        error: 'Not a directory',
        exitCode: 1
      };
    }

    state.currentPath = resolution.path;
    state.pathHistory.push(resolution.path);

    return {
      output: [''],
      exitCode: 0
    };
  }
};

// PWD Command
export const pwdCommand: Command = {
  name: 'pwd',
  description: 'Mostra o diretório atual',
  usage: 'pwd',
  execute: (context: CommandContext): CommandResult => {
    const displayPath = context.currentPath === '/' ? '~' : context.currentPath;
    return {
      output: [displayPath],
      exitCode: 0
    };
  }
};

// Tree Command
export const treeCommand: Command = {
  name: 'tree',
  description: 'Mostra estrutura de diretórios em árvore',
  usage: 'tree [path]',
  examples: [
    'tree',
    'tree projects',
    'tree /skills'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { currentPath, fileSystem, args } = context;
    const targetPath = args.length > 0 ? args[0] : currentPath;
    
    const pathResolver = new PathResolver(fileSystem);
    const resolvedPath = pathResolver.resolvePath(currentPath, targetPath);
    const node = pathResolver.findNode(resolvedPath);

    if (!node) {
      return {
        output: [format.error(`tree: ${targetPath}: No such file or directory`)],
        exitCode: 1
      };
    }

    if (node.type !== 'directory') {
      return {
        output: [format.error(`tree: ${targetPath}: Not a directory`)],
        exitCode: 1
      };
    }

    const output: string[] = [
      '',
      `${colors.bright}${resolvedPath === '/' ? '~' : resolvedPath}${colors.reset}`,
    ];

    let totalDirs = 0;
    let totalFiles = 0;

    const renderTree = (node: FileNode, prefix: string = '', isLast: boolean = true) => {
      if (!node.children) return;

      const entries = Object.entries(node.children);
      entries.forEach(([name, child], index) => {
        const isLastEntry = index === entries.length - 1;
        const connector = isLastEntry ? '└── ' : '├── ';
        const icon = getFileIcon(child);
        const colored = colorizeFileName(child);
        
        output.push(`${prefix}${connector}${icon} ${colored}`);
        
        if (child.type === 'directory') {
          totalDirs++;
          const newPrefix = prefix + (isLastEntry ? '    ' : '│   ');
          renderTree(child, newPrefix, isLastEntry);
        } else {
          totalFiles++;
        }
      });
    };

    renderTree(node);
    
    output.push('');
    output.push(`${totalDirs} directories, ${totalFiles} files`);
    output.push('');

    return {
      output,
      exitCode: 0
    };
  }
};
