import { rgbType } from "../types/utilTypes";

export const medianCutAlgorithm = (
  rgbValues: rgbType[],
  channel: keyof rgbType,
  MAX_DEPTH: number = 4
): rgbType[] => {
  function helper(values: rgbType[], depth: number = 0): rgbType[] {
    if (depth === MAX_DEPTH || values.length === 0) {
      const qunatisedValue: rgbType = values.reduce(
        (acc, val) => {
          return {
            r: acc.r + val.r,
            g: acc.g + val.g,
            b: acc.b + val.b,
          };
        },
        { r: 0, g: 0, b: 0 }
      );

      const r: number = Math.round(qunatisedValue.r / values.length);
      const g: number = Math.round(qunatisedValue.g / values.length);
      const b: number = Math.round(qunatisedValue.b / values.length);

      return [{ r, g, b }];
    }

    const sortedValues: rgbType[] = values.sort((p1: rgbType, p2: rgbType) => {
      return p2[channel] - p1[channel];
    });

    const mid: number = Math.floor(sortedValues.length / 2);

    const left: rgbType[] = sortedValues.slice(0, mid);
    const right: rgbType[] = sortedValues.slice(mid + 1);

    return [...helper(left, depth + 1), ...helper(right, depth + 1)];
  }

  return helper(rgbValues);
};
