import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { babel } from "@rollup/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({ extensions: [".ts, .tsx"], babelHelpers: "bundled", include: "src/**" }),
    solidPlugin(),
    tsconfigPaths(),
  ],
  server: { port: 3000 },
  build: { target: "esnext" },
});
