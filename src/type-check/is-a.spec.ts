import { isA } from './is-a';
import { ns } from './ns';

describe(ns('isA'), () => {
  it('should decide if a given value is of a specific type', () => {
    expect.assertions(8);

    const isAString = isA(String);
    const isAnArray = isA(Array);

    expect(isAString(null)).toBe(false);
    expect(isAString(undefined)).toBe(false);
    expect(isAString([])).toBe(false);
    expect(isAString(1)).toBe(false);
    expect(isAString({})).toBe(false);

    expect(isAString('a')).toBe(true);

    expect(isAnArray('foo')).toBe(false);

    expect(isAnArray([])).toBe(true);
  });
});
