const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");
// import json file
const json = require("./assets/split-test-results.json");

const parser = new xml2js.Parser();
const xml = fs.readFileSync(
  path.resolve(__dirname, "./assets/merged-jest-junit.xml"),
  "utf8"
);

const totalTime = {};

const run = async () => {
  const result = await parser.parseStringPromise(xml);
  const testsuite = result.testsuites.testsuite;

  Object.keys(json).forEach((key) => {
    const testList = json[key];
    const testFiles = testList.split(" ").filter((file) => file);
    testFiles.forEach((file) => {
      const foundTestMetric = testsuite.find((test) => test.$.name === file);
      const fileTime = foundTestMetric ? foundTestMetric.$.time : 10;
      if (foundTestMetric) {
        totalTime[key] = totalTime[key] || 0;
        totalTime[key] += Number(fileTime);
      } else {
        console.log(`${file} not found in testsuite`);
      }
    });
  });

  console.log(totalTime);
};

run();
// {
//   '0': 2557.085000000001,
//   '1': 2557.0860000000043,
//   '2': 2556.8930000000046,
//   '3': 2557.0860000000002,
//   '4': 2557.0790000000025,
//   '5': 2556.8929999999987,
//   '6': 2547.087000000001,
//   '7': 2556.894000000002,
//   '8': 2556.894000000003,
//   '9': 2556.8919999999994,
//   '10': 2556.8910000000005,
//   '11': 2557.0860000000002,
//   '12': 2556.8900000000017,
//   '13': 2556.8920000000044,
//   '14': 2547.0810000000015,
//   '15': 2557.0850000000005
// }
