/**
 * Content Commands
 * Comandos de visualização: cat, less, head, tail
 */

import { Command, CommandContext, CommandResult } from '../types/terminal.types';
import { format, colors, separator } from '../utils';
import { getFileContent } from '../filesystem/content';
import { PathResolver } from '../filesystem/resolver';

// CAT Command
export const catCommand: Command = {
  name: 'cat',
  description: 'Exibe o conteúdo de um arquivo',
  usage: 'cat <arquivo>',
  examples: [
    'cat README.md',
    'cat about/experience.txt',
    'cat /projects/iot/list.json'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { currentPath, fileSystem, args } = context;

    if (args.length === 0) {
      return {
        output: [format.error('cat: missing file operand')],
        error: 'Missing argument',
        exitCode: 1
      };
    }

    const filePath = args[0];
    const pathResolver = new PathResolver(fileSystem);
    const resolution = pathResolver.resolve(currentPath, filePath);

    if (!resolution.exists) {
      return {
        output: [format.error(`cat: ${filePath}: No such file or directory`)],
        error: 'File not found',
        exitCode: 1
      };
    }

    if (resolution.isDirectory) {
      return {
        output: [format.error(`cat: ${filePath}: Is a directory`)],
        error: 'Is a directory',
        exitCode: 1
      };
    }

    const node = resolution.node;
    if (!node || !node.content) {
      return {
        output: [''],
        exitCode: 0
      };
    }

    // Exibir conteúdo
    const lines = node.content.split('\n');
    return {
      output: ['', ...lines, ''],
      exitCode: 0
    };
  }
};

// LESS Command (simplificado, sem paginação real)
export const lessCommand: Command = {
  name: 'less',
  description: 'Visualiza arquivo com paginação',
  usage: 'less <arquivo>',
  examples: [
    'less README.md',
    'less about/experience.txt'
  ],
  execute: (context: CommandContext): CommandResult => {
    // Por enquanto, comporta-se como cat
    // Em uma implementação completa, seria interativo
    const result = catCommand.execute(context) as CommandResult;
    
    if (result.exitCode === 0 && result.output.length > 0) {
      return {
        output: [
          '',
          `${colors.dim}(Modo less - Use 'cat' para visualização completa)${colors.reset}`,
          ...result.output
        ],
        exitCode: 0
      };
    }
    
    return result;
  }
};

// HEAD Command
export const headCommand: Command = {
  name: 'head',
  description: 'Mostra as primeiras linhas de um arquivo',
  usage: 'head <arquivo> [-n NUM]',
  examples: [
    'head README.md',
    'head -n 5 about/experience.txt'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { currentPath, fileSystem, args } = context;

    if (args.length === 0) {
      return {
        output: [format.error('head: missing file operand')],
        error: 'Missing argument',
        exitCode: 1
      };
    }

    // Parse flags
    let numLines = 10; // default
    let filePath = args[0];
    
    if (args.includes('-n') && args.length > 2) {
      const nIndex = args.indexOf('-n');
      numLines = parseInt(args[nIndex + 1]) || 10;
      filePath = args.filter((_, i) => i !== nIndex && i !== nIndex + 1)[0];
    }

    const pathResolver = new PathResolver(fileSystem);
    const resolution = pathResolver.resolve(currentPath, filePath);

    if (!resolution.exists || resolution.isDirectory) {
      return {
        output: [format.error(`head: ${filePath}: No such file or directory`)],
        exitCode: 1
      };
    }

    const node = resolution.node;
    if (!node || !node.content) {
      return {
        output: [''],
        exitCode: 0
      };
    }

    const lines = node.content.split('\n').slice(0, numLines);
    return {
      output: ['', ...lines, ''],
      exitCode: 0
    };
  }
};

// TAIL Command
export const tailCommand: Command = {
  name: 'tail',
  description: 'Mostra as últimas linhas de um arquivo',
  usage: 'tail <arquivo> [-n NUM]',
  examples: [
    'tail README.md',
    'tail -n 5 about/experience.txt'
  ],
  execute: (context: CommandContext): CommandResult => {
    const { currentPath, fileSystem, args } = context;

    if (args.length === 0) {
      return {
        output: [format.error('tail: missing file operand')],
        error: 'Missing argument',
        exitCode: 1
      };
    }

    // Parse flags
    let numLines = 10; // default
    let filePath = args[0];
    
    if (args.includes('-n') && args.length > 2) {
      const nIndex = args.indexOf('-n');
      numLines = parseInt(args[nIndex + 1]) || 10;
      filePath = args.filter((_, i) => i !== nIndex && i !== nIndex + 1)[0];
    }

    const pathResolver = new PathResolver(fileSystem);
    const resolution = pathResolver.resolve(currentPath, filePath);

    if (!resolution.exists || resolution.isDirectory) {
      return {
        output: [format.error(`tail: ${filePath}: No such file or directory`)],
        exitCode: 1
      };
    }

    const node = resolution.node;
    if (!node || !node.content) {
      return {
        output: [''],
        exitCode: 0
      };
    }

    const allLines = node.content.split('\n');
    const lines = allLines.slice(-numLines);
    return {
      output: ['', ...lines, ''],
      exitCode: 0
    };
  }
};
