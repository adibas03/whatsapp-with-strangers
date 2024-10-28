import riot from "rollup-plugin-riot";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    file: "public/main.js",
    format: "esm",
  },
  external: ["fs"],
  onwarn: function (error) {
    if (/Circular dependency/.test(error.message)) return;
    console.error(error.message);
  },
  logLevel: "info",
  plugins: [
    commonjs({
      ignore: ["url"],
    }),
    nodeResolve(),
    riot(),
    typescript({
      include: "./src/**",
    }),
  ],
};
