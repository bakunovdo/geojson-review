import { createDomain, sample } from "effector";
import { hotkey } from "effector-hotkey";

import { setPayload } from "shared/lib/effector/helpers";

import { FeatureCollection, Geometry } from "geojson";
import { debug } from "patronum";

import { createHashMap } from "./lib";
// TODO find way how import geojson
// import mock from "./mock_features.json";
import { FeatureItem } from "./types";

const domain = createDomain("gejson");

export const nextPresed = hotkey({ key: "ArrowRight" });
export const prevPresed = hotkey({ key: "ArrowLeft" });

export const upload = domain.createEvent<FeatureCollection<Geometry>>();
export const geometryLIClicked = domain.createEvent<FeatureItem>();

export const next = domain.createEvent();
export const prev = domain.createEvent();

export const $currentFeature = domain.createStore<FeatureItem | null>(null);
export const $file = domain.createStore<FeatureCollection | null>(null);

export const $features = $file.map(
  (state) => state?.features.map((item, id) => ({ id, feature: item })) || [],
);

const $lengthFeatures = $features.map((list) => list.length);

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
