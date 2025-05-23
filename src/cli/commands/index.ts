import { Directory } from './models/FileSystem';
import { FileSystemManager } from './models/FileSystemManager';
import { Terminal } from './models/Terminal';
import readline from "node:readline"
import { TerminalService } from "./services/TerminalService"
import { registry } from './commands';

const manager = new FileSystemManager();
const root = manager.load() as Directory
const terminal = new Terminal(root);
const terminalService = new TerminalService();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question('hendrius@portfolio > ', async (input) => {
    if (input.trim() === 'exit') {
      rl.close();
      return;
    }
    
    terminalService.runCommand(input, registry, terminal);
    prompt();
  });
}

prompt();
