const isGt =
  (standard: number) =>
    (challenge: number): boolean =>
      challenge > standard;

const isLt =
  (standard: number) =>
    (challenge: number): boolean =>
      challenge < standard;

const isWithin =
  (from: number) =>
    (to: number) =>
      (value: number): boolean =>
        value >= from && value <= to;

export { isGt, isLt, isWithin };

export function shouldVeBeenGt(standard: number): Error {
  return new Error(`should be greater than ${standard}`);
}

export function shouldVeBeenLt(standard: number): Error {
  return new Error(`should be less than ${standard}`);
}

export function shouldVeBeenWithin(from: number, to: number): Error {
  return new Error(`should be within ${from} and ${to}`);
}
