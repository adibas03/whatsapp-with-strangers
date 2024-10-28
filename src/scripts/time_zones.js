const timezonePath = "src/data/time_zone.csv";
let timezonedb;

const timezones = async function () {
  if (!timezonedb) {
    timezonedb = await Deno.readTextFile(timezonePath);
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
