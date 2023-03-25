export default function rangeReduce<T>(
  start: number,
  end: number
): (reducer: (acc: T, curr: number) => T, initialValue: T) => T {
  return (reducer, initialValue) => {
    let acc = initialValue;
    for (let i = start; i <= end; i += 1) {
      acc = reducer(acc, i);
    }
    return acc;
  };
}
