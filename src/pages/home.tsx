import { Component } from "solid-js";

import { Map } from "widgets/mapbox";
import { Sidebar } from "widgets/sidebar/ui";

export const HomePage: Component = () => {
  return (
    <div class="w-full h-screen flex relative">
      <Sidebar />
      <Map />
    </div>
  );
};
