import { CommandRegistry } from "../models/Command";
import { Terminal } from "../models/Terminal";
import { Directory } from "../models/FileSystem";

export interface CommandHistory {
  command: string;
  timestamp: Date;
  output: string | Directory | null;
}

export class TerminalService {
  private history: CommandHistory[] = [];

  addToHistory(command: string, output: string | null) {
    this.history.push({ command, timestamp: new Date(), output: output || "" });
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
  }

  updateTerminal(data: any) {
    console.log("\n");

    if (Array.isArray(data)) {

      // data.forEach((response) => {        
      //   console.log("hendrius@portfolio > " + response.command + "\n" + response.output);
      // });
    }
  }

  runCommand(input: string, registry: CommandRegistry, terminal: Terminal) {
    if (input === 'clear') {
      this.clearHistory();
      console.clear()
      return;
    }

    const [cmd, ...args] = input.trim().split(" ");
    const command = registry.get(cmd);

    if (command) {
      command.execute(args, terminal)
    } else {
      console.log(`Comando não encontrado: ${cmd}`);
      this.addToHistory(input, null);
    }
  }
}