export abstract class FileSystemNode {
  constructor(public name: string) { }
  abstract isDirectory(): boolean;

  toJSON(): any {
    if (this instanceof Directory) {
      return {
        type: 'directory',
        name: this.name,
        children: this.children.map(child => child.toJSON())
      };
    } else if (this instanceof File) {
      return {
        type: 'file',
        name: this.name,
        content: this.content
      };
    }

    throw new Error("Unknown FileSystemNode type.");
  }

  static fromJSON(obj: any): FileSystemNode {
    if (obj.type === 'directory') {
      const dir = new Directory(obj.name);
      for (const child of obj.children) {
        dir.add(FileSystemNode.fromJSON(child));
      }
      return dir;
    }
    else if (obj.type === 'file') {
      return new File(obj.name, obj.content);
    }
    throw new Error(`Unknown node type: ${obj.type}`);
  }
}

export class Directory extends FileSystemNode {
  children: FileSystemNode[] = [];

  constructor(name: string) {
    super(name);
  }

  isDirectory(): boolean {
    return true;
  }

  add(node: FileSystemNode) {
    this.children.push(node);
  }

  list(): string[] {
    return this.children.map(c => c.name);
  }

   getChild(name: string): FileSystemNode | undefined {
    return this.children.find(child => child.name === name);
  }
}

export class File extends FileSystemNode {
  constructor(name: string, public content: string) {
    super(name);
  }

  isDirectory(): boolean {
    return false;
  }
}