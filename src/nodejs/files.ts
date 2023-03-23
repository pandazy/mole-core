import { existsSync, readFileSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import path, { resolve } from 'path';
import { cwd } from 'process';

export const getBasename = path.basename.bind(path);

export function getUserPath(...paths: string[]): string {
  return resolve(cwd(), ...paths);
}

export function getUserRepoName(): string {
  return getBasename(getUserPath(''));
}

export function justRead(filePath: string): string {
  if (!existsSync(filePath)) {
    return '';
  }
  return readFileSync(filePath, 'utf8');
}

export function readUserFile(...paths: string[]): string {
  return justRead(getUserPath(...paths));
}

export function justMkdir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

export function makeUserDir(...paths: string[]): void {
  const dirPath = getUserPath(...paths);
  justMkdir(dirPath);
}

export function justWriteFile(filePath: string, content: string): void {
  writeFileSync(filePath, content, { encoding: 'utf8' });
}

export interface WriteFileOptions {
  paths: string[];
  content: string;
}

export function writeUserFile({ paths, content }: WriteFileOptions): void {
  justWriteFile(getUserPath(...paths), content);
}

type AfterRemoval = (filePath: string) => void;

export function justRemoveFile(filePath: string, afterRemoval?: AfterRemoval): void {
  if (existsSync(filePath)) {
    unlinkSync(filePath);
    afterRemoval?.(filePath);
  }
}

export interface RemoveFileOptions {
  paths: string[];
  afterActualRemoval?: (filePath: string) => void;
}

export function removeUserFile({
  paths,
  afterActualRemoval: afterRemoval,
}: RemoveFileOptions): void {
  const filePath = getUserPath(...paths);
  justRemoveFile(filePath, afterRemoval);
}
