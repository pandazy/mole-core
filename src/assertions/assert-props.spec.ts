import { assertProps } from './assert-props';
import { ns } from './ns';

describe(ns('assertProps'), () => {
  interface MockType {
    name: string;
    job?: string;
  }

  it('should assert fields existing in an input', () => {
    expect.assertions(3);

    const assertNameAge = assertProps<MockType>(['name', 'job'])(
      ns('assertProps'),
    );
    expect(() =>
      assertNameAge({ name: 'shinobu' }),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      assertNameAge(undefined as any),
    ).toThrowErrorMatchingSnapshot();
    expect(() => assertNameAge(null as any)).toThrowErrorMatchingSnapshot();
    assertNameAge({ name: 'shinobu', job: 'jobless' });
  });
});
