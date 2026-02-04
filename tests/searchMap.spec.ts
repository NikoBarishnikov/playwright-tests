import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';

test.describe('Search Map Tests', () => {
  test('Search for Berlin groups', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // Navigate to the page
    await page.goto('https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/');

    await searchPage.wait(15000); 

    // Accept cookies
    await searchPage.acceptCookies();

    // Enter the city
    await searchPage.searchCityExact('Dresden');

    // Expand additional filters
    await searchPage.expandMoreFilters();

    // Select the group format
    await searchPage.selectGroupFormat('Vor-Ort'); // or 'Online'

    // Wait for results to appear on the map
    await searchPage.waitForResults();

    // Check that there are results
    const count = await searchPage.getResultsCount();
    expect(count).toBeGreaterThan(0);

    // Check the text of the first result
    const firstText = await searchPage.firstResultContains('Dresden');
    expect(firstText).toContain('Dresden');
  });
});

