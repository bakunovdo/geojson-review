import { createDomain } from "effector";
import * as turf from "@turf/turf";

import { FeatureItem } from "entities/geojson";

import { MAPBOX_TOKEN } from "shared/config/env";
import { setPayload } from "shared/lib/effector/helpers";

import { FeatureCollection, Geometry } from "geojson";
import mapboxgl, { FitBoundsOptions, Map } from "mapbox-gl";
import { debug } from "patronum";

type MapAction<P> = { map: Map; payload: P };
type GeoJSONSource = { id: string; source: FeatureCollection<Geometry> };

const domain = createDomain("mapbox");

export const zoomIn = domain.createEvent();
export const zoomOut = domain.createEvent();

export const initilizeMapFx = domain.createEffect(createMapbox);

// export const addSource = createEvent<AnySourceData>();
export const addSourceGeoJSONFx = domain.createEffect(
  ({ map, payload }: MapAction<GeoJSONSource>) => {
    map.addSource(payload.id, { type: "geojson", data: payload.source });
    const bbox = turf.bbox(payload.source);
    if (bbox.length === 4) map.fitBounds(bbox, { padding: 20, duration: 1 });

    map.addLayer({
      id: payload.id,
      type: "fill",
      source: payload.id,
      paint: {
        "fill-color": "#555555",
        "fill-opacity": 0.5,
      },
    });

    map.addLayer({
      id: payload.id,
      type: "line",
      source: payload.id,
      paint: {
        "line-color": "red",
        "line-opacity": 0.7,
        "line-width": 10,
      },
    });
  },
);

export const fitBoundsFx = domain.createEffect(
  (params: { map: Map; geometry: FeatureItem; options: FitBoundsOptions }) => {
    const bbox = turf.bbox(params.geometry.feature);
    if (bbox.length === 4) {
      params.map.fitBounds(bbox, params.options);
    }
  },
);

// export const loadFeatures = createEffect((action: MapAction<string>) => {
//   action.map.addSource();
// });

const $sources = domain.createStore<GeoJSONSource[]>([]);
export const $map = domain.createStore<mapboxgl.Map | null>(null);

$map
  .on(initilizeMapFx.doneData, setPayload)
  .on(zoomIn, (map) => map?.zoomIn())
  .on(zoomOut, (map) => map?.zoomOut());

$sources.on(addSourceGeoJSONFx.done, (sources, { params }) => sources.concat(params.payload));

// $sources.

debug(domain);

function createMapbox(container: HTMLElement) {
  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new Map({
    container,
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [-74.5, 40],
    zoom: 9,
    projection: { name: "globe" }, // display the map as a 3D globe
  });

  new ResizeObserver(() => map.resize()).observe(container);

  return map;
}
