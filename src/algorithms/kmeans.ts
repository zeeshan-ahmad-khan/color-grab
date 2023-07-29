import { clusterType, labelType, rgbType } from "../types/utilTypes";
import { calculateCentroid, euclideanDistanceSq } from "../utils/math";
import { getRandomCentroid } from "../utils/utils";

export const kmeans = (
  rgbValues: number[][],
  K = 8,
  MAX_ITERATION = 50
): Promise<clusterType> => {
  let cluster: clusterType = {} as clusterType;
  // TODO: find random centroid efficiently
  let centroids = getRandomCentroid(rgbValues, K);
  let labels = getLabelsWithNearestPoints(rgbValues, centroids);
  cluster = { labels, iterations: 0 };
  let oldCentroids = centroids;

  for (let i = 1; i < MAX_ITERATION; i++) {
    centroids = labels.map((label) => {
      return calculateCentroid(label.points, label.centroid);
    });

    if (centriodHaveConverged(oldCentroids, centroids)) break;

    oldCentroids = centroids;
    labels = getLabelsWithNearestPoints(rgbValues, centroids);
    cluster = { labels, iterations: i };
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
    let minDistance = Number.MAX_VALUE;
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

const centriodHaveConverged = (oldV: number[][], newV: number[][]) => {
  let converged = true;
  for (let i = 0; i < oldV.length; i++) {
    if (oldV[0] !== newV[0] && oldV[1] !== newV[1] && oldV[2] !== newV[2]) {
      converged = false;
    }
  }
  return converged;
};
