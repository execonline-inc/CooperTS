// Generates a left inclusive right exclusive range of numbers
export const range = (end: number, start: number = 0, step: number = 1): Iterable<number> => {
  function* generateRange() {
    let x = start - step;
    while (x < end - step) yield (x += step);
  }

  return { [Symbol.iterator]: generateRange };
};
