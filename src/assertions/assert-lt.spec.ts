import { assertLt } from './assert-lt';
import { ns } from './ns';

describe(ns('assertLt'), () => {
  it('should assert a value less than a number', () => {
    expect.assertions(1);

    const assertLt6 = assertLt(6)('test@arg');

    expect(() => assertLt6(7)).toThrowErrorMatchingSnapshot();
    assertLt6(3);
  });
});
