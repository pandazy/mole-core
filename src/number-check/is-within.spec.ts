import { ns } from './ns';
import { isWithin } from './is-within';

describe(ns('isWithin'), () => {
	it('should decide a range of two numbers', () => {
		expect.assertions(2);

		const inRange = isWithin(2)(7);

		expect(inRange(4)).toBe(true);
		expect(inRange(9)).toBe(false);
	});
});
