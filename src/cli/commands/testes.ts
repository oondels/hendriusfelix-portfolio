import { Directory, File } from './models/FileSystem';
import { FileSystemManager } from './models/FileSystemManager';
import { Terminal } from './models/Terminal';
import { CommandRegistry } from './models/Command';
import { Command } from './models/Command';
import readline from "node:readline"

const manager = new FileSystemManager();