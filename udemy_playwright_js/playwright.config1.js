// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  retries: 1,
  workers:3,
  timeout: 35 * 1000,
  reporter: 'html',
  expect: {
    timeout: 45 * 1000
  },

  projects: [

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on',
        viewport: {width:720,height:800 },
        video:'retain-on-failure'

      }
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on'

      }
    },{
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on'

      }
    }

  ]


});