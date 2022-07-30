import { Accessor, For, Show } from "solid-js";

import { useUnit } from "effector-solid";

import { geojsonModel } from "..";
import { FeatureItem } from "../types";

export function FeaturesList(props: { items: Accessor<FeatureItem[]> }) {
  const onGeometryClick = useUnit(geojsonModel.geometryLIClicked);
  const currentFeature = useUnit(geojsonModel.$currentFeature);

  return (
    <div class="overflow-scroll">
      <Show when={props.items().length} fallback={<>Items none</>}>
        <For each={props.items()}>
          {(item) => (
            <div
              onClick={() => onGeometryClick(item)}
              class="p-4"
              classList={{ "bg-red-50": currentFeature()?.id === item.id }}
            >
              <h6 class="text-sm">{item.id}</h6>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
}
