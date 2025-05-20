const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      on("after:run", (results) => {
        console.log("🚀 Testes concluídos!");
        console.log(`Total de testes executados: ${results.totalTests}`);
      });

      return config;
    },




    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "mochawesome-report",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      screenshots: true,
      timestamp: "mmddyyyy_HHMMss"
    },

    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false
  },

  projectId: "7micw6"
});
