import { readUserFile } from './files';

export type PackageJSON = Record<string, unknown>;

export function readUserPackageJSON(): PackageJSON {
  return JSON.parse(readUserFile('package.json')) as unknown as PackageJSON;
}
