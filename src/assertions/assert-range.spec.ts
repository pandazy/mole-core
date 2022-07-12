import { assertRange } from './assert-range';
import { ns } from './ns';

describe(ns('assertRange'), () => {
  it('should assert a specific range', () => {
    expect.assertions(2);

    const assert1to7 = assertRange(1)(7)('test@arg');

    expect(() => assert1to7(0)).toThrowErrorMatchingSnapshot();
    assert1to7(1);
    expect(() => assert1to7(8)).toThrowErrorMatchingSnapshot();
  });
});
