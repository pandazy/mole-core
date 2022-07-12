import { isA, Nil } from './is-a';
import { getProtoConstructor } from '../object-methods';

export function typeOf(val: any) {
  if (isA(Nil)(val)) {
    return Nil;
  }

  return getProtoConstructor(val);
}
