import { createEvent, createStore } from "effector";

import { setPayload } from "shared/effector/helpers";

import { FeatureCollection, Geometry } from "geojson";
import { debug } from "patronum";

import { createHashMap } from "./lib";
// TODO find way how import geojson
// import mock from "./mock_features.json";

export const upload = createEvent<FeatureCollection<Geometry>>();

export const $file = createStore<FeatureCollection | null>(null);

export const $features = $file.map((state) => state?.features || []);

export const $hashMap = $file.map(createHashMap);

$file.on(upload, setPayload);

debug($file);
