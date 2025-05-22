import { Terminal } from "./Terminal";

export abstract class Command {
  constructor(public readonly name: string, public readonly description = "") { }

  abstract execute(args: string[], terminal: Terminal): void
}

export class CommandRegistry {
  private commands = new Map<string, Command>();

  register(command: Command): void {
    this.commands.set(command.name, command);
  }

  get(name: string): Command | undefined {
    return this.commands.get(name);
  }

  list(): Command[] {
    return [...this.commands.values()];
  }
}