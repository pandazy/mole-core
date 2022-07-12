import { assertValue } from './assert-value';
import { isLt } from '../number-check/is-lt';

export const assertLt = (bar: number) => (context: string) => (value: number) =>
  assertValue<number>({
    isValid: isLt(bar),
    failureCause: `must be less than ${bar}`,
  })(context)(value);
