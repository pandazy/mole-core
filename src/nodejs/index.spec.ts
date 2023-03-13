import { commandify } from './index';
import { getConsole } from './globals';

describe('nodejs.index', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
  });

  it('turn a list of strings into a command', () => {
    commandify('ls', '-l', '-a', '-h');
    expect(commandify('ls', '-l', '-a', '-h')).toBe('ls -l -a -h');
  });

  it('should deligate console to getConsole', () => {
    getConsole().log('hello');
    expect(console.log).toBeCalledWith('hello');
  });
});
