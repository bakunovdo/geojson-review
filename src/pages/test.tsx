import { Component, onCleanup } from "solid-js";

import { createEvent, createStore } from "effector";
import { useUnit } from "effector-solid";

import { geojsonModel } from "entities/geojson";

import { debug } from "patronum";

export const buttonClicked = createEvent();
export const tick = createEvent();

export const $counter = createStore(0);

$counter.on([tick, buttonClicked], (counter) => counter + 1);

debug($counter);

export const TestPage: Component = () => {
  const [counter, onTick] = useUnit([$counter, tick]);

  const id = setInterval(onTick, 1000);
  onCleanup(() => clearInterval(id));

  return (
    <div class="p-8">
      counter: {counter()}
      <div class="mt-8">
        <h4 class="font-bold">from domain</h4>
        <div>counter sid: {$counter.sid || "undefined"}</div>
      </div>
      <div class="mt-8">
        <h4 class="font-bold">directly from effector</h4>
        <div>file sid : {geojsonModel.$file.sid || "undefined"}</div>
      </div>
    </div>
  );
};
