import { Accessor, For } from "solid-js";

import { useUnit } from "effector-solid";

import { geojsonModel } from "entities/geojson";

import { FeatureItem } from "./lib";

export const FeautureList = () => {
  const list = useUnit(geojsonModel.$features);

  return <>{list().length === 0 ? <EmptyList /> : <MapperList items={list} />}</>;
};

function EmptyList() {
  return <>Empty</>;
}

function MapperList(props: { items: Accessor<FeatureItem[]> }) {
  return (
    <div class="overflow-scroll">
      <For each={props.items()}>{(geometry) => <div>{geometry.properties?.id}</div>}</For>
    </div>
  );
}
