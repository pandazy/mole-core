import { typeOf } from './type-of';
import { ns } from './ns';
import { Nil } from './is-a';

describe(ns('typeOf'), () => {
	it('should be able to return constructor name of a value', () => {
		expect.assertions(3);

		class MyClass {}
		expect(typeOf(undefined)).toBe(Nil);
		expect(typeOf(1)).toBe(Number);
		expect(typeOf(new MyClass())).toBe(MyClass);
	});
});
