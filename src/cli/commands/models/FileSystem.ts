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

  static fromJSON(obj: any, pwd: string, parent?: Directory): FileSystemNode {
    if (obj.type === 'directory') {
      const dir = new Directory(obj.name, pwd, parent);

      for (const child of obj.children) {
        const childrenPwd = pwd + '/' + child.name
        dir.add(FileSystemNode.fromJSON(child, childrenPwd, dir));
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
  parent: FileSystemNode | undefined;
  pwd: string

  constructor(name: string, pwd: string, parent?: Directory) {
    super(name);
    this.parent = parent;
    this.pwd = pwd
  }

  isDirectory(): boolean {
    return true;
  }

  add(node: FileSystemNode) {
    this.children.push(node);

    // Set the parent of the child node to this directory
    if (node instanceof Directory) {
      node.parent = this;
    }
  }

  list(): string[] {
    return this.children.map(c => {
      if (c instanceof Directory) {
        return c.name + '/';
      }
      return c.name;
    })
  }

  getParent(): Directory | undefined {
    return this.parent as Directory | undefined;
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