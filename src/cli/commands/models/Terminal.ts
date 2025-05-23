import { Directory, FileSystemNode } from "./FileSystem"

export class Terminal {
  private currentDirectory: Directory;
  rootDir: Directory

  constructor(private root: Directory) {
    this.currentDirectory = root;
    this.rootDir = root
  }

  getCurrentDirectory(): Directory {    
    return this.currentDirectory
  }

  changeDirectory(dir: Directory): void {
    this.currentDirectory = dir
  }

  getRoot() {
    return this.rootDir
  }

  print(text: string) {
    console.log(text)
    return text
  }
}