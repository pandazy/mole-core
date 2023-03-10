import negate from './negate';

describe('logic.negate', () => {
  it('should return the antonym fn of a predicate', () => {
    expect.assertions(1);

    const is4 = (a: number): boolean => a === 4;
    expect(negate<[number]>(is4)(5)).toBe(true);
  });
});
