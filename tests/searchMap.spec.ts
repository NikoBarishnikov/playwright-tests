import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';

test.describe('Search Map Tests', () => {
  test.skip('Search for Dresden groups', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // Navigate to the page
    await page.goto('https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/');


    // Accept cookies
    await searchPage.acceptCookies();

    // Enter the city
    await searchPage.searchCityExact('Berlin');

    await searchPage.expandFilters();

    // Wait for results to appear on the map
    await searchPage.waitForResults();

    // Check that there are results
    const count = await searchPage.getResultsCount();
    expect(count).toBeGreaterThan(0);

    await searchPage.logAllResultsText();

    // Check the text of the first result
    await searchPage.expectFirstResultToContain('Berlin');
  });
});

