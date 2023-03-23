import readline from 'readline';
import process from 'process';
import { setTimeout } from 'timers';
import { log, clear } from 'console';
import choices, { KeyEventType } from '~nodejs/asks/choices';

jest.mock('readline', () => ({
  createInterface: jest.fn(),
}));

jest.mock('timers', () => ({
  setTimeout: jest.fn(),
  clearTimeout: jest.fn(),
}));

jest.mock('console', () => ({
  log: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('process', () => ({
  stdin: { on: jest.fn() },
  stdout: { _name: 'output' },
}));

describe('nodejs.asks.choices', () => {
  const closeSpy = jest.fn();
  const refreshSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (readline.createInterface as jest.Mock).mockReturnValue({
      close: closeSpy,
    });

    (setTimeout as unknown as jest.Mock).mockReturnValue({
      refresh: refreshSpy,
    });
  });

  function mockStdinOn(eventName: KeyEventType): void {
    (process.stdin.on as jest.Mock).mockImplementation(
      (event, cb: (a: unknown, data?: { name: string }) => void) => {
        if (event === 'error') {
          return;
        }

        cb(undefined as any);

        cb(undefined as any, {
          name: eventName,
        });

        // terminate the promise
        if (eventName !== 'return') {
          cb(undefined as any, {
            name: 'return',
          });
        }
      }
    );
  }

  function mockStdinError(): void {
    (process.stdin.on as jest.Mock).mockImplementation((event, cb: (err: Error) => void) => {
      if (event === 'error') {
        cb(new Error('fake error'));
      }
    });
  }

  it('should return the selected choice', async () => {
    mockStdinOn('return');
    await expect(choices('ok?', ['a', 'b', 'c'])).resolves.toBe('a');

    expect(readline.createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: { _name: 'output' },
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(process.stdin.on).toHaveBeenCalledWith('keypress', expect.any(Function));
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(refreshSpy).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 20000);
    expect(log).toHaveBeenCalledWith('ok?');
    expect(log).toHaveBeenCalledWith(
      '* Press \u2191 or \u2193 to change your choice\n* press ENTER to decide a choice'
    );
    expect(log).toHaveBeenCalledWith('You selected: a');
    expect(clear).toHaveBeenCalledTimes(1);
  });

  it('should move up the option', async () => {
    mockStdinOn('up');
    await expect(choices('ok?', ['a', 'b', 'c'])).resolves.toBe('c');
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(refreshSpy).toHaveBeenCalledTimes(3);
  });

  it('should move down the option', async () => {
    mockStdinOn('down');
    await expect(choices('ok?', ['a', 'b', 'c'])).resolves.toBe('b');
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(refreshSpy).toHaveBeenCalledTimes(3);
  });

  it('should throw an error', async () => {
    mockStdinError();
    await expect(choices('ok?', ['a', 'b', 'c'])).rejects.toThrow(new Error('fake error'));
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw timeout error', async () => {
    (setTimeout as unknown as jest.Mock).mockImplementation((cb: () => void) => {
      cb();
    });
    await expect(
      choices('ok?', ['a', 'b', 'c'], {
        timeoutSec: 15,
      })
    ).rejects.toThrow(new Error('Timed out'));
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 15000);
  });

  it('should starting from a specified position and move up', async () => {
    mockStdinOn('up');
    await expect(
      choices('ok?', ['a', 'b', 'c', 'd'], {
        startAtIndex: 2,
      })
    ).resolves.toBe('b');
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 20000);
  });

  it('should starting from a specified position and move down', async () => {
    mockStdinOn('down');
    await expect(
      choices('ok?', ['a', 'b', 'c', 'd'], {
        startAtIndex: 3,
      })
    ).resolves.toBe('a');
  });
});
