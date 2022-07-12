import { assertValue } from './assert-value';
import { isWithin } from '../number-check/is-within';

export const assertRange = (from: number) => (to: number) => (
  context: string,
) => (value: number) =>
  assertValue<number>({
    isValid: isWithin(from)(to),
    failureCause: `out of bounds of ${from}..${to}`,
  })(context)(value);
