import type { Component } from "solid-js";

import { useUnit } from "effector-solid";

import { mapboxModel } from ".";

export const Map: Component = () => {
  const initilizeMap = useUnit(mapboxModel.initilizeMap);

  return <section id="map" ref={initilizeMap} class="w-full h-full" />;
};
