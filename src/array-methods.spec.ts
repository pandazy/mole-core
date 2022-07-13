import { isArray, from } from './array-methods';
import { ns } from './ns';

describe(ns('arrayMethods'), () => {
  it('should proxy Array.from', () => {
    expect.assertions(1);

    expect(from<number>(new Set([1, 2]))).toStrictEqual([1, 2]);
  });

  it('should proxy Array.isArray', () => {
    expect.assertions(2);

    expect(isArray([])).toBe(true);
    expect(isArray(1)).toBe(false);
  });
});
