import riot from "rollup-plugin-riot";
import typescript from "@rollup/plugin-typescript";
import pluginjson from "@rollup/plugin-json";

export default {
  input: "src/app.riot",
  external: ["@riotjs/hydrate", "erre", "@riotjs/route", "riot"],
  output: {
    file: "public/app.js",
    format: "esm",
  },
  plugins: [
    riot(),
    pluginjson(),
    typescript({
      include: "./src/**",
    }),
  ],
};
