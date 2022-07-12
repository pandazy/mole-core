export interface PlainMap<V = any> {
  [key: string]: V;
}

export type Lambda<TResult = any> = (...args: any[]) => TResult;
export type Lambda1<Input, Output> = (input: Input) => Output;
export type Lambda2<Input1, Input2, Output> = (
  input1: Input1,
  input2: Input2,
) => Output;
export type Lambda3<Input1, Input2, Input3, Output> = (
  inp1: Input1,
  inp2: Input2,
  inp3: Input3,
) => Output;
