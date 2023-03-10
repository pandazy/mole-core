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
