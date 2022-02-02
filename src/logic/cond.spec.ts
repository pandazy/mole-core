import { cond, when } from './cond';
import { ns } from './ns';
import { Condition } from './types';

describe(ns('cond'), () => {
	it('should run an exec if its related condition is met', () => {
		expect.assertions(3);

		const isNope = jest.fn().mockReturnValue(false)
		const isYeah = jest.fn().mockReturnValue(true);
		const conditions: Condition[] = [
			when(isNope)(() => 'nope1'),
			[isNope, () => 'nope2'],
			[isYeah, (name: string, age: string) => `yes1 ${name} ${age}`],
			[isNope, () => 'nope3'],
			when(isYeah)(() => 'yes2'),
		];
		expect(cond<string>(conditions)('john', 42)).toBe('yes1 john 42');
		expect(isNope.mock.calls.length).toBe(2);
		expect(isYeah.mock.calls.length).toBe(1);
	});
});
