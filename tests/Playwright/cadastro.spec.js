import { test, expect } from '@playwright/test';

test('realizar cadastro com sucesso', async ({ page }) => {

    // abrir sistema
    await page.goto('http://localhost:3000/cadastro');


    // preencher formulário
    await page.fill('#nome', 'Amanda Teste');

    await page.fill('#email', 'amanda.teste@email.com');

    await page.fill('#senha', '123456');


    // clicar cadastrar
    await page.click('button[type="submit"]');


    // validar resultado
    await expect(page).toHaveURL('http://localhost:3000/cadastro');

});