import type { Component } from "solid-js";

import { useUnit } from "effector-solid";

import { mapboxModel } from "entities/mapbox";

import { Controls } from "./controls";

export const Map: Component = () => {
  const initilizeMap = useUnit(mapboxModel.initilizeMapFx);

  return (
    <section id="map" ref={initilizeMap} class="w-full h-full relative">
      <Controls />
    </section>
  );
};
