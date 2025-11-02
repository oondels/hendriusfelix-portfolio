/**
 * Command History Composable
 * Gerencia histórico de comandos com navegação e persistência
 */

import { ref, watch } from 'vue';

const HISTORY_STORAGE_KEY = 'terminal-command-history';
const MAX_HISTORY_SIZE = 1000;

export function useCommandHistory() {
  const commandHistory = ref<string[]>([]);
  const historyIndex = ref(-1);
  const temporaryCommand = ref('');

  /**
   * Carrega histórico do localStorage
   */
  function loadHistory(): void {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        commandHistory.value = Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.warn('Failed to load command history:', error);
      commandHistory.value = [];
    }
  }

  /**
   * Salva histórico no localStorage
   */
  function saveHistory(): void {
    try {
      localStorage.setItem(
        HISTORY_STORAGE_KEY, 
        JSON.stringify(commandHistory.value)
      );
    } catch (error) {
      console.warn('Failed to save command history:', error);
    }
  }

  /**
   * Adiciona comando ao histórico
   */
  function addCommand(command: string): void {
    const trimmed = command.trim();
    
    // Não adiciona comandos vazios
    if (!trimmed) {
      return;
    }

    // Remove duplicata se o último comando for igual
    if (commandHistory.value.length > 0 && 
        commandHistory.value[commandHistory.value.length - 1] === trimmed) {
      return;
    }

    // Adiciona ao histórico
    commandHistory.value.push(trimmed);

    // Limita o tamanho do histórico
    if (commandHistory.value.length > MAX_HISTORY_SIZE) {
      commandHistory.value = commandHistory.value.slice(-MAX_HISTORY_SIZE);
    }

    // Reset navigation
    historyIndex.value = -1;
    temporaryCommand.value = '';

    // Salva automaticamente
    saveHistory();
  }

  /**
   * Navega para o comando anterior
   */
  function navigatePrevious(currentInput: string): string {
    if (commandHistory.value.length === 0) {
      return currentInput;
    }

    // Se está começando a navegar, salva o comando atual
    if (historyIndex.value === -1) {
      temporaryCommand.value = currentInput;
      historyIndex.value = commandHistory.value.length - 1;
    } else if (historyIndex.value > 0) {
      historyIndex.value--;
    }

    return commandHistory.value[historyIndex.value] || currentInput;
  }

  /**
   * Navega para o próximo comando
   */
  function navigateNext(currentInput: string): string {
    if (historyIndex.value === -1) {
      return currentInput;
    }

    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++;
      return commandHistory.value[historyIndex.value];
    } else {
      // Volta para o comando temporário
      historyIndex.value = -1;
      return temporaryCommand.value;
    }
  }

  /**
   * Reset da navegação (chamado após executar comando)
   */
  function resetNavigation(): void {
    historyIndex.value = -1;
    temporaryCommand.value = '';
  }

  /**
   * Busca no histórico (para implementação futura de Ctrl+R)
   */
  function searchHistory(query: string): string[] {
    if (!query) {
      return commandHistory.value;
    }

    const lowerQuery = query.toLowerCase();
    return commandHistory.value.filter(cmd => 
      cmd.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Limpa todo o histórico
   */
  function clearHistory(): void {
    commandHistory.value = [];
    historyIndex.value = -1;
    temporaryCommand.value = '';
    saveHistory();
  }

  /**
   * Obtém estatísticas do histórico
   */
  function getStats() {
    const commandCounts: Record<string, number> = {};
    
    commandHistory.value.forEach(cmd => {
      const baseCommand = cmd.split(' ')[0];
      commandCounts[baseCommand] = (commandCounts[baseCommand] || 0) + 1;
    });

    const sortedCommands = Object.entries(commandCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      total: commandHistory.value.length,
      unique: Object.keys(commandCounts).length,
      mostUsed: sortedCommands,
    };
  }

  /**
   * Obtém últimos N comandos
   */
  function getRecent(n: number = 10): string[] {
    return commandHistory.value.slice(-n).reverse();
  }

  // Auto-save quando o histórico muda
  watch(commandHistory, saveHistory, { deep: true });

  // Carrega histórico ao inicializar
  loadHistory();

  return {
    // State
    commandHistory,
    historyIndex,
    
    // Methods
    addCommand,
    navigatePrevious,
    navigateNext,
    resetNavigation,
    searchHistory,
    clearHistory,
    getStats,
    getRecent,
    loadHistory,
    saveHistory,
  };
}
