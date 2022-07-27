import type { Component } from "solid-js";
import { onMount } from "solid-js";

import { MAPBOX_TOKEN } from "shared/config/env";

import mapboxgl from "mapbox-gl";

export const Map: Component = (props) => {
  let element: HTMLElement | undefined;

  onMount(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      projection: { name: "globe" }, // display the map as a 3D globe
    });
  });

  return <section id="map" ref={element} class="w-full h-full" />;
};
