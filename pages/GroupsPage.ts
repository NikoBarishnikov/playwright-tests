import { Page, Locator, expect } from '@playwright/test';

export class GroupsPage {
  readonly page: Page;
  readonly cityInput: Locator;
  readonly searchButton: Locator;
  readonly nextPageButton: Locator;
  readonly mapComponent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cityInput = page.getByRole('combobox', { name: 'Bitte Ort oder Postleitzahl' });
    this.searchButton = page.getByRole('button', { name: 'Gruppen suchen' });
    this.nextPageButton = page.getByRole('button', { name: 'go to next page' });
    this.mapComponent = page.locator('#MapComponent');
  }

  async goto() {
    await this.page.goto('https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/');
  }

  async acceptCookies() {
    await this.page.getByRole('button', { name: 'Accept All' })
      .click({ timeout: 10000, force: true });
  }

  async search(city: string) {
    await this.cityInput.fill(city);
    await this.searchButton.click();
  }

  async goToNextPage() {
    await this.nextPageButton.click();
  }

  async expectCityVisible(city: string) {
    await expect(this.mapComponent).toContainText(city);
  }
}
