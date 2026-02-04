import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly groupFormatDropdown: Locator;
  readonly mapListItems: Locator;
  readonly searchInput: Locator;
  readonly mehrFilterButton: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.groupFormatDropdown = page.locator('#b4-b1-b15-selectInputReduced');
    this.mapListItems = page.locator('.map-list-item');
    this.searchInput = page.locator('#b4-b2-b1-Input_SearchText');
    this.mehrFilterButton = page.locator('div:text-is("Mehr Filter anzeigen")');
    this.searchButton = page.locator('#b4-b2-b1-Button_Search'); 
  }

  // Accept cookies if the banner is visible
  async acceptCookies() {
    const acceptButton = this.page.locator('#accept');
  
    try {
      await acceptButton.waitFor({ state: 'visible', timeout: 5000 });
      await acceptButton.click({ force: true });
      await this.page.waitForSelector('#uc-main-dialog', { state: 'detached', timeout: 5000 });
    } catch (e) {
      console.log('Cookies banner not found or already accepted');
    }
  }
  
  // Expand the "More Filters" section if visible
  async expandMoreFilters() {
    if (await this.mehrFilterButton.isVisible()) {
      await this.mehrFilterButton.scrollIntoViewIfNeeded();
      await this.mehrFilterButton.click();
      await this.page.waitForTimeout(300);
    }
  }

  // Select a group format from the dropdown
  async selectGroupFormat(format: string) {
    await this.groupFormatDropdown.scrollIntoViewIfNeeded();
    await this.groupFormatDropdown.click();

    const option = this.page.locator(`.dropdown-popup-row span:text-is("${format}")`);
    await option.waitFor({ state: 'visible', timeout: 5000 });

    // Ensure the option is visible and has non-zero size
    await option.evaluate(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        throw new Error(`Option "${format}" is invisible or has zero size`);
      }
    });

    await option.scrollIntoViewIfNeeded();
    await option.click({ force: true });
    await this.page.waitForTimeout(2000);
  }

  // Enter city and select from autocomplete by exact match
  async searchCityExact(city: string) {
    // Fill the input
    await this.searchInput.fill(city);

    // Wait for the autocomplete list to appear
    const options = this.page.locator('#awesomplete_list_1 li');
    await options.first().waitFor({ state: 'visible', timeout: 5000 });

    const count = await options.count();
    let found = false;

    for (let i = 0; i < count; i++) {
      const option = options.nth(i);
      const text = (await option.innerText()).trim(); // Get text without spaces
      if (text === city) { // exact match
        await option.click();
        found = true;
        break;
      }
    }

    if (!found) {
      console.log(`City "${city}" not found as exact match in autocomplete list.`);
    }

    // Pause to allow any animations to complete
    await this.page.waitForTimeout(200);
  }

  // Click the search button
  async clickSearch() {
    await this.searchButton.scrollIntoViewIfNeeded();
    await this.searchButton.click();
  }

  // Wait for map results to appear
  async waitForResults() {
    await this.mapListItems.first().waitFor({ state: 'visible', timeout: 30000 });
  }

  // Get the number of search results
  async getResultsCount() {
    return await this.mapListItems.count();
  }

  // Get text content of the first result
  async firstResultContains(text: string) {
    return await this.mapListItems.first().textContent();
  }

  // Wait for the specified time (ms)
  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}

