export const fill0 =
  (count: number) =>
    (input: number, onTheRight = false): string => {
      const absText = Math.abs(input).toString();
      const inputLen = absText.length;
      const sign = input > 0 ? '' : '-';
      if (inputLen >= count || count <= 0) {
        return input.toString();
      }
      const placeholder = (10 ** count).toString().substring(inputLen + 1);
      return `${sign}${onTheRight ? absText + placeholder : placeholder + absText}`;
    };

export function positiveInt(input: number, rounded = false): number {
  const trimmer = rounded ? Math.round : Math.floor;
  return Math.abs(trimmer(input));
}
