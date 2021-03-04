import { Lambda } from '../types';

export type Condition<T = any> = [Lambda<boolean>, Lambda<T>];

export type ConditionList<T = any> = Condition<T>[];
