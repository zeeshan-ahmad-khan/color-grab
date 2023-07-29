export const euclideanDistanceSq = (p1: number[], p2: number[]): number => {
  let sqDist = 0;
  for (let i = 0; i < p1.length; i++) {
    sqDist += (p1[i] - p2[i]) ** 2;
  }
  return sqDist;
};

export const calculateCentroid = (
  points: number[][],
  centro: number[]
): number[] => {
  const N: number = points.length;

  if (N === 0) {
    return centro;
  }

  let centroid = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    const sums = [0, 0, 0];
    for (let j = 0; j < N; j++) {
      sums[i] += points[j][i];
    }
    centroid[i] = Math.round(sums[i] / N);
  }

  return centroid;
};
