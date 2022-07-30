import { useUnit } from "effector-solid";

import { mapboxModel } from "entities/mapbox";

export const Controls = () => {
  const controls = useUnit({ in: mapboxModel.zoomIn, out: mapboxModel.zoomOut });

  return (
    <div class="absolute right-4 top-1/2 z-10 flex flex-col text-lg space-y-4 -translate-y-1/2">
      <button class="btn bg-slate-200" onClick={controls.in}>
        +
      </button>
      <button class="btn bg-slate-200" onClick={controls.out}>
        -
      </button>
    </div>
  );
};
