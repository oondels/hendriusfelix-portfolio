/**
 * Path Resolver
 * Sistema de resolução de caminhos para o terminal
 */

import { FileNode, PathResolution } from '../types/terminal.types';

export class PathResolver {
  private fileSystem: FileNode;

  constructor(fileSystem: FileNode) {
    this.fileSystem = fileSystem;
  }

  /**
   * Normaliza um caminho removendo . e .. e múltiplas barras
   */
  normalizePath(path: string): string {
    const parts = path.split('/').filter(p => p && p !== '.');
    const normalized: string[] = [];

    for (const part of parts) {
      if (part === '..') {
        if (normalized.length > 0 && normalized[normalized.length - 1] !== '..') {
          normalized.pop();
        }
      } else {
        normalized.push(part);
      }
    }

    return '/' + normalized.join('/');
  }

  /**
   * Resolve um caminho relativo para absoluto
   */
  resolvePath(currentPath: string, targetPath: string): string {
    // Se o caminho é absoluto
    if (targetPath.startsWith('/')) {
      return this.normalizePath(targetPath);
    }

    // Se é o home (~)
    if (targetPath === '~' || targetPath.startsWith('~/')) {
      return this.normalizePath(targetPath.replace('~', ''));
    }

    // Caminho relativo
    const base = currentPath === '/' ? '' : currentPath;
    return this.normalizePath(base + '/' + targetPath);
  }

  /**
   * Encontra um nó no sistema de arquivos dado um caminho
   */
  findNode(path: string): FileNode | null {
    const normalizedPath = this.normalizePath(path);
    
    // Root
    if (normalizedPath === '/' || normalizedPath === '') {
      return this.fileSystem;
    }

    const parts = normalizedPath.split('/').filter(p => p);
    let current: FileNode | null = this.fileSystem;

    for (const part of parts) {
      if (!current || current.type !== 'directory' || !current.children) {
        return null;
      }

      current = current.children[part] || null;
      if (!current) {
        return null;
      }
    }

    return current;
  }

  /**
   * Resolve um caminho e retorna informações detalhadas
   */
  resolve(currentPath: string, targetPath: string): PathResolution {
    const absolutePath = this.resolvePath(currentPath, targetPath);
    const node = this.findNode(absolutePath);

    return {
      exists: node !== null,
      node: node || undefined,
      path: absolutePath,
      isDirectory: node?.type === 'directory',
      isFile: node?.type === 'file',
    };
  }

  /**
   * Lista todos os itens em um diretório
   */
  listDirectory(path: string): FileNode[] | null {
    const node = this.findNode(path);
    
    if (!node || node.type !== 'directory' || !node.children) {
      return null;
    }

    return Object.values(node.children);
  }

  /**
   * Obtém o nome base de um caminho (último segmento)
   */
  basename(path: string): string {
    const normalized = this.normalizePath(path);
    const parts = normalized.split('/').filter(p => p);
    return parts.length > 0 ? parts[parts.length - 1] : '/';
  }

  /**
   * Obtém o diretório pai de um caminho
   */
  dirname(path: string): string {
    const normalized = this.normalizePath(path);
    const parts = normalized.split('/').filter(p => p);
    
    if (parts.length <= 1) {
      return '/';
    }

    return '/' + parts.slice(0, -1).join('/');
  }

  /**
   * Verifica se um caminho é válido
   */
  isValidPath(currentPath: string, targetPath: string): boolean {
    const resolution = this.resolve(currentPath, targetPath);
    return resolution.exists;
  }

  /**
   * Busca arquivos por padrão (suporta * como wildcard)
   */
  findFiles(pattern: string, searchPath: string = '/'): FileNode[] {
    const results: FileNode[] = [];
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');

    const search = (node: FileNode, currentPath: string) => {
      if (node.type === 'file' && regex.test(node.name)) {
        results.push(node);
      }

      if (node.type === 'directory' && node.children) {
        for (const [name, child] of Object.entries(node.children)) {
          search(child, currentPath + '/' + name);
        }
      }
    };

    const startNode = this.findNode(searchPath);
    if (startNode) {
      search(startNode, searchPath);
    }

    return results;
  }

  /**
   * Constrói o caminho completo de um nó
   */
  getFullPath(node: FileNode, startPath: string = '/'): string | null {
    // Esta é uma implementação simplificada
    // Em um caso real, você precisaria manter referências pai
    return null;
  }

  /**
   * Auto-complete de caminhos
   */
  autocomplete(currentPath: string, partial: string): string[] {
    const parts = partial.split('/');
    const lastPart = parts[parts.length - 1];
    const pathWithoutLast = parts.slice(0, -1).join('/') || '.';

    const targetPath = this.resolvePath(currentPath, pathWithoutLast);
    const items = this.listDirectory(targetPath);

    if (!items) {
      return [];
    }

    return items
      .filter(item => item.name.startsWith(lastPart))
      .map(item => {
        const suffix = item.type === 'directory' ? '/' : '';
        return item.name + suffix;
      });
  }
}
