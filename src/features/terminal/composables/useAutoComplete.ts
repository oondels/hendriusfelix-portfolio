/**
 * Auto-complete Composable
 * Gerencia auto-complete inteligente para comandos e paths
 */

import { ref } from 'vue';
import { getAllCommands } from '../commands';
import { useTerminalState } from './useTerminalState';
import type { FileNode } from '../types/terminal.types';

export interface AutoCompleteResult {
  completed: string;
  suggestions: string[];
  hasMultipleSuggestions: boolean;
}

export function useAutoComplete() {
  const { state, resolver } = useTerminalState();
  const suggestions = ref<string[]>([]);

  /**
   * Autocomplete para comandos
   */
  function completeCommand(partial: string): string[] {
    const commands = getAllCommands();
    const lowerPartial = partial.toLowerCase();
    
    return Object.keys(commands)
      .filter(cmd => cmd.startsWith(lowerPartial))
      .sort();
  }

  /**
   * Autocomplete para paths
   */
  function completePath(partial: string): string[] {
    try {
      // Separar diretório e nome do arquivo
      const lastSlash = partial.lastIndexOf('/');
      let directory = '';
      let filePrefix = partial;

      if (lastSlash !== -1) {
        directory = partial.substring(0, lastSlash + 1);
        filePrefix = partial.substring(lastSlash + 1);
      }

      // Resolver o diretório base
      const basePath = directory || state.value.currentPath;
      const resolved = resolver.resolve(state.value.currentPath, basePath);

      if (!resolved.exists || !resolved.isDirectory) {
        return [];
      }

      // Listar itens no diretório
      const items = resolver.listDirectory(resolved.path);
      
      if (!items) {
        return [];
      }
      
      // Filtrar por prefixo
      const matches = items
        .filter((item: FileNode) => item.name.startsWith(filePrefix))
        .map((item: FileNode) => {
          const fullPath = directory + item.name;
          return item.type === 'directory' ? fullPath + '/' : fullPath;
        })
        .sort();

      return matches;
    } catch (error) {
      return [];
    }
  }

  /**
   * Encontrar o prefixo comum entre múltiplas sugestões
   */
  function findCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];

    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (strings[i].indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (prefix === '') return '';
      }
    }
    return prefix;
  }

  /**
   * Autocomplete principal - decide se é comando ou path
   */
  function autoComplete(input: string): AutoCompleteResult {
    const parts = input.trim().split(/\s+/);
    
    // Se está vazio ou é apenas um comando parcial
    if (parts.length === 0 || input === '') {
      return {
        completed: input,
        suggestions: [],
        hasMultipleSuggestions: false
      };
    }

    // Primeiro token = comando
    if (parts.length === 1 && !input.endsWith(' ')) {
      const commandSuggestions = completeCommand(parts[0]);
      
      if (commandSuggestions.length === 0) {
        return {
          completed: input,
          suggestions: [],
          hasMultipleSuggestions: false
        };
      }

      if (commandSuggestions.length === 1) {
        return {
          completed: commandSuggestions[0] + ' ',
          suggestions: [],
          hasMultipleSuggestions: false
        };
      }

      // Múltiplas sugestões - completa até o prefixo comum
      const commonPrefix = findCommonPrefix(commandSuggestions);
      return {
        completed: commonPrefix,
        suggestions: commandSuggestions,
        hasMultipleSuggestions: true
      };
    }

    // Argumentos = paths (para comandos que usam paths)
    const command = parts[0];
    const pathCommands = ['cd', 'ls', 'cat', 'less', 'head', 'tail', 'tree'];
    
    if (pathCommands.includes(command)) {
      // Pegar o último argumento (o path sendo completado)
      const lastArg = parts[parts.length - 1];
      const pathSuggestions = completePath(lastArg);

      if (pathSuggestions.length === 0) {
        return {
          completed: input,
          suggestions: [],
          hasMultipleSuggestions: false
        };
      }

      if (pathSuggestions.length === 1) {
        // Substituir apenas o último argumento
        const beforeLastArg = parts.slice(0, -1).join(' ');
        const completed = beforeLastArg + (beforeLastArg ? ' ' : '') + pathSuggestions[0];
        return {
          completed,
          suggestions: [],
          hasMultipleSuggestions: false
        };
      }

      // Múltiplas sugestões - completa até o prefixo comum
      const commonPrefix = findCommonPrefix(pathSuggestions);
      const beforeLastArg = parts.slice(0, -1).join(' ');
      const completed = beforeLastArg + (beforeLastArg ? ' ' : '') + commonPrefix;
      
      return {
        completed,
        suggestions: pathSuggestions,
        hasMultipleSuggestions: true
      };
    }

    // Para outros comandos, não faz autocomplete de argumentos
    return {
      completed: input,
      suggestions: [],
      hasMultipleSuggestions: false
    };
  }

  /**
   * Sugestões contextuais - mostra todas as opções disponíveis
   */
  function getContextualSuggestions(input: string): string[] {
    const trimmed = input.trim();
    
    // Se vazio, mostrar comandos populares
    if (!trimmed) {
      return ['ls', 'cd', 'pwd', 'help', 'portfolio', 'projects', 'skills'];
    }

    const parts = trimmed.split(/\s+/);
    
    // Sugestões de comandos
    if (parts.length === 1 && !input.endsWith(' ')) {
      return completeCommand(parts[0]);
    }

    // Sugestões de paths
    const command = parts[0];
    const pathCommands = ['cd', 'ls', 'cat', 'less', 'head', 'tail', 'tree'];
    
    if (pathCommands.includes(command)) {
      const lastArg = parts[parts.length - 1];
      return completePath(lastArg);
    }

    // Sugestões de categorias para comandos específicos
    if (command === 'projects') {
      return ['web', 'mobile', 'api', 'all'];
    }

    if (command === 'skills') {
      return ['frontend', 'backend', 'devops', 'all'];
    }

    return [];
  }

  return {
    suggestions,
    autoComplete,
    completeCommand,
    completePath,
    getContextualSuggestions
  };
}
