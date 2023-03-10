/* eslint-disable no-param-reassign */
interface Cursor {
  at: number;
  trace: string;
}

function resetSearch(cursor: Cursor): void {
  cursor.at = -1;
  cursor.trace = '';
}

function saveStep(at: number, char: string, cursor: Cursor): void {
  if (cursor.at < 0) {
    cursor.at = at;
  }
  cursor.trace += char;
}

const searchAll =
  (target: string) =>
    (src: string): number[] => {
      if (target.length >= src.length) {
        return [];
      }
      const foundPart = (char: string): boolean => target.indexOf(char) >= 0;
      const indices: number[] = [];
      const cur: Cursor = {
        at: -1,
        trace: '',
      };
      const found = (): boolean => target === cur.trace;
      for (let i = 0; i < src.length; i += 1) {
        const char = src[i];
        if (foundPart(char)) {
          saveStep(i, char, cur);
          if (found()) {
            indices.push(cur.at);
            resetSearch(cur);
          }
        } else {
          resetSearch(cur);
        }
      }
      return indices;
    };

export default searchAll;
