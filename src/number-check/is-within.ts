export const isWithin = (from: number) => (to: number) => (
	value: number,
): boolean => value >= from && value <= to;
