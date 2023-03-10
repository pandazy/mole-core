import { Condition, Predicate, Calc } from './types';

const beTrue = (): true => true;

export function swtCase<TArgs extends unknown[], TResult = unknown>(
  conditions: Condition<TArgs, TResult>[]
): Calc<TArgs, TResult> {
  return (...args: TArgs): TResult => {
    const hitResult = conditions.find(([predicate]: [Predicate<TArgs>, Calc<TArgs, TResult>]) =>
      predicate(...args)
    );
    if (hitResult) {
      const [, exec] = hitResult;
      return exec(...args);
    }
    return undefined as unknown as TResult;
  };
}

export function when<TArgs extends unknown[], TResult = unknown>(
  condition: Predicate<TArgs>
): (proc: Calc<TArgs, TResult>) => Condition<TArgs, TResult> {
  type Run = Calc<TArgs, TResult>;
  return (proc: Run): [Predicate<TArgs>, Run] => [condition, proc];
}

export function otherwise<TArgs extends unknown[], TResult = unknown>(
  proc: Calc<TArgs, TResult>
): Condition<TArgs, TResult> {
  return [beTrue, proc];
}
