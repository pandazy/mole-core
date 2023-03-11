import { execSync } from 'child_process';
import { runDocker } from './run-docker';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('./files', () => ({
  getUserPath: jest.fn().mockReturnValue('/home/walter/lab'),
  getUserRepoName: jest.fn().mockReturnValue('lab'),
}));

describe('nodejs.runDocker', () => {
  beforeEach(() => {
    (execSync as jest.Mock).mockClear();
  });

  it('should run docker', () => {
    const cmd = 'yarn start';
    const exPort = 1234;
    const inPort = 5678;
    const shareNpmrc = true;
    const expected = [
      'docker run --rm -it',
      `-v /home/walter/lab:/app`,
      `-v mole_lab_node_modules:/app/node_modules`,
      `-v ~/.npmrc:/root/.npmrc`,
      `-p ${exPort}:${inPort}`,
      '-w /app node:buster',
      `sh -c "${cmd}"`,
    ].join(' ');

    runDocker(cmd, { exPort, inPort, shareNpmrc });

    expect(execSync).toHaveBeenCalledWith(expected, { stdio: 'inherit' });
  });

  it('should throw error if cmd is empty', () => {
    expect(() => runDocker('', { exPort: 1234, inPort: 5678 })).toThrowError(
      'No command to run in docker'
    );
  });

  it('should skip sharing npmrc', () => {
    const cmd = 'yarn start';
    const exPort = 1234;
    const inPort = 5678;
    const shareNpmrc = false;
    const expected = [
      'docker run --rm -it',
      `-v /home/walter/lab:/app`,
      `-v mole_lab_node_modules:/app/node_modules`,
      `-p ${exPort}:${inPort}`,
      '-w /app node:buster',
      `sh -c "${cmd}"`,
    ].join(' ');

    runDocker(cmd, { exPort, inPort, shareNpmrc });

    expect(execSync).toHaveBeenCalledWith(expected, { stdio: 'inherit' });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
