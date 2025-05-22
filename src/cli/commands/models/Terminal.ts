import { Directory, FileSystemNode } from "../FileSystem"

export class Terminal {
  private currentDirectory: Directory;

  constructor(private root: Directory) {
    this.currentDirectory = root;
  }

  getCurrentDirectory(): Directory {
    return this.currentDirectory
  }

  changeDirectory(dir: Directory): void {
    this.currentDirectory = dir
  }
}