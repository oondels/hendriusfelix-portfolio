/**
 * Terminal Types and Interfaces
 * Tipos e interfaces para o sistema de terminal interativo
 */

export type FileType = 'file' | 'directory';

export interface FileMetadata {
  description?: string;
  language?: string;
  category?: string;
  size?: number;
  modified?: string;
  permissions?: string;
}

export interface FileNode {
  type: FileType;
  name: string;
  content?: string;
  children?: Record<string, FileNode>;
  metadata?: FileMetadata;
}

export interface TerminalState {
  currentPath: string;
  pathHistory: string[];
  commandHistory: string[];
  fileSystem: FileNode;
  environment: Record<string, string>;
}

export interface CommandContext {
  currentPath: string;
  fileSystem: FileNode;
  state: TerminalState;
  args: string[];
}

export interface CommandResult {
  output: string[];
  error?: string;
  exitCode: number;
}

export interface Command {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
  examples?: string[];
  execute: (context: CommandContext) => Promise<CommandResult> | CommandResult;
}

export interface CommandRegistry {
  [key: string]: Command;
}

export interface HistoryEntry {
  command: string;
  output: string[];
  timestamp?: number;
  exitCode?: number;
}

export interface AutoCompleteResult {
  suggestions: string[];
  commonPrefix: string;
}

export interface PathResolution {
  exists: boolean;
  node?: FileNode;
  path: string;
  isDirectory: boolean;
  isFile: boolean;
}
