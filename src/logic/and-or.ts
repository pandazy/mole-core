type Predicate<TArgs extends unknown[]> = (...args: TArgs) => boolean;

export type LogicOp = 'and' | 'or';

export function ifAll<TArgs extends unknown[]>(
  op: LogicOp,
  predicates: Predicate<TArgs>[]
): (...args: TArgs) => boolean {
  const meetCriteria =
    op === 'and' ? predicates.every.bind(predicates) : predicates.some.bind(predicates);
  return (...args: TArgs): boolean => meetCriteria((isMet: Predicate<TArgs>) => isMet(...args));
}

export function and<TArgs extends unknown[]>(
  ...predicates: Predicate<TArgs>[]
): (...args: TArgs) => boolean {
  return ifAll<TArgs>('and', predicates);
}

export function or<TArgs extends unknown[]>(
  ...predicates: Predicate<TArgs>[]
): (...args: TArgs) => boolean {
  return ifAll<TArgs>('or', predicates);
}
