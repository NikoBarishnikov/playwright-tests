import { test } from '@playwright/test';
import { GroupsPage } from '../pages/GroupsPage';

test('Search Dresden and navigate to next page', async ({ page }) => {
  const groupsPage = new GroupsPage(page);

  await groupsPage.goto();
  await groupsPage.acceptCookies();
  await groupsPage.search('Dresden');
  await groupsPage.goToNextPage();
  await groupsPage.expectCityVisible('Dresden');
});
