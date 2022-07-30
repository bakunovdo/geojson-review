import { Component, createEffect, createMemo } from "solid-js";

import { useUnit } from "effector-solid";

import { FeatureItem, geojsonModel } from "..";

export const ListItem: Component<{ item: FeatureItem }> = (props) => {
  const onGeometryClick = useUnit(geojsonModel.geometryLIClicked);
  const currentFeature = useUnit(geojsonModel.$currentFeature);

  let ref: HTMLDivElement | undefined;

  const isActive = createMemo(() => currentFeature()?.id === props.item.id);

  createEffect(() => {
    if (isActive() && ref) ref.scrollIntoView({ block: "nearest", behavior: "auto" });
  });

  return (
    <div
      onClick={() => onGeometryClick(props.item)}
      class="p-4"
      classList={{ "bg-red-50": isActive() }}
      ref={ref}
    >
      <h6 class="text-sm">{props.item.id}</h6>
    </div>
  );
};
