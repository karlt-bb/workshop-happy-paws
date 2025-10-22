const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true
  },
  reporter: 'line'
})

