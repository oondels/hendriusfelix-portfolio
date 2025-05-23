import { FileSystemNode } from './FileSystem';
import { files } from '../../files'
import { Directory } from './FileSystem';

export class FileSystemManager {
  // save method is not available on client side
  save(_: FileSystemNode): void {
    throw new Error('Save operation is not supported in client-side environment');
  }

  load(): Directory {
    // Directly use imported file structure instead of filesystem
    const obj = files;
    const pwd = '/' + obj.name;
    const root = FileSystemNode.fromJSON(obj, pwd);
    if (root instanceof Directory) return root;
    throw new Error('Esperava raiz do tipo Directory');
  }
}
