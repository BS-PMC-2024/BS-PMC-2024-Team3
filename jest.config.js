module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "./reports/junit", outputName: "js-test-results.xml" },
    ],
  ],
};
