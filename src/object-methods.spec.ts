import { hasOwnProps } from './object-methods';
import { ns } from './ns';

describe(ns('objectMethods'), () => {
	it('hasOwnProps should decide if an obj contains specified list of properties', () => {
		expect.assertions(2);

		expect(hasOwnProps(['foo', 'bar'])({})).toBe(false);
		expect(hasOwnProps(['foo', 'bar'])({ foo: 1, bar: 2 })).toBe(true);
	});
});
