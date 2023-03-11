import { execSync } from 'child_process';
import { getUserPath } from './files';

/**
 * pack the source to packagePath
 * @param packagePath
 * @param source
 * @returns
 */
export function tar(packagePath: string, source: string): Buffer {
  return execSync(`tar -czf  ${packagePath} ${source}`, { stdio: 'inherit' });
}

const UserRoot = getUserPath('.');

/**
 * unpack the packagePath to targetPath
 * @param packagePath
 * @param targetPath
 * @returns
 */
export function untar(packagePath: string, targetPath = UserRoot): Buffer {
  return execSync(`tar -xzf ${packagePath} -C ${targetPath}`, { stdio: 'inherit' });
}
