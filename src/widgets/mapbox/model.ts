import { createDomain } from "effector";

import { MAPBOX_TOKEN } from "shared/config/env";
import { setPayload } from "shared/effector/helpers";

import mapboxgl from "mapbox-gl";
import { debug } from "patronum";

const domain = createDomain("mapbox");

const { createEffect, createStore } = domain;

export const $map = createStore<mapboxgl.Map | null>(null);

export const initilizeMap = createEffect((container: HTMLElement) => {
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
});

$map.on(initilizeMap.doneData, setPayload);

debug($map);
// TODO delete
console.log("$map", $map.sid);
