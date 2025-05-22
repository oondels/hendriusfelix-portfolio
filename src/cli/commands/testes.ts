import { Directory, File } from './models/FileSystem';
import { FileSystemManager } from './models/FileSystemManager';
import { Terminal } from './models/Terminal';
import { CommandRegistry } from './models/Command';
import { Command } from './models/Command';
import { loadCommands } from "./commands"
import readline from "node:readline"

const manager = new FileSystemManager();
const root = manager.load() as Directory

const terminal = new Terminal(root);
const registry = new CommandRegistry()
loadCommands(registry);

function run(input: string) {
  const [cmd, ...args] = input.trim().split(' ');
  const command = registry.get(cmd);
  if (command) command(args, terminal);
  else console.log(`Comando não encontrado: ${cmd}`);
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question('> ', (input) => {
    if (input.trim() === 'exit') {
      rl.close();
      return;
    }

    run(input); // executa o comando digitado
    prompt();   // chama de novo para continuar o terminal
  });
}

prompt();
