/**
 * Terminal Composable - State Management
 * Gerenciamento de estado do terminal
 */

import { ref, computed, watch } from 'vue';
import { TerminalState, HistoryEntry } from '../types/terminal.types';
import { portfolioFileSystem } from '../filesystem/structure';
import { PathResolver } from '../filesystem/resolver';
import { populateFileSystem } from '../utils';

const STORAGE_KEY = 'terminal-state';

// Estado global do terminal
const terminalState = ref<TerminalState>({
  currentPath: '/',
  pathHistory: ['/'],
  commandHistory: [],
  fileSystem: populateFileSystem(portfolioFileSystem),
  environment: {
    USER: 'hendrius',
    HOST: 'portfolio',
    HOME: '/',
    SHELL: '/bin/bash',
    TERM: 'xterm-256color',
  }
});

const historyEntries = ref<HistoryEntry[]>([]);
const pathResolver = new PathResolver(terminalState.value.fileSystem);

export function useTerminalState() {
  // Computed properties
  const prompt = computed(() => {
    const { USER, HOST } = terminalState.value.environment;
    const path = terminalState.value.currentPath === '/' ? '~' : terminalState.value.currentPath;
    return `${USER}@${HOST}:${path}$ `;
  });

  const currentDirectory = computed(() => {
    return pathResolver.findNode(terminalState.value.currentPath);
  });

  // Methods
  const changeDirectory = (path: string): boolean => {
    const resolution = pathResolver.resolve(terminalState.value.currentPath, path);
    
    if (!resolution.exists) {
      return false;
    }

    if (!resolution.isDirectory) {
      return false;
    }

    terminalState.value.currentPath = resolution.path;
    terminalState.value.pathHistory.push(resolution.path);
    
    return true;
  };

  const addToHistory = (entry: HistoryEntry) => {
    historyEntries.value.push({
      ...entry,
      timestamp: Date.now()
    });
    
    terminalState.value.commandHistory.push(entry.command);
  };

  const clearHistory = () => {
    historyEntries.value = [];
  };

  const getCommandHistory = () => {
    return [...terminalState.value.commandHistory];
  };

  const goBack = (): boolean => {
    if (terminalState.value.pathHistory.length > 1) {
      terminalState.value.pathHistory.pop();
      const previous = terminalState.value.pathHistory[terminalState.value.pathHistory.length - 1];
      terminalState.value.currentPath = previous;
      return true;
    }
    return false;
  };

  const reset = () => {
    terminalState.value.currentPath = '/';
    terminalState.value.pathHistory = ['/'];
    terminalState.value.commandHistory = [];
    historyEntries.value = [];
  };

  const saveState = () => {
    try {
      const stateToSave = {
        currentPath: terminalState.value.currentPath,
        pathHistory: terminalState.value.pathHistory,
        commandHistory: terminalState.value.commandHistory,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save terminal state:', e);
    }
  };

  const loadState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        terminalState.value.currentPath = parsed.currentPath || '/';
        terminalState.value.pathHistory = parsed.pathHistory || ['/'];
        terminalState.value.commandHistory = parsed.commandHistory || [];
      }
    } catch (e) {
      console.warn('Failed to load terminal state:', e);
    }
  };

  // Auto-save on state changes
  watch(
    () => [terminalState.value.currentPath, terminalState.value.commandHistory.length],
    () => {
      saveState();
    }
  );

  return {
    // State
    state: terminalState,
    history: historyEntries,
    resolver: pathResolver,
    
    // Computed
    prompt,
    currentDirectory,
    
    // Methods
    changeDirectory,
    addToHistory,
    clearHistory,
    getCommandHistory,
    goBack,
    reset,
    saveState,
    loadState,
  };
}
