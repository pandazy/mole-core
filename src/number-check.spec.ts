import {
  isWithin,
  isGt,
  isLt,
  shouldVeBeenGt,
  shouldVeBeenLt,
  shouldVeBeenWithin,
} from './number-check';

describe('number-check', () => {
  it('should decide a range of two numbers', () => {
    expect.assertions(2);

    const inRange = isWithin(2)(7);

    expect(inRange(4)).toBe(true);
    expect(inRange(9)).toBe(false);
  });

  it('should be able to do less-than check', () => {
    expect.assertions(3);

    const isLt4 = isLt(4);
    expect(isLt4(4)).toBe(false);
    expect(isLt4(5)).toBe(false);
    expect(isLt4(2)).toBe(true);
  });

  it('should be able to do less-than check', () => {
    expect.assertions(3);

    const isGt4 = isGt(4);
    expect(isGt4(4)).toBe(false);
    expect(isGt4(5)).toBe(true);
    expect(isGt4(2)).toBe(false);
  });

  it('should make an error if NOT greater than', () => {
    expect.assertions(1);

    const error = shouldVeBeenGt(4);
    expect(error.message).toBe('should be greater than 4');
  });

  it('should make an error if NOT less than', () => {
    expect.assertions(1);

    const error = shouldVeBeenLt(4);
    expect(error.message).toBe('should be less than 4');
  });

  it('should make an error if NOT within', () => {
    expect.assertions(1);

    const error = shouldVeBeenWithin(4, 7);
    expect(error.message).toBe('should be within 4 and 7');
  });
});
