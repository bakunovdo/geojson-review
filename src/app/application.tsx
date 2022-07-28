import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";

import type { Component } from "solid-js";

// import { HomePage } from "pages/home";
import { TestPage } from "pages/test";

const App: Component = () => {
  return <TestPage />;
};

export default App;
