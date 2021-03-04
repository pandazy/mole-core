import { freeze, getProtoConstructor } from '../object-methods';

export const Nil = freeze({ name: 'Nil' });

export const isA = (constructor: any) => (val: any): boolean => {
	if (constructor === Nil) {
		return val == null;
	}

	return (
		!isA(Nil)(val) &&
		(getProtoConstructor(val) === constructor || val instanceof constructor)
	);
};
