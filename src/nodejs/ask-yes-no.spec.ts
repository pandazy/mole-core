import readline from 'readline';
import askYesNo from './ask-yes-no';

jest.mock('./globals', () => ({
  getProcess: jest.fn().mockReturnValue({
    stdin: {},
    stdout: {},
  }),
}));

jest.mock('readline', () => ({
  createInterface: jest.fn(),
}));

describe('nodejs.askYesNo', () => {
  const closeSpy = jest.fn();
  it('should return true for yes', async () => {
    const questionSpy = jest.fn().mockImplementation((_, cb: (answer: string) => void) => {
      cb('y');
    });

    (readline.createInterface as jest.Mock) = jest.fn().mockReturnValue({
      question: questionSpy,
      close: closeSpy,
    });

    const result = await askYesNo('ok?');
    expect(result).toBe(true);
    expect(readline.createInterface).toHaveBeenCalledWith({
      input: {},
      output: {},
    });
    expect(questionSpy).toHaveBeenCalledWith('ok? (Y/n)', expect.any(Function));
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should return false for no', async () => {
    const questionSpy = jest.fn().mockImplementation((_, cb: (answer: string) => void) => {
      cb('n');
    });

    (readline.createInterface as jest.Mock) = jest.fn().mockReturnValue({
      question: questionSpy,
      close: closeSpy,
    });

    const result = await askYesNo('ok?');
    expect(result).toBe(false);
  });

  it('should reject invalid answer', async () => {
    const questionSpy = jest.fn().mockImplementation((_, cb: (answer: string) => void) => {
      cb('a');
    });

    (readline.createInterface as jest.Mock) = jest.fn().mockReturnValue({
      question: questionSpy,
      close: closeSpy,
    });

    await expect(askYesNo('ok?')).rejects.toThrowError('Invalid answer');
  });

  it('should return true for an empty answer', async () => {
    const questionSpy = jest.fn().mockImplementation((_, cb: (answer: string) => void) => {
      cb('');
    });

    (readline.createInterface as jest.Mock) = jest.fn().mockReturnValue({
      question: questionSpy,
      close: closeSpy,
    });

    const result = await askYesNo('ok?');
    expect(result).toBe(true);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
