import { Feature, Geometry } from "geojson";

export type FeatureItem = {
  id: number;
  feature: Feature<Geometry>;
};
