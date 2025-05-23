import { Command } from './models/Command';
import { Terminal } from './models/Terminal';
import { CommandRegistry } from './models/Command';
import { Directory, File } from './models/FileSystem';

function navegateDirectories(startDir: Directory, parts: Array<string>, terminal: Terminal, searchFile: boolean = false): Directory {
  let current: Directory = startDir;

  for (const part of parts) {
    if (part === '~') {
      current = terminal.getRoot()
      continue
    }

    if (part === '..') {
      current = current?.getParent() as Directory;
      continue;
    }

    const next = current.getChild(part);
    if (!next || !next.isDirectory()) {
      terminal.print(`Diretório inválido: ${part}`);
    }

    current = next as Directory;
  }
  return current;
}

export const registry = new CommandRegistry()
export class WhoamiCommand extends Command {
  constructor() {
    super("whoami", "Exibe informações do usuário")
  }

  execute(args: string[], terminal: Terminal) {
    terminal.print("Hendrius Félix – Eng. de Software | CLI Portfolio")
    return { command: this.name, output: ["Hendrius Félix – Eng. de Software | CLI Portfolio"] }
  }
}

export class lsCommand extends Command {
  constructor() {
    super("ls", "Exibe Diretórios e arquivos do diretorio atual.")
  }

  execute(args: string[], terminal: Terminal) {
    if (args.length === 0) {
      const dir = terminal.getCurrentDirectory();
      // terminal.print(dir.list().join(" "))
      return { command: this.name, output: [dir.list().join(" ")] };
    }

    const arg = args[0];
    // Check if starts from root dir or current directory
    const startDir = arg.startsWith('/') ? terminal.getRoot() : terminal.getCurrentDirectory();
    // Splits the query arg
    const parts = arg.split('/').filter(Boolean);

    const current = navegateDirectories(startDir, parts, terminal)
    // terminal.print(current.list().join(" "))
    return {
      command: this.name,
      output: [current.list().join(" ")]
    }
  }
}

export class cdCommand extends Command {
  constructor() {
    super("cd", "Transita entre diretórios.")
  }

  execute(args: string[], terminal: Terminal) {
    if (args.length === 0) {
      return { command: this.name, output: ['Uso: cd <pasta>'] };
    }

    const arg = args[0];
    // Check if starts from root dir or current directory
    const startDir = arg.startsWith('/') ? terminal.getRoot() : terminal.getCurrentDirectory();
    // Splits the query arg
    const parts = arg.split('/').filter(Boolean);

    const current = navegateDirectories(startDir, parts, terminal)
    if (current instanceof Directory) {
      terminal.changeDirectory(current)
      // terminal.print(`Mudando para ${current.name}`)
      return {
        command: this.name,
        output: [`Mudando para ${current.name}`]
      }
    }

  }
}

// ! FIX: fix this command
export class catCommand extends Command {
  constructor() {
    super("cat", "Exibe o conteúdo do arquivo.")
  }

  execute(args: string[], terminal: Terminal) {
    const arg = args[0];

    const currentDir = terminal.getCurrentDirectory()
    const isFile = currentDir.children.filter(c => c instanceof File)

    if (args.length !== 1 || currentDir.children.length <= 0 || !isFile.length) {
      // terminal.print("Uso: cat <file>")
      return { command: this.name, output: ["Uso: cat <file>"] }
    }
    const searchedFile = isFile.filter(file => file.name === arg)
    if (!searchedFile.length) {
      terminal.print('File not found.')
      return { command: this.name, output: ['File not found.'] }
    }

    // console.log(searchedFile);
    return { command: this.name, output: [searchedFile[0].content] }
  }
}

// TODO: Enhance pwd command to use navegateDirectories
export class pwdCommand extends Command {
  constructor() {
    super("pwd", "Exibe o path completo até o diretório atual.")
  }

  execute(args: string[], terminal: Terminal) {
    const currentDir = terminal.getCurrentDirectory()
    // terminal.print(currentDir.pwd)
    return {
      command: this.name,
      output: [currentDir.pwd]
    }
  }
}

export class helpCommand extends Command {
  constructor() {
    super("help", "Print the commands' description.")
  }

  execute(args: string[], terminal: Terminal) {
    const commandName = args[0]
    const command = registry.get(commandName)

    if (!command) {
      terminal.print("Comando não encontrado!")
      return { command: this.name, output: ["Comando não encontrado!"] }
    }

    if (command instanceof Command) {
      terminal.print(`${command.name}: ${command?.description}`)
      return { command: this.name, output: [`${command.name}: ${command?.description}`] }
    }
  }
}

registry.register(new WhoamiCommand())
registry.register(new lsCommand())
registry.register(new cdCommand())
registry.register(new catCommand())
registry.register(new pwdCommand())
registry.register(new helpCommand())