import { clusterType, labelType, rgbType } from "../types/utilTypes";
import { calculateCentroid, euclideanDistanceSq } from "../utils/math";
import { getRandomCentroid } from "../utils/utils";

export const kmeans = (
  rgbValues: number[][],
  K = 8,
  MAX_ITERATION = 100
): Promise<clusterType> => {
  let cluster: clusterType = {} as clusterType;
  let centroids: number[][] = getRandomCentroid(rgbValues, K);

  let labels = getLabelsWithNearestPoints(rgbValues, centroids);
  cluster = { labels, iterations: 0 };
  let oldCentroids = centroids;
  let counter = 0;
  for (let i = 1; i < MAX_ITERATION; i++) {
    centroids = labels.map((label) => {
      return calculateCentroid(label.points, label.centroid);
    });

    if (centriodHaveConverged(oldCentroids, centroids)) break;

    oldCentroids = centroids;
    labels = getLabelsWithNearestPoints(rgbValues, centroids);
    cluster = { labels, iterations: i };
    counter++;
  }

  return Promise.resolve(cluster);
};

const getLabelsWithNearestPoints = (
  dataset: number[][],
  centroids: number[][]
) => {
  const labels: labelType[] = [];
  for (let i = 0; i < centroids.length; i++) {
    labels.push({
      points: [],
      centroid: centroids[i],
    });
  }

  for (let i = 0; i < dataset.length; i++) {
    let minDistance = Infinity;
    let nearestCentroidIdx = 0;

    for (let j = 0; j < centroids.length; j++) {
      const dist = euclideanDistanceSq(dataset[i], centroids[j]);
      if (dist < minDistance) {
        minDistance = dist;
        nearestCentroidIdx = j;
      }
    }

    labels[nearestCentroidIdx].points.push(dataset[i]);
  }

  return labels;
};

const centriodHaveConverged = (oldV: number[][], newV: number[][]): boolean => {
  let converged = true;
  for (let i = 0; i < oldV.length; i++) {
    if (
      oldV[i][0] !== newV[i][0] &&
      oldV[i][1] !== newV[i][1] &&
      oldV[i][2] !== newV[i][2]
    ) {
      converged = false;
    }
  }
  return converged;
};
