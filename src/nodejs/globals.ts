/**
 * Use to allow mocking in tests
 */
export function getProcess(): NodeJS.Process {
  return process;
}

/**
 * Use to allow mocking in tests
 */
export function getLibDir(): string {
  // eslint-disable-next-line no-underscore-dangle
  return __dirname;
}

export function getConsole(): Console {
  return console;
}
