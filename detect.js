const fs = require("fs");

const runningTestFiles = [];
const passedTestFiles = [];

function readTextFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("Running test file: ")) {
        const testName = lines[i].split(" ")[3];
        const testNameWithoutPath = testName.replace(
          "/home/runner/_work/frontend-core/frontend-core/apps/hr-web-app/",
          ""
        );
        runningTestFiles.push(testNameWithoutPath);
      }

      if (lines[i].startsWith(" PASS  ")) {
        const testName = lines[i].split(" ")[3];
        passedTestFiles.push(testName);
      }
    }

    const difference = runningTestFiles.filter(
      (file) => !passedTestFiles.includes(file)
    );
    console.log(difference);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

const text = readTextFile("./testfile.txt");
