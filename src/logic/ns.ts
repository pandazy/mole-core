import { ns as pNs } from '../ns';

export function ns(context: string): string {
	return pNs(`logic:${context}`);
}
