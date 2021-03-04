import { hasOwnProps } from '../object-methods';
import { assertValue } from './assert-value';

const hasProps = (fields: string[]) => {
	const propBelongsTo = hasOwnProps(fields);
	return (obj: any) => (obj != null ? propBelongsTo(obj) : false);
};

export function assertProps<TInput>(fields: string[]) {
	return (context: string) => (value: TInput) =>
		assertValue<TInput>({
			isValid: hasProps(fields),
			failureCause: `must have these properties: ${fields.join(', ')}`,
		})(context)(value);
}
