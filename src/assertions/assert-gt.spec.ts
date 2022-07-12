import { assertGt } from './assert-gt';
import { ns } from './ns';

describe(ns('assertGt'), () => {
  it('should assert a value greater than a number', () => {
    expect.assertions(1);

    const assertGt6 = assertGt(6)('test@arg');

    expect(() => assertGt6(3)).toThrowErrorMatchingSnapshot();
    assertGt6(7);
  });
});
