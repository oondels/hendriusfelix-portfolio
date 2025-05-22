import { Directory, File } from './FileSystem';
import { FileSystemManager } from './FileSystemManager';

const manager = new FileSystemManager();

const fileSystem = manager.load()

if (!fileSystem) {
  console.error('Nenhum sistema de arquivos encontrado.');
  process.exit(1);
}