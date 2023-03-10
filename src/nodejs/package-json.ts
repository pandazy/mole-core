import { ConvertAmong } from '../types';
import { readUserFile } from './files';

export type PackageJSON = Record<string, unknown>;

export function readUserPackageJSON(): PackageJSON {
  return JSON.parse(readUserFile('package.json')) as unknown as PackageJSON;
}

export type SpecialConvert = ConvertAmong<string>;

export interface ExtractForUserScriptsOptions {
  excludes?: Set<string>;
  specials?: Record<string, SpecialConvert>;
}

export function extractForUserScripts(
  rawPackageJSON: PackageJSON,
  { excludes, specials }: ExtractForUserScriptsOptions
): Record<string, string> {
  const packageJSON = rawPackageJSON as { scripts: Record<string, string> };

  return Object.entries(packageJSON.scripts).reduce((nextScripts, [key, value]) => {
    if (excludes?.has(key)) {
      return nextScripts;
    }

    const specialConvert = specials && key in specials ? specials[key] : undefined;
    const nextVal = specialConvert ? specialConvert(value) : value;
    return {
      ...nextScripts,
      [key]: nextVal,
    };
  }, {});
}
