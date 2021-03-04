import { isA, Nil } from './type-check/is-a';
import { stringify } from './string/stringify';
import { cond, when, otherwise } from './logic';

const printFunc = (ag: any) => `<Function: ${ag.name || 'anonymous'}>`;
const printDesc = (ag: any) => ag.toString();
const printNull = (ag: any) => `${ag}`;
const printJSON = (ag: any) => stringify(ag);

export const printInput: (input: any) => string = cond<string>([
	when(isA(String))(stringify),
	when(isA(Function))(printFunc),
	when(isA(Object))(printJSON),
	when(isA(Nil))(printNull),
	otherwise(printDesc),
]);
