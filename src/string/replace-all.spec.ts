import { replaceAll, replaceAllBy } from './replace-all';
import { ns } from './ns';

describe(ns('replaceAll'), () => {
  it('should replace a string with specified target and replacement', () => {
    expect.assertions(6);
    expect(replaceAll('%grr%')('88')('foo-bar|%grr%|%grr%')).toBe(
      'foo-bar|88|88',
    );
    expect(replaceAll('%grr%')('99')('')).toBe('');
    expect(replaceAll('%grr%')('88')('%grr%|barfoo|%grr%')).toBe(
      '88|barfoo|88',
    );
    expect(replaceAll('%grr%')('88')('foobar|%grr%%grr%|foobar')).toBe(
      'foobar|8888|foobar',
    );
    expect(replaceAll('%grr%')('88')('%grr%%grr%|foobar')).toBe(
      '8888|foobar',
    );
    expect(replaceAll('%grr%')('88')('foobar')).toBe('foobar');
  });

  it('should replace a string with pairs of target and replacement', () => {
    const template = '%foo%|%bar%|%baz%';
    expect.assertions(1);
    expect(
      replaceAllBy({
        '%foo%': '12',
        '%bar%': '34',
        '%baz%': '56',
        '%qux%': '',
      })(template),
    ).toBe('12|34|56');
  });
});
