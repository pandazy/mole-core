import { fill0, positiveInt } from '~/numeric';

describe('numeric', () => {
  it('should zero-fill a number', () => {
    expect.assertions(8);

    expect(fill0(1)(42, false)).toBe('42');
    expect(fill0(1)(42, true)).toBe('42');
    expect(fill0(2)(42)).toBe('42');
    expect(fill0(2)(42, true)).toBe('42');
    expect(fill0(5)(42)).toBe('00042');
    expect(fill0(5)(-42)).toBe('-00042');
    expect(fill0(8)(42.3, true)).toBe('42.30000');
    expect(fill0(5)(42, true)).toBe('42000');
  });

  it('should return a positive integer', () => {
    expect.assertions(2);

    expect(positiveInt(42.52, true)).toBe(43);
    expect(positiveInt(42.52)).toBe(42);
  });
});
