import {test,expect} from '@playwright/test'

test.describe('Search Tests', () => {
  test('has title',async ({page})=>{
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);

})

  test('has link', async({page})=>{
    await page.goto('https://playwright.dev/')

    await page.getByRole('link',{name:'Get started'}).click();

    await expect(page.getByRole('heading',{name:'Installation'})).toBeVisible();
})



 test.only('test', async ({ page }) => {
  await page.goto('https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/');
  await page.getByRole('button', { name: 'Accept All' }).click({ timeout: 10000, force: true });
  await page.getByRole('combobox', { name: 'Bitte Ort oder Postleitzahl' }).click();
  await page.getByRole('combobox', { name: 'Bitte Ort oder Postleitzahl' }).fill('Dresden');
  await page.getByRole('button', { name: 'Gruppen suchen' }).click();
  await page.getByRole('button', { name: 'go to next page' }).click();
  await expect(page.locator('#MapComponent')).toContainText('Dresden');
});
});
