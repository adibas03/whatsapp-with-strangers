import riot from "rollup-plugin-riot";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/app.riot",
  external: ["@riotjs/hydrate", "erre", "@riotjs/route", "riot", "timezonedb"],
  output: {
    file: "public/app.js",
    format: "esm",
  },
  paths: {
    timezonedb: "./src/data/time_zone.csv",
  },
  plugins: [
    riot(),
    typescript({
      include: "./src/**",
    }),
  ],
};
