export type Predicate<TArgs extends unknown[]> = (...args: TArgs) => boolean;

export type Calc<TArgs extends unknown[], TResult = unknown> = (...args: TArgs) => TResult;

export type Condition<TArgs extends unknown[], TResult = unknown> = [
  Predicate<TArgs>,
  Calc<TArgs, TResult>
];
