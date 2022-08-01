import { createDomain, sample } from "effector";
import { hotkey } from "effector-hotkey";

import { setPayload } from "shared/lib/effector/helpers";

import { FeatureCollection, Geometry } from "geojson";
import { debug } from "patronum";

import { createHashMap } from "./lib";
// TODO find way how import geojson
// import mock from "./mock_features.json";
import { FeatureItem, OptionFit } from "./types";

const domain = createDomain("gejson");

export const nextPresed = hotkey({ key: "ArrowRight", type: "keydown" });
export const prevPresed = hotkey({ key: "ArrowLeft", type: "keydown" });

export const upload = domain.createEvent<FeatureCollection<Geometry>>();
export const geometryLIClicked = domain.createEvent<FeatureItem>();

export const next = domain.createEvent();
export const prev = domain.createEvent();

export const $currentFeature = domain.createStore<FeatureItem | null>(null);
export const $file = domain.createStore<FeatureCollection | null>(null);

export const $features = $file.map(
  (state): FeatureItem[] =>
    state?.features.map((item, id) => ({
      id,
      feature: item,
      properties: {
        fit: OptionFit.Unknown,
      },
    })) || [],
);

const $lengthFeatures = $features.map((list) => list.length);

export const $stats = $features.map((list) => {
  let fitUnknown = 0;
  let fitNo = 0;
  let fitYes = 0;

  list.forEach(({ properties }) => {
    switch (properties.fit) {
      case OptionFit.Unknown: {
        fitUnknown += 1;
        break;
      }
      case OptionFit.No: {
        fitNo += 1;
        break;
      }
      case OptionFit.Yes: {
        fitYes += 1;
        break;
      }
    }
  });

  return {
    fitYes,
    fitNo,
    fitUnknown,
    len: list.length,
  };
});

export const $hashMap = $file.map(createHashMap);

$file.on(upload, setPayload);
$currentFeature.on(geometryLIClicked, setPayload);

sample({
  clock: [next, nextPresed],
  source: { hash: $hashMap, current: $currentFeature },
  fn: ({ current, hash }) => {
    if (current) return hash[current.id + 1] || hash[0];
    return hash[0];
  },
  target: $currentFeature,
});

sample({
  clock: [prev, prevPresed],
  source: { hash: $hashMap, current: $currentFeature, len: $lengthFeatures },
  fn: ({ current, hash, len }) => {
    if (current) return hash[current.id - 1] || hash[len - 1];
    return hash[len - 1];
  },
  target: $currentFeature,
});

debug(domain);
