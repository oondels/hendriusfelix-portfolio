import { Directory, File } from './FileSystem';
import { FileSystemManager } from './FileSystemManager';
import { Terminal } from './models/Terminal';
import { CommandRegistry } from './models/Command';
import { Command } from './models/Command';

const manager = new FileSystemManager();
const dirs = manager.load() as Directory

const terminal = new Terminal(dirs);
console.log(terminal.getCurrentDirectory());

console.log(dirs.getChild('src'));




// const root = new Directory('client');

// const src = new Directory('src')
// root.add(src)
// // Arquivos diretos em src
// src.add(new File('main.ts', ''));
// src.add(new File('App.vue', ''));

// // Pasta cli/commands
// const cli = new Directory('cli');
// src.add(cli)
// const commands = new Directory('commands');
// commands.add(new File('FileSystem.ts', ''));
// commands.add(new File('FileSystemManager.ts', ''));
// commands.add(new File('testes.ts', ''));
// cli.add(commands);

// // Pasta cli/data
// const data = new Directory('data');
// data.add(new File('TerminalShell.vue', ''));
// cli.add(data);

// src.add(cli);

// // Pasta components/sections
// const components = new Directory('components');
// const sections = new Directory('sections');
// sections.add(new File('AboutSection.vue', ''));
// sections.add(new File('ContactSection.vue', ''));
// sections.add(new File('ProjectsSection.vue', ''));
// sections.add(new File('SkillsSection.vue', ''));

// // Pasta components/terminal
// const terminal = new Directory('terminal');
// terminal.add(new File('TerminalOutput.vue', ''));
// terminal.add(new File('TerminalPrompt.vue', ''));
// terminal.add(new File('TerminalMode.vue', ''));

// // Demais arquivos em components
// components.add(sections);
// components.add(terminal);
// components.add(new File('Header.vue', ''));
// components.add(new File('HelloWorld.vue', ''));
// components.add(new File('MainContent.vue', ''));

// src.add(components);

// // Salvar estrutura em files.json
// manager.save(root);

// console.log('Estrutura salva com sucesso em files.json');
