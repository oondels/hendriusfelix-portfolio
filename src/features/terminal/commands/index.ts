/**
 * Command Registry
 * Registro central de todos os comandos disponíveis
 */

import { CommandRegistry } from '../types/terminal.types';

// System commands
import { helpCommand, clearCommand, exitCommand, historyCommand, whoamiCommand } from './system';

// Navigation commands
import { lsCommand, cdCommand, pwdCommand, treeCommand } from './navigation';

// Content commands
import { catCommand, lessCommand, headCommand, tailCommand } from './content';

// Custom commands
import { portfolioCommand, projectsCommand, skillsCommand, contactCommand, socialCommand, resumeCommand } from './custom';

// Command registry
export const commandRegistry: CommandRegistry = {
  // System
  help: helpCommand,
  '?': helpCommand,
  man: helpCommand,
  clear: clearCommand,
  cls: clearCommand,
  exit: exitCommand,
  quit: exitCommand,
  q: exitCommand,
  history: historyCommand,
  whoami: whoamiCommand,
  
  // Navigation
  ls: lsCommand,
  dir: lsCommand,
  cd: cdCommand,
  pwd: pwdCommand,
  tree: treeCommand,
  
  // Content
  cat: catCommand,
  less: lessCommand,
  head: headCommand,
  tail: tailCommand,
  
  // Custom
  portfolio: portfolioCommand,
  projects: projectsCommand,
  skills: skillsCommand,
  contact: contactCommand,
  social: socialCommand,
  resume: resumeCommand,
};

// Helper para obter comando
export function getCommand(name: string) {
  return commandRegistry[name.toLowerCase()];
}

// Helper para listar todos os comandos
export function getAllCommands() {
  return Object.keys(commandRegistry).filter(key => {
    // Filtrar apenas comandos principais (sem aliases)
    const cmd = commandRegistry[key];
    return cmd.name === key;
  });
}
