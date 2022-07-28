import { useUnit } from "effector-solid";
import { FeatureCollection } from "@turf/turf";

import { geojsonModel } from "entities/geojson";

import { parseJsonFile } from "shared/parser/json";
import { InputChangeEvent } from "shared/types/solid";

export const Sidebar = () => {
  const [file, upload] = useUnit([geojsonModel.$file, geojsonModel.upload]);

  const onChange = async (e: InputChangeEvent) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    const gejson = await parseJsonFile<FeatureCollection>(files[0]);
    if (gejson.type === "FeatureCollection") upload(gejson);
  };

  return (
    <div class="w-64 flex-shrink-0 h-full bg-slate-50 p-4 flex flex-col">
      <div class="self-end">
        <button class="btn">Close</button>
      </div>
      <div class="mt-4 w-fit mx-auto">
        <label class="btn " for="upload">
          Upload GeoJSON
        </label>
        <input id="upload" class="hidden" type="file" onChange={onChange} />
      </div>
      {file() && (
        <div class="mt-auto mx-auto font-bold text-sm">
          All features: {file()?.features?.length}
        </div>
      )}
    </div>
  );
};
