import { useUnit } from "effector-solid";

import { geojsonModel } from "entities/geojson";
import { mapboxModel } from "entities/mapbox";

export const Controls = () => {
  const controls = useUnit({
    in: mapboxModel.zoomIn,
    out: mapboxModel.zoomOut,
    next: geojsonModel.next,
    prev: geojsonModel.prev,
  });

  return (
    <div class="absolute inset-0 z-10">
      <div class="absolute right-4 top-1/2 flex flex-col text-lg space-y-4 -translate-y-1/2">
        <button class="btn bg-slate-200" onClick={controls.in}>
          +
        </button>
        <button class="btn bg-slate-200" onClick={controls.out}>
          -
        </button>
      </div>

      <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
        <button class="btn bg-slate-200" onClick={() => controls.prev()}>
          {"<-"}
        </button>
        <button class="btn bg-slate-200" onClick={() => controls.next()}>
          {"->"}
        </button>
      </div>
    </div>
  );
};
