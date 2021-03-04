import { printInput } from './print-input';
import { ns } from './ns';
import { stringify } from './string/stringify';

describe(ns('print-input'), () => {
	it('should print an arbitrary value', () => {
		expect.assertions(6);

		expect(printInput(() => 'foo')).toMatchSnapshot();
		expect(
			printInput(function callIt() {
				return 'bar';
			}),
		).toMatchSnapshot();
		expect(printInput({ name: 'John' })).toBe(stringify({ name: 'John' }));
		expect(printInput('foo')).toBe(stringify('foo'));
		expect(printInput(null)).toBe('null');
		expect(printInput(false)).toBe('false');
	});
});
