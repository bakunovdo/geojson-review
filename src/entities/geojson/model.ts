import { createEvent, createStore } from "effector";

import { setPayload } from "shared/effector/helpers";

import { FeatureCollection } from "@turf/turf";

export const upload = createEvent<FeatureCollection>();

export const $file = createStore<FeatureCollection | null>(null);

$file.on(upload, setPayload);
