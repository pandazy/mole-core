import rangeReduce from './range-reduce';

describe('range-reduce', () => {
  it('should reduce a range', () => {
    const reduce = rangeReduce<Record<string, number>>(1, 3);
    const result = reduce((acc, curr) => {
      acc[`k${curr}`] = curr;
      return acc;
    }, {});
    expect(result).toEqual({ k1: 1, k2: 2, k3: 3 });
  });
});
