import { entries, fromEntries, hasOwnProps } from './object-methods';
import { ns } from './ns';

describe(ns('objectMethods'), () => {
  it('hasOwnProps decides if an obj contains specified properties', () => {
    expect.assertions(2);

    expect(hasOwnProps(['foo', 'bar'])({})).toBe(false);
    expect(hasOwnProps(['foo', 'bar'])({ foo: 1, bar: 2 })).toBe(true);
  });

  it('entries and fromEntries do key-value <-> object conversion', () => {
    expect.assertions(2);

    expect(entries<number>({ foo: 12, bar: 14 })).toStrictEqual([
      ['foo', 12],
      ['bar', 14],
    ]);

    expect(
      fromEntries<number>(
        new Map([
          ['foo', 12],
          ['bar', 14],
        ]),
      ),
    ).toStrictEqual({
      foo: 12,
      bar: 14,
    });
  });
});
