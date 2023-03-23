import searchAll from '~string/search-all';
import { keys } from '~/object-methods';

export const replaceAll =
  (target: string) =>
    (replacement: string) =>
      (src: string): string => {
        const targetLen = target.length;
        const indices = searchAll(target)(src);
        if (indices.length <= 0) {
          return src;
        }
        return indices
          .map((at: number, i) => {
            const st = i === 0 ? 0 : indices[i - 1] + targetLen;
            const prefix = src.substring(st, at);
            const suffix = i === indices.length - 1 ? src.substring(at + targetLen) : '';
            return `${prefix}${replacement}${suffix}`;
          })
          .join('');
      };

export const replaceAllBy =
  (replacementMap: Record<string, string>) =>
    (src: string): string =>
      keys(replacementMap).reduce((accumulatedResult: string, target) => {
        const replacement = replacementMap[target] || '';
        return replaceAll(target)(replacement)(accumulatedResult);
      }, src);
