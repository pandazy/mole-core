import { otherwise, swtCase, when } from './swt-case';
import { Calc, Condition } from './types';

describe('logic.swtCase', () => {
  it('should run an exec if its related condition is met', () => {
    type Args = [] | [string, number];
    const isNope = jest.fn().mockReturnValue(false);
    const isYeah = jest.fn().mockReturnValue(true);
    const tWhen = when<Args, string>;
    const tCase = swtCase<Args, string>;
    const conditions: Condition<Args, string>[] = [
      tWhen(isNope)(() => 'nope1'),
      [isNope, (): string => 'nope2'],
      [
        isYeah,
        ((name: string, age: number): string => `yes1 ${name} ${age}`) as Calc<Args, string>,
      ],
      [isNope, (): string => 'nope3'],
      tWhen(isYeah)(() => 'yes2'),
    ];
    const conditionsNah: Condition<Args, string>[] = [
      tWhen(isNope)(() => 'nope1'),
      tWhen(isNope)(() => 'nope2'),
      tWhen(isNope)(() => 'nope3'),
      tWhen(isNope)(() => 'nope4'),
    ];

    const conditionsFinally: Condition<Args, string>[] = [
      tWhen(isNope)(() => 'nope1'),
      tWhen(isNope)(() => 'nope2'),
      tWhen(isNope)(() => 'nope3'),
      otherwise(() => 'nope4'),
    ];

    expect(tCase(conditions)('john', 42)).toBe('yes1 john 42');
    expect(isNope.mock.calls.length).toBe(2);
    expect(isYeah.mock.calls.length).toBe(1);

    expect(tCase(conditionsNah)('john', 42)).toBe(undefined);
    expect(tCase(conditionsFinally)('john', 42)).toBe('nope4');
  });
});
