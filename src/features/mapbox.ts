import { sample, UnitValue } from "effector";

import { FeatureItem, geojsonModel } from "entities/geojson";
import { mapboxModel } from "entities/mapbox";

import type { FeatureCollection } from "geojson";
import type { Map } from "mapbox-gl";

type Input<T> = { map: Map | null; data: T | null };
type TypeGuard<T> = { map: Map; data: T };
type FnType<T extends keyof typeof mapboxModel> = UnitValue<typeof mapboxModel[T]>;

const guardFn =
  <T>() =>
  (params: Input<T>): params is TypeGuard<T> =>
    Boolean(params.map && params.data);

sample({
  clock: geojsonModel.$file,
  source: { map: mapboxModel.$map, data: geojsonModel.$file },
  filter: guardFn<FeatureCollection>(),
  fn: (source): FnType<"addSourceGeoJSONFx"> => ({
    map: source.map,
    payload: { id: "file", source: source.data },
  }),
  target: mapboxModel.addSourceGeoJSONFx,
});

// LI - List Item
sample({
  clock: geojsonModel.$currentFeature,
  source: { map: mapboxModel.$map, data: geojsonModel.$currentFeature },
  filter: guardFn<FeatureItem>(),
  fn: ({ map, data }): FnType<"fitBoundsFx"> => {
    return {
      map,
      geometry: data,
      options: {
        padding: 50,
        duration: 1000,
      },
    };
  },
  target: mapboxModel.fitBoundsFx,
});

export {};
