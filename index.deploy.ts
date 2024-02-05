import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { copy } from "https://deno.land/std@0.214.0/fs/copy.ts";
import { emptyDir } from "https://deno.land/std@0.214.0/fs/empty_dir.ts";
import { template } from "https://cdn.pika.dev/lodash-es";
import { renderAsyncFragments } from "@riotjs/ssr";
import deployConfig from "./riot.deploy-config.js";
import RootComponent from "./public/app.js";
import routes from "./src/routes.ts";

const app = new Application();
const page = await Deno.readTextFile("./index.html");


// generate the initial state
const initialState = {
  initialRoute: "/",
  base: `${deployConfig.scheme}://${deployConfig.host}`,
  routes,
};

// generate the rendered html + css
const { html, css } = await renderAsyncFragments(
  "app",
  RootComponent,
  initialState
);

// render the body
const parsedHtml = template(page)({
  html,
  css,
  initialState: JSON.stringify(initialState),
});

const encoder = new TextEncoder();
const data = encoder.encode(parsedHtml);

await emptyDir(deployConfig.outDir);
console.log(`Empty ${deployConfig.outDir} folder`)

const file = await Deno.open(`${deployConfig.outDir}/index.html`, {
  create: true,
  write: true,
});
const bytesWritten = await file.write(data);
console.log("Index file written: ", bytesWritten, "bytes");

console.log("Copying resources");
await Promise.all(
  deployConfig.include.map(async (d) => {
    await copy(`${d}`, `${deployConfig.outDir}/${d}`, {
      overwrite: true,
    });
    console.log(d);
  })
);

console.log("Deployment files built");
