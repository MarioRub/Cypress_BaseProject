const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    RETRIES: 2,
    TAGS: 'not @ignore',
  },
  projectId: 'pyqq4p',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://www.google.com/',
    excludeSpecPattern: ['*.js', '*.md'],
    specPattern: 'cypress/e2e/features/*.feature',
  },
})
