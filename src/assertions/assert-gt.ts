import { assertValue } from './assert-value';
import { isGt } from '../number-check/is-gt';

export const assertGt = (bar: number) => (context: string) => (value: number) =>
  assertValue<number>({
    isValid: isGt(bar),
    failureCause: `must be greater than ${bar}`,
  })(context)(value);
