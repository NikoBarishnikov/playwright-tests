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
    const banner = this.page.locator('#uc-main-dialog');
  
    try {
      // Wait up to 10 seconds for the accept button to appear
      await acceptButton.waitFor({ state: 'visible', timeout: 10000 });
  
      // Click safely even if partially hidden
      await acceptButton.click({ force: true });
  
      // Wait for banner to disappear (hidden or detached)
      try {
        await banner.waitFor({ state: 'hidden', timeout: 5000 });
      } catch {
        // If banner already gone, continue
      }
  
    } catch {
      console.log('Cookies banner not found or already accepted');
    }
  }
  
  // Expand the "More Filters" section if visible
  async expandMoreFilters() {
    await this.mehrFilterButton.click();
  
    await this.page
      .locator('label:text-is("Format der Gruppe")')
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  // Select a group format from the dropdown
  async selectGroupFormat(format: string) {
    await this.groupFormatDropdown.click();

    const option = this.page
      .locator('[id$="OptionsContainer"]:visible')
      .getByText(format, { exact: true });
  
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click()
  }

  async searchCityExact(city: string) {
    await this.searchInput.fill(city);
  
    const options = this.page.locator('#awesomplete_list_1 li');
    await options.first().waitFor({ state: 'attached', timeout: 5000 });
  
    const count = await options.count();
    let found = false;
  
    for (let i = 0; i < count; i++) {
      const option = options.nth(i);
      const text = (await option.innerText()).trim();
      if (text === city) {
        await option.click({ force: true }); 
        found = true;
        break;
      }
    }
  
    if (!found) {
      console.log(`City "${city}" not found as exact match in autocomplete list.`);
    }
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

