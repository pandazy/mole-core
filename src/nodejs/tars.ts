import { execSync } from 'child_process';

/**
 * pack the source to packagePath
 * @param packagePath
 * @param source
 * @returns
 */
export function tar(packagePath: string, source: string): Buffer {
  return execSync(`tar -czf  ${packagePath} ${source}`, { stdio: 'inherit' });
}

/**
 * unpack the packagePath to targetPath
 * @param packagePath
 * @param targetPath
 * @returns
 */
export function untar(packagePath: string, targetPath?: string): Buffer {
  const targetOptions = targetPath ? ` -C ${targetPath}` : '';
  return execSync(`tar -xzf ${packagePath}${targetOptions}`, { stdio: 'inherit' });
}
