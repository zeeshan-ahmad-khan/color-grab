export interface rgbType {
  r: number;
  g: number;
  b: number;
}

export interface labelType {
  points: number[][];
  centroid: number[];
}

export interface clusterType {
  labels: labelType[];
  iterations: number;
}
