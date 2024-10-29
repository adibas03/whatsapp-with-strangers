import { readFileSync } from "https://deno.land/x/deno@v1.0.4/std/node/fs.ts";
import { fileURLToPath } from "https://deno.land/x/deno@v1.0.4/std/node/url.ts";

const timezonePath = "../src/dump/time_zone.csv";
const timezoneJsonPath = "../src/data/timezones.json";

let timezonedb: String;

const loadTimezones = async function () {
  if (!timezonedb) {
    timezonedb = await readFileSync(
      fileURLToPath(new URL(timezonePath, import.meta.url)),
      {
        encoding: "utf8",
        flag: "r",
      }).toString();
  }

  const timezones = timezonedb.split(/\r\n|\n/).reduce((a, t) => {
    const tz = t.split(",");
    if (!tz[0]) {
      return a;
    }

    return {
      ...a,
      [tz[0]]: {
        country: tz[1],
        code: tz[2],
      },
    };
  }, {});

  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(timezones, null, 2));

  const file = await Deno.open(fileURLToPath(new URL(timezoneJsonPath, import.meta.url)), {
    create: true,
    write: true,
  });
  const bytesWritten = await file.write(encodedData);
  console.log("Timezones file written: ", bytesWritten, "bytes");

};

export default loadTimezones;
