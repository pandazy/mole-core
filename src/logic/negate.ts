import { Predicate } from './types';

export default function negate<Args extends unknown[]>(yesOrNo: Predicate<Args>): Predicate<Args> {
  return (...args: Args) => !yesOrNo(...args);
}
