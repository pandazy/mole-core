import { Lambda } from '../types';

export function negate(yesOrNo: Lambda<boolean>): Lambda<boolean> {
	return (...args: any[]) => !yesOrNo(...args);
}
