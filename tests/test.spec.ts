import {test,expect} from '@playwright/test'

test.only('has title',async ({page})=>{
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);

})

test.only('has link', async({page})=>{
    await page.goto('https://playwright.dev/')

    await page.getByRole('link',{name:'Get started'}).click();

    await expect(page.getByRole('heading',{name:'Installation'})).toBeVisible();
})



test.only('test', async ({ page }) => {
  await page.goto('https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/');
  await page.getByRole('button', { name: 'Accept All' }).click({ timeout: 10000, force: true });
  await page.getByRole('combobox', { name: 'Bitte Ort oder Postleitzahl' }).click();
  await page.getByRole('combobox', { name: 'Bitte Ort oder Postleitzahl' }).fill('Berlin Mitte');
  await page.getByRole('button', { name: 'Gruppen suchen' }).click();
});
