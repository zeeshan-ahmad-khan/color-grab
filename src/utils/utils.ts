import { rgbType } from "../types/utilTypes";

export const colorChannelWithGreatestRange = (rgbValues: rgbType[]): string => {
  let rMin = Number.MAX_SAFE_INTEGER;
  let gMin = Number.MAX_SAFE_INTEGER;
  let bMin = Number.MAX_SAFE_INTEGER;

  let rMax = Number.MIN_SAFE_INTEGER;
  let gMax = Number.MIN_SAFE_INTEGER;
  let bMax = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < rgbValues.length; i++) {
    if (rgbValues[i].r < rMin) rMin = rgbValues[i].r;
    if (rgbValues[i].g < gMin) gMin = rgbValues[i].g;
    if (rgbValues[i].b < bMin) bMin = rgbValues[i].b;
    if (rgbValues[i].r > rMax) rMax = rgbValues[i].r;
    if (rgbValues[i].g > gMax) gMax = rgbValues[i].g;
    if (rgbValues[i].b > bMax) bMax = rgbValues[i].b;
  }

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;
  const maxRange = Math.max(rRange, gRange, bRange);

  if (rRange === maxRange) return "r";
  if (gRange === maxRange) return "g";
  if (bRange === maxRange) return "b";

  return "";
};

export const getRandomCentroid = (
  dataset: number[][],
  K: number
): number[][] => {
  const centroidIdx: number[] = [];
  const centroids: number[][] = [];

  while (centroidIdx.length < K) {
    const index = Math.floor(Math.random() * dataset.length);
    if (!centroidIdx.includes(index)) {
      centroidIdx.push(index);
    }
  }

  for (let i = 0; i < centroidIdx.length; i++) {
    centroids.push(dataset[centroidIdx[i]]);
  }

  return centroids;
};
