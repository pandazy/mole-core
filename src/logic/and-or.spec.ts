import { and, or } from '~logic/and-or';

describe('logic.andOr', () => {
  type Profile = { name?: string; age?: number };

  it('should do AND', () => {
    expect.assertions(3);

    const isJohn42 = and<[Profile]>(
      ({ name }) => name === 'john',
      ({ age }) => age === 42
    );
    expect(isJohn42({ name: 'john', age: 42 })).toBe(true);
    expect(isJohn42({ name: 'jane', age: 42 })).toBe(false);
    expect(isJohn42({ name: 'john', age: 12 })).toBe(false);
  });

  it('should do OR', () => {
    expect.assertions(3);

    const isAbove42OrJohn = or<[Profile]>(
      ({ name }) => name === 'john',
      ({ age }) => age === 42
    );
    expect(isAbove42OrJohn({ name: 'jim', age: 42 })).toBe(true);
    expect(isAbove42OrJohn({ name: 'john', age: 12 })).toBe(true);
    expect(isAbove42OrJohn({ name: 'jim', age: 12 })).toBe(false);
  });
});
