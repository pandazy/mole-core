/**
 * Use to allow mocking in tests
 */
export function getProcess(): NodeJS.Process {
  return process;
}

export function getConsole(): Console {
  return console;
}
