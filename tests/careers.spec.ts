import { test, expect } from '@playwright/test';

test('VacanciesPage_ShouldContainQualityPosition', async ({ page }) => {
  await page.goto('https://careers.osapiens.com/');

  const jobLinks = page.locator('div[role="row"] a.hide-sm-block.text-bold');

  // Wait until at least one job is visible
  await jobLinks.first().waitFor({ state: 'visible' });

  const titles = await jobLinks.allTextContents();

  console.log(`Number of open jobs: ${titles.length}`);

  const hasQualityJob = titles.some(t =>
    t.toLowerCase().includes('quality')
  );

  expect(hasQualityJob).toBe(true);

// - Ideas for improvement / production patterns:
// - Use Page Object or Component pattern to centralize selectors and page actions
//   (e.g., VacanciesPage with jobLinks getter and hasJobWithKeyword method)
// - Replace fragile CSS selectors with stable locators: data-testid or getByRole
// - Handle lazy loading / infinite scroll / pagination by waiting for API response or scrolling
// - Consider data-driven / parameterized tests to check multiple keywords (e.g., "quality", "developer")
// - Improve failure diagnostics by logging all job titles in assertion messages or using a custom logger
// - Prefer explicit waits / retry patterns instead of fixed timeouts to reduce flakiness

});
