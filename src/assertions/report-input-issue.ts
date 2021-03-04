import { replaceAllBy } from '../string/replace-all';
import { printInput } from '../print-input';
import { isA, Nil } from '../type-check/is-a';

export const reportInputIssue = (message: string) => (input: any): string => {
	const valString = printInput(input);
	const instanceName = isA(Nil)(input)
		? `Nil:(${input})`
		: Object.getPrototypeOf(input).constructor.name;
	return replaceAllBy({
		'%arg%': valString,
		'%argType%': instanceName,
	})(message);
};
