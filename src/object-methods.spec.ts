import { entries, fromEntries } from './object-methods';

describe('objectMethods', () => {
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
        ])
      )
    ).toStrictEqual({
      foo: 12,
      bar: 14,
    });
  });
});
