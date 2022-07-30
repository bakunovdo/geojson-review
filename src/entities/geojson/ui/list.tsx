import { Accessor, For, Show } from "solid-js";

import { FeatureItem } from "../types";
import { ListItem } from "./item";

export function FeaturesList(props: { items: Accessor<FeatureItem[]> }) {
  return (
    <div class="overflow-scroll">
      <Show when={props.items().length} fallback={<>Items none</>}>
        <For each={props.items()}>{(item) => <ListItem item={item} />}</For>
      </Show>
    </div>
  );
}
