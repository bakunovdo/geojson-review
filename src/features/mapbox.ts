import { sample, UnitValue } from "effector";

import { geojsonModel } from "entities/geojson";
import { mapboxModel } from "entities/mapbox";

import type { FeatureCollection } from "geojson";
import type { Map } from "mapbox-gl";

type Input = { map: Map | null; file: FeatureCollection | null };
type TypeGuard = { map: Map; file: FeatureCollection };

sample({
  clock: geojsonModel.$file,
  source: { map: mapboxModel.$map, file: geojsonModel.$file },
  filter: (arg: Input): arg is TypeGuard => Boolean(arg.file && arg.map),
  fn: (source) => ({
    map: source.map,
    payload: { id: "file", source: source.file },
  }),
  target: mapboxModel.addSourceGeoJSONFx,
});

export {};
