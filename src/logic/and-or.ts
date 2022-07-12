import { Lambda } from '../types';

function conditionsMet<Input>(
  strategy: 'and' | 'or',
  predicates: Lambda<boolean>[],
) {
  return (...args: Input[]) => {
    const checkMethod = (
      strategy === 'and' ? predicates.every : predicates.some
    ).bind(predicates);
    return checkMethod((isMet: Lambda<boolean>) => isMet(...args));
  };
}

export function and<Input>(...predicates: Lambda<boolean>[]) {
  return conditionsMet<Input>('and', predicates);
}

export function or<Input>(...predicates: Lambda<boolean>[]) {
  return conditionsMet<Input>('or', predicates);
}
