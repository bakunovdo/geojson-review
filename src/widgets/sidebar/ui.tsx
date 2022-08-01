import { useUnit } from "effector-solid";

import { FeaturesList, fitStyles, geojsonModel, OptionFit } from "entities/geojson";

import { parseJsonFile } from "shared/parser/json";
import { InputChangeEvent } from "shared/types/solid";

import { FeatureCollection } from "geojson";

export const Sidebar = () => {
  const [list, stats] = useUnit([geojsonModel.$features, geojsonModel.$stats]);
  const [file, upload] = useUnit([geojsonModel.$file, geojsonModel.upload]);

  const onChange = async (e: InputChangeEvent) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    const gejson = await parseJsonFile<FeatureCollection>(files[0]);
    if (gejson.type === "FeatureCollection") upload(gejson);
  };

  return (
    <div class="w-64 flex-shrink-0 h-full bg-slate-50 p-4 flex flex-col space-y-4">
      <div class="self-end">
        <button class="btn">Close</button>
      </div>
      <div class="mt-4 w-fit mx-auto">
        <label class="btn " for="upload">
          Upload GeoJSON
        </label>
        <input id="upload" class="hidden" type="file" onChange={onChange} />
      </div>

      <FeaturesList items={list} />

      {file() && (
        <div class="mt-auto font-bold text-sm flex flex-1 justify-between">
          <div>
            <span class={fitStyles[OptionFit.Unknown]}>{stats().fitUnknown}</span> /{" "}
            <span class={fitStyles[OptionFit.No]}>{stats().fitNo}</span> /{" "}
            <span class={fitStyles[OptionFit.Yes]}>{stats().fitYes}</span>
          </div>
          <div>{stats().len}</div>
        </div>
      )}
    </div>
  );
};
