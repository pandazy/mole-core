import searchAll from './search-all';

describe('string.searchAll', () => {
  it('should return indices of all matches from a source string', () => {
    expect.assertions(3);
    expect(searchAll('abc')('abc|bc|ab|ac|abc||abc')).toEqual([0, 13, 18]);
    expect(searchAll('abcded')('abc')).toEqual([]);
    expect(searchAll('de')('abc')).toEqual([]);
  });
});
