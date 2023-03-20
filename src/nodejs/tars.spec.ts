import { execSync } from 'child_process';
import { tar, untar } from './tars';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('./files', () => ({
  getUserPath: jest.fn(() => '/home/walter'),
}));

describe('nodejs.tars', () => {
  beforeEach(() => {
    (execSync as jest.Mock).mockReset();
  });

  it('should pack files', () => {
    tar('/home/walter/package.tgz', 'jesse.txt, mike.txt, gus.txt');
    expect(execSync).toBeCalledWith(
      'tar -czf  /home/walter/package.tgz jesse.txt, mike.txt, gus.txt',
      { stdio: 'inherit' }
    );
  });

  it('should unpack files with default untar settings if target is not specified', () => {
    untar('/home/walter/package.tgz');
    expect(execSync).toBeCalledWith('tar -xzf /home/walter/package.tgz', {
      stdio: 'inherit',
    });
  });

  it('should unpack files to target path', () => {
    untar('/home/walter/package.tgz', '/home/walter/Downloads');
    expect(execSync).toBeCalledWith('tar -xzf /home/walter/package.tgz -C /home/walter/Downloads', {
      stdio: 'inherit',
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
