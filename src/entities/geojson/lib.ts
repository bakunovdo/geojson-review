import { Feature, FeatureCollection, Geometry } from "geojson";

type HashMap = Record<number, Feature<Geometry>>;

export const createHashMap = (collection?: FeatureCollection<Geometry> | null): HashMap => {
  if (!collection) return {};

  return collection.features.reduce((acc, geometry, id) => {
    acc[id] = geometry;
    return acc;
  }, {} as HashMap);
};
