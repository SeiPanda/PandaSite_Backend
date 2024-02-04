export abstract class Importer {
  pathToImport: string;
  constructor(pathToImport: string) {
    this.pathToImport = pathToImport;
  }
}
