import { ns } from './ns';
import { isGt } from './is-gt';

describe(ns('isGt'), () => {
  it('should be able to do less-than check', () => {
    expect.assertions(3);

    const isGt4 = isGt(4);
    expect(isGt4(4)).toBe(false);
    expect(isGt4(5)).toBe(true);
    expect(isGt4(2)).toBe(false);
  });
});
