// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({

  testDir: './tests/Playwright',

  /* Executa testes em paralelo */
  fullyParallel: true,

  /* Falha no CI se existir test.only */
  forbidOnly: !!process.env.CI,

  /* Tentativas em caso de falha */
  retries: process.env.CI ? 2 : 0,

  /* Workers */
  workers: process.env.CI ? 1 : undefined,

  /* Relatório */
  reporter: 'html',

  /* Configurações gerais */
  use: {

    // URL base do seu sistema
    baseURL: 'http://localhost:3000',

    trace: 'on-first-retry',
  },


  /* Navegadores que serão testados */
  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

  ],


  /* Caso queira subir o frontend automaticamente */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});