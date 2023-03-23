import { execSync } from 'child_process';
import { getUserPath, getUserRepoName } from '~nodejs/files';

export const getNodeModuleVolume = (): string => `mole_${getUserRepoName()}_node_modules`;

export interface RunDockerOptions {
  shareNpmrc?: boolean;
  exPort: number;
  inPort: number;
}

export function runDocker(cmd: string, { shareNpmrc, exPort, inPort }: RunDockerOptions): void {
  const userFolder = getUserPath('');

  if (!cmd) {
    throw new Error('No command to run in docker');
  }

  execSync(
    [
      'docker run --rm -it',
      `-v ${userFolder}:/app`,
      `-v ${getNodeModuleVolume()}:/app/node_modules`,
      ...(shareNpmrc ? [`-v ~/.npmrc:/root/.npmrc`] : []),
      `-p ${exPort}:${inPort}`,
      '-w /app node:buster',
      `sh -c "${cmd}"`,
    ].join(' '),
    { stdio: 'inherit' }
  );
}
