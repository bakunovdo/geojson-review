import { Component, createEffect, createMemo, Match, Switch } from "solid-js";

import { useUnit } from "effector-solid";

import { FeatureItem, geojsonModel } from "..";
import { OptionFit } from "../types";
import { fitStyles } from "./styles";

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
      class="p-4 flex items-center justify-between"
      classList={{ "bg-red-50": isActive() }}
      ref={ref}
    >
      <h6 class="text-sm">{props.item.id}</h6>
      <Switch>
        <Match when={props.item.properties.fit === OptionFit.Unknown}>
          <div class={fitStyles[OptionFit.Unknown]}>U</div>
        </Match>
        <Match when={props.item.properties.fit === OptionFit.No}>
          <div class={fitStyles[OptionFit.No]}>N</div>
        </Match>
        <Match when={props.item.properties.fit === OptionFit.Yes}>
          <div class={fitStyles[OptionFit.Yes]}>Y</div>
        </Match>
      </Switch>
    </div>
  );
};
