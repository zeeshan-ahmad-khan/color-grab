import { rgbType } from "../types/utilTypes";

export const rgbToHex = (rgb: rgbType): string => {
  const { r, g, b } = rgb;
  return "#" + convertToHex(r) + convertToHex(g) + convertToHex(b);
};

export const convertToHex = (v: number): string => {
  const hex = v.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

export const getRgbValuesKV = (data: number[]): rgbType[] => {
  const values: rgbType[] = [];
  for (let i = 0; i < data.length; i += 4) {
    values.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
    });
  }

  return values;
};

export const getRgbValuesArray = (data: number[]): number[][] => {
  const values: number[][] = [];
  for (let i = 0; i < data.length; i += 4) {
    values.push([data[i], data[i + 1], data[i + 2]]);
  }

  return values;
};
