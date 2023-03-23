import fs from 'fs';
import { resolve } from 'path';
import {
  getUserPath,
  writeUserFile,
  makeUserDir,
  readUserFile,
  removeUserFile,
  justRead,
  getUserRepoName,
} from './files';

jest.mock('process', () => ({
  cwd: jest.fn().mockReturnValue('/walter'),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn().mockReturnValue(''),
  writeFileSync: jest.fn(),
  unlinkSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

jest.mock('path', () => ({
  resolve: jest
    .fn()
    .mockImplementation((...paths: string[]): string => paths.join('/').replace('//', '/')),
  basename: jest.fn().mockReturnValue('walterbase'),
}));

function asMockFn<T extends (...args: any[]) => any>(fn: T): jest.MockedFunction<T> {
  return fn as unknown as jest.MockedFunction<T>;
}

describe('nodejs.files', () => {
  it('should resolve a path', () => {
    expect(resolve('foo', 'bar', 'baz')).toBe('foo/bar/baz');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(asMockFn(resolve)).toHaveBeenCalledWith('foo', 'bar', 'baz');
  });

  it('should return the user path', () => {
    expect(getUserPath('jesse')).toBe('/walter/jesse');
  });

  it('should get user repo name', () => {
    expect(getUserRepoName()).toBe('walterbase');
  });

  it('should read a file', () => {
    const expectedPath = '/walter/jesse';
    asMockFn(fs.existsSync).mockReturnValue(true);
    asMockFn(fs.readFileSync).mockImplementation(
      (readPath): string => `experiment: ${readPath as string}`
    );

    const result = justRead(expectedPath);
    expect(result).toBe(`experiment: ${expectedPath}`);
    expect(asMockFn(fs.existsSync)).toHaveBeenCalledWith(expectedPath);
  });

  it('should return an empty string if file does not exist', () => {
    const expectedPath = '/walter/jesse';
    asMockFn(fs.existsSync).mockReturnValue(false);

    const result = justRead(expectedPath);
    expect(result).toBe('');
    expect(asMockFn(fs.existsSync)).toHaveBeenCalledWith(expectedPath);
  });

  it('should read a user file', () => {
    const expectedPath = '/walter/jesse';
    asMockFn(fs.existsSync).mockReturnValue(true);
    asMockFn(fs.readFileSync).mockImplementation(
      (relPath): string => `experiment: ${relPath as string}`
    );

    const result = readUserFile('jesse');

    expect(result).toBe(`experiment: ${expectedPath}`);
    expect(asMockFn(fs.existsSync)).toHaveBeenCalledWith(expectedPath);
  });

  it('should make a user directory', () => {
    expect.assertions(2);

    const expectedPath = '/walter/jesse/home';
    asMockFn(fs.existsSync).mockReturnValue(false);
    asMockFn(fs.mkdirSync).mockImplementation((relPath, option): undefined => {
      expect(relPath).toBe(expectedPath);
      expect(option).toEqual({ recursive: true });
      return undefined;
    });

    makeUserDir('jesse', 'home');
  });

  it('should write to a user file', () => {
    expect.assertions(3);

    const expectedPath = '/walter/jesse';
    const expectedContent = 'experiment: jesse';
    asMockFn(fs.writeFileSync).mockImplementation((relPath, content, option): void => {
      expect(relPath).toBe(expectedPath);
      expect(content).toBe(expectedContent);
      expect(option).toEqual({ encoding: 'utf8' });
    });

    writeUserFile({
      paths: ['jesse'],
      content: expectedContent,
    });
  });

  it('should remove a user file', () => {
    expect.assertions(3);

    const expectedPath = '/walter/jesse';
    const afterSpy = jest.fn();
    asMockFn(fs.existsSync).mockReturnValue(true);

    removeUserFile({
      paths: ['jesse'],
      afterActualRemoval: (filePath: string) => {
        afterSpy();
        expect(filePath).toBe(expectedPath);
      },
    });

    expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
    expect(afterSpy).toHaveBeenCalled();
  });

  it('should remove a user file without passing afterRemoval', () => {
    const expectedPath = '/walter/jesse';
    asMockFn(fs.existsSync).mockReturnValue(true);
    removeUserFile({
      paths: ['jesse'],
    });

    expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
