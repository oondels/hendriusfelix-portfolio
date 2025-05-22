import { Command } from './models/Command';
import { Terminal } from './models/Terminal';
import { CommandRegistry } from './models/Command';
import { Directory, File } from './models/FileSystem';

export class WhoamiCommand extends Command {
  constructor() {
    super("whoami", "Exibe informações do usuário")
  }

  execute(args: string[], terminal: Terminal) {
    terminal.print("Hendrius Félix – Eng. de Software | CLI Portfolio")
  }
}

export class lsCommand extends Command {
  constructor() {
    super("ls", "Exibe Diretórios e arquivos do diretorio atual.")
  }

  execute(args: string[], terminal: Terminal) {
    const dir = terminal.getCurrentDirectory();
    terminal.print(dir.list().join(" "))
  }
}

export class cdCommand extends Command {
  constructor() {
    super("cd", "Transita entre diretórios.")
  }

  execute(args: string[], terminal: Terminal) {
    if (args.length === 0) {
      terminal.print('Uso: cd <pasta>')
      return 'Uso: cd <pasta>'
    }

    if (args[0] === '..') {
      const parent = terminal.getCurrentDirectory().getParent();
      if (parent) {
        terminal.changeDirectory(parent);
        return 'Diretório alterado para: ' + parent.name;
      } else {
        return 'Já está no diretório raiz';
      }
    }

    const target = terminal.getCurrentDirectory().getChild(args[0]);
    if (!target?.isDirectory()) {
      terminal.print("Diretório inválido")
      return ['Diretório inválido'];
    }
    
    terminal.changeDirectory(target as Directory);
  }
}

export class catCommand extends Command {
  constructor() {
    super("cat", "Exibe o conteúdo do arquivo.")
  }

  execute(args: string[], terminal: Terminal): string | void {
    const currentDir = terminal.getCurrentDirectory()
    const isFile = currentDir.children.filter(c => c instanceof File)

    if (args.length !== 1 || currentDir.children.length <= 0 || !isFile.length) {
      terminal.print("Uso: cat <file>")
      return 'Uso: cat <file>'
    }
    const arg = args[0]

    const searchedFile = isFile.filter(file => file.name === arg)
    if (!searchedFile.length) {
      terminal.print('File not found.')
      return 'File not found.'
    }

    console.log(searchedFile);
    // return searchedFile
  }
}

// Registering commands
export const registry = new CommandRegistry()
registry.register(new WhoamiCommand())
registry.register(new lsCommand())
registry.register(new cdCommand())
registry.register(new catCommand())