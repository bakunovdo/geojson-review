import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solidPlugin({
      extensions: [".ts", ".tsx"],
      babel: {
        presets: ["patronum/babel-preset"],
        plugins: ["effector/babel-plugin"],
      },
    }),
    tsconfigPaths(),
  ],
  server: { port: 3000 },
  build: { target: "esnext" },
});
