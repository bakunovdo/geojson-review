import { createDomain } from "effector";
import * as turf from "@turf/turf";

import { MAPBOX_TOKEN } from "shared/config/env";
import { setPayload } from "shared/effector/helpers";

import { FeatureCollection, Geometry } from "geojson";
import mapboxgl from "mapbox-gl";
import { debug } from "patronum";

type MapAction<P> = { map: mapboxgl.Map; payload: P };
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

  const map = new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [-74.5, 40],
    zoom: 9,
    projection: { name: "globe" }, // display the map as a 3D globe
  });

  new ResizeObserver(() => map.resize()).observe(container);

  return map;
}
