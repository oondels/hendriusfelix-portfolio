import { FileSystemNode } from './FileSystem';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { Directory, File } from './FileSystem';

export class FileSystemManager {
  private filePath: string;

  constructor(filePath: string = './files.json') {
    this.filePath = filePath;
  }

  save(root: FileSystemNode): void {
    const json = JSON.stringify(root.toJSON(), null, 2);
    writeFileSync(this.filePath, json);
  }

  load(): Directory | null {
    if (!existsSync(this.filePath)) return null;

    const raw = readFileSync(this.filePath, 'utf-8');
    const obj = JSON.parse(raw);
    const root = FileSystemNode.fromJSON(obj);
    if (root instanceof Directory) return root;
    throw new Error('Esperava raiz do tipo Directory');
  }
}
