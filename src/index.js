const fs = require("fs");

function createCypressJSONResults(options = {}) {
  const defaultFilesData = {
    fileName: "results.json",
  };

  options = {
    ...defaultFilesData,
    ...options
  };

  if (!options.on) {
    throw new Error(
      "Option: on is mandatory while declaring the plugin in plugin files"
    );
  }

  let results;

  options.on("before:run", () => {
    results = {};
  });

  options.on("after:spec", (spec, resultsData) => {
    results[spec.relative] = {};
    const specsDetails = results[spec.relative];

    resultsData.tests.forEach((test) => {
      let state = test.state;
      state = state.charAt(0).toUpperCase() + state.substr(1);
      specsDetails[test.title.join(" : ")] = state;
    });
  });
  // spec will look something like this:
  // {
  //   name: 'login_spec.js',
  //   relative: 'cypress/integration/login_spec.js',
  //   absolute: '/Users/janelane/my-app/cypress/integration/login_spec.js',
  // }

  // results will look something like this:
  // {
  //   stats: {
  //     suites: 0,
  //     tests: 1,
  //     passes: 1,
  //     pending: 0,
  //     skipped: 0,
  //     failures: 0,
  //     // ...more properties
  //   }
  //   reporter: 'spec',
  //   tests: [
  //     {
  //       title: ['login', 'logs user in'],
  //       state: 'passed',
  //       body: 'function () {}',
  //       // ...more properties...
  //     }
  //   ],
  //   error: null,
  //   video: '/Users/janelane/my-app/cypress/videos/login_spec.js.mp4',
  //   screenshots: [],
  //   // ...more properties...
  // }

  options.on("after:run", (resultsData) => {
    // results will look something like this when run via `cypress run`:
    // {
    //   totalDuration: 81,
    //   totalSuites: 0,
    //   totalTests: 1,
    //   totalFailed: 0,
    //   totalPassed: 1,
    //   totalPending: 0,
    //   totalSkipped: 0,
    //   browserName: 'electron',
    //   browserVersion: '59.0.3071.115',
    //   osName: 'darwin',
    //   osVersion: '16.7.0',
    //   cypressVersion: '3.1.0',
    //   config: {
    //     projectId: '1qv3w7',
    //     baseUrl: 'http://example.com',
    //     viewportWidth: 1000,
    //     viewportHeight: 660,
    //     // ... more properties...
    //   }
    //   // ... more properties...
    //   }
    // }
    results.totals = {
      suites: resultsData.totalSuites,
      tests: resultsData.totalTests,
      failed: resultsData.totalFailed,
      passed: resultsData.totalPassed,
      pending: resultsData.totalPending,
      skipped: resultsData.totalSkipped,
    };

    const stringify = JSON.stringify(results, null, 2);
    fs.writeFileSync(options.fileName, `${stringify}\n`);
    console.log(`JSON result available at  ${options.fileName}`);
  });
}
module.exports = createCypressJSONResults;