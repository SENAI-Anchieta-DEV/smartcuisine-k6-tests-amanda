import { test, expect } from '@playwright/test';

test('realizar login com sucesso', async ({ page }) => {

  await page.goto('http://localhost:3000/login');

  await page.fill('#email', 'teste@email.com');

  await page.fill('#senha', '123456');

  await page.click('button[type="submit"]');


  await expect(page).toHaveURL('http://localhost:3000/home');

});