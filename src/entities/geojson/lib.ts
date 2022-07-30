import { FeatureCollection, Geometry } from "geojson";

import { FeatureItem } from "./types";

type HashMap = Record<number, FeatureItem>;

export const createHashMap = (collection?: FeatureCollection<Geometry> | null): HashMap => {
  if (!collection) return {};

  return collection.features.reduce((acc, geometry, id) => {
    acc[id] = { id, feature: geometry };
    return acc;
  }, {} as HashMap);
};
