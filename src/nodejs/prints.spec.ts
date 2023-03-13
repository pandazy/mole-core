import { clearLastLineAndPrint, error, print, warn } from './prints';

describe('nodejs.prints', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
    jest.spyOn(process.stdout, 'write');
    jest.spyOn(console, 'warn');
  });

  it('should print a message to the console', () => {
    print('hello');
    expect(console.log).toBeCalledWith('hello');
  });

  it('should print a message to the console without a newline', () => {
    clearLastLineAndPrint('hello');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(process.stdout.write as jest.Mock).toBeCalledWith('\x1B[1A\x1B[2K');
  });

  it('should print warn', () => {
    jest.spyOn(console, 'warn');
    warn('hello');
    expect(console.warn).toBeCalledWith('hello');
  });

  it('should print error', () => {
    jest.spyOn(console, 'error');
    error('hello');
    expect(console.warn).toBeCalledWith('hello');
  });
});
