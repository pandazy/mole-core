import { negate } from './negate';
import { ns } from './ns';

describe(ns('negate'), () => {
  it('should return the antonym fn of a predicate', () => {
    expect.assertions(1);

    const is4 = (a: number) => a === 4;
    expect(negate(is4)(5)).toBe(true);
  });
});
