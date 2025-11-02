/**
 * Command Executor
 * Executa comandos e retorna resultados
 */

import { CommandContext, CommandResult, HistoryEntry } from '../types/terminal.types';
import { commandRegistry, getCommand } from './index';
import { parseArgs, format } from '../utils';
import { useTerminalState } from '../composables/useTerminalState';

export class CommandExecutor {
  /**
   * Executa um comando
   */
  static async execute(input: string): Promise<HistoryEntry> {
    const trimmed = input.trim();
    
    if (!trimmed) {
      return {
        command: '',
        output: [''],
        exitCode: 0
      };
    }

    const { command, args } = parseArgs(input);
    const { state, resolver } = useTerminalState();

    // Buscar comando no registry
    const cmd = getCommand(command);

    if (!cmd) {
      return {
        command: input,
        output: [
          format.error(`Command not found: ${command}`),
          '',
          `Type ${format.highlight('help')} to see available commands`
        ],
        exitCode: 127
      };
    }

    // Preparar contexto
    const context: CommandContext = {
      currentPath: state.value.currentPath,
      fileSystem: state.value.fileSystem,
      state: state.value,
      args
    };

    try {
      // Executar comando
      const result = await Promise.resolve(cmd.execute(context));
      
      return {
        command: input,
        output: result.output,
        exitCode: result.exitCode
      };
    } catch (error) {
      console.error('Command execution error:', error);
      return {
        command: input,
        output: [
          format.error(`Error executing command: ${command}`),
          format.error(error instanceof Error ? error.message : String(error))
        ],
        exitCode: 1
      };
    }
  }

  /**
   * Verifica se um comando existe
   */
  static commandExists(command: string): boolean {
    return !!getCommand(command);
  }

  /**
   * Obtém sugestões de comandos para auto-complete
   */
  static getSuggestions(partial: string): string[] {
    const lower = partial.toLowerCase();
    return Object.keys(commandRegistry)
      .filter(cmd => cmd.startsWith(lower))
      .sort();
  }

  /**
   * Obtém informações de um comando
   */
  static getCommandInfo(command: string) {
    return getCommand(command);
  }
}
