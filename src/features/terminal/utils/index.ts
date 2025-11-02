/**
 * Terminal Utilities
 * Funções auxiliares para o terminal
 */

import { FileNode } from '../types/terminal.types';
import { getFileContent } from '../filesystem/content';

/**
 * Popula o conteúdo dos arquivos na estrutura
 */
export function populateFileSystem(root: FileNode): FileNode {
  const populate = (node: FileNode, currentPath: string = ''): void => {
    if (node.type === 'file') {
      const path = currentPath.replace(/^\//, '');
      const content = getFileContent(path);
      if (content !== undefined) {
        node.content = content;
      }
    } else if (node.type === 'directory' && node.children) {
      for (const [name, child] of Object.entries(node.children)) {
        const childPath = currentPath + '/' + name;
        populate(child, childPath);
      }
    }
  };

  populate(root, '');
  return root;
}

/**
 * Formata o tamanho de arquivo para exibição
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)}${units[unitIndex]}`;
}

/**
 * Formata permissões Unix
 */
export function formatPermissions(permissions: string): string {
  return permissions || '-rw-r--r--';
}

/**
 * Formata data modificação
 */
export function formatDate(date?: string): string {
  if (!date) {
    return new Date().toLocaleDateString('pt-BR', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return new Date(date).toLocaleDateString('pt-BR', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Colore o nome do arquivo baseado no tipo
 */
export function colorizeFileName(node: FileNode): string {
  if (node.type === 'directory') {
    return `\x1b[34m${node.name}/\x1b[0m`; // Azul
  }
  
  const ext = node.name.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'md':
    case 'txt':
      return `\x1b[37m${node.name}\x1b[0m`; // Branco
    case 'json':
      return `\x1b[33m${node.name}\x1b[0m`; // Amarelo
    case 'conf':
    case 'config':
      return `\x1b[36m${node.name}\x1b[0m`; // Ciano
    default:
      return node.name;
  }
}

/**
 * Obtém ícone para tipo de arquivo
 */
export function getFileIcon(node: FileNode): string {
  if (node.type === 'directory') {
    return '📁';
  }
  
  const ext = node.name.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'md':
      return '📝';
    case 'txt':
      return '📄';
    case 'json':
      return '📋';
    case 'conf':
    case 'config':
      return '⚙️';
    default:
      return '📄';
  }
}

/**
 * Cria uma linha de separação
 */
export function separator(char: string = '─', length: number = 60): string {
  return char.repeat(length);
}

/**
 * Centraliza texto
 */
export function centerText(text: string, width: number = 60): string {
  const padding = Math.max(0, Math.floor((width - text.length) / 2));
  return ' '.repeat(padding) + text;
}

/**
 * Formata output com cores ANSI
 */
export const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Background colors
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

/**
 * Helpers de formatação com cores
 */
export const format = {
  error: (text: string) => `${colors.red}${text}${colors.reset}`,
  success: (text: string) => `${colors.green}${text}${colors.reset}`,
  warning: (text: string) => `${colors.yellow}${text}${colors.reset}`,
  info: (text: string) => `${colors.cyan}${text}${colors.reset}`,
  highlight: (text: string) => `${colors.bright}${text}${colors.reset}`,
  dim: (text: string) => `${colors.dim}${text}${colors.reset}`,
};

/**
 * Parse argumentos de comando
 */
export function parseArgs(input: string): { command: string; args: string[]; flags: Record<string, boolean | string> } {
  const parts = input.trim().split(/\s+/);
  const command = parts[0] || '';
  const args: string[] = [];
  const flags: Record<string, boolean | string> = {};

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    if (part.startsWith('--')) {
      // Long flag (--flag ou --flag=value)
      const [key, value] = part.slice(2).split('=');
      flags[key] = value || true;
    } else if (part.startsWith('-')) {
      // Short flag (-f ou -abc)
      const flagChars = part.slice(1);
      for (const char of flagChars) {
        flags[char] = true;
      }
    } else {
      args.push(part);
    }
  }

  return { command, args, flags };
}

/**
 * Verifica se é um comando válido
 */
export function isValidCommand(command: string, registry: string[]): boolean {
  return registry.includes(command);
}
