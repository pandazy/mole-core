import { ns } from './ns';
import { isLt } from './is-lt';

describe(ns('isLt'), () => {
	it('should be able to do less-than check', () => {
		expect.assertions(3);

		const isLt4 = isLt(4);
		expect(isLt4(4)).toBe(false);
		expect(isLt4(5)).toBe(false);
		expect(isLt4(2)).toBe(true);
	});
});
