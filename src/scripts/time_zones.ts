import * as fs from "https://deno.land/x/deno@v1.0.4/std/node/fs.ts";

const timezonePath = "src/data/time_zone.csv";
let timezonedb: String;

const timezones = async function () {
  if (!timezonedb) {
    timezonedb = await fs.readFileSync(timezonePath, {
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

  return timezones;
};

export default await timezones();
