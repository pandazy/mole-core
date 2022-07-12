import { assertType } from './assert-type';
import { ns } from './ns';

describe(ns('assertType'), () => {
  it('should assert a specific type', () => {
    expect.assertions(1);

    const assertArray = assertType(Array)('test@arg');

    expect(() => assertArray('a')).toThrowErrorMatchingSnapshot();
    assertArray([]);
  });
});
