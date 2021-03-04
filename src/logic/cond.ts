import { Lambda } from '../types';
import { ConditionList } from './types';

const beTrue = () => true;

export function cond<TResult>(
	conditions: ConditionList<TResult>,
): Lambda<TResult> {
	return (...args: any[]) => {
		let result: any;
		for (const [predicate, exec] of conditions) {
			if (predicate(...args)) {
				result = exec(...args);
				break;
			}
		}
		return result as TResult;
	};
}

export function when<TResult = any>(condition: Lambda<boolean>) {
	return (proc: Lambda<TResult>): [Lambda<boolean>, Lambda<TResult>] => [
		condition,
		proc,
	];
}

export const otherwise = when(beTrue);
