import { Feature, Geometry } from "geojson";

export enum OptionFit {
  Unknown = -1,
  No,
  Yes,
}

export type FeatureItem = {
  id: number;
  feature: Feature<Geometry>;
  properties: {
    fit: OptionFit;
  };
};
