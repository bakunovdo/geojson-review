import { createEvent, createStore } from "effector";
import { FeatureCollection } from "@turf/turf";

import { setPayload } from "shared/effector/helpers";

export const upload = createEvent<FeatureCollection>();

export const $file = createStore<FeatureCollection | null>(null);

$file.on(upload, setPayload);
