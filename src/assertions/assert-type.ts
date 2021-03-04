import { assertValue } from './assert-value';
import { isA } from '../type-check/is-a';

export const assertType = (constructor: any) => (context: string) => (
	value: any,
) =>
	assertValue({
		isValid: isA(constructor),
		failureCause: `type must be ${constructor.name}`,
	})(context)(value);
