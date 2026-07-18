import { expect, test } from '@playwright/test';

test('Selects Dropdowns', async ({ page }) => {
  await page.goto('/dropdown');

  await page.locator('#dropdown').selectOption('Option 2');
  await page.getByLabel('Elements per Page:', { exact: true }).selectOption('50');
  await page.locator('#country').selectOption({label:'Romania'});

  await expect(page.locator('#dropdown')).toHaveValue('2');
  await expect(page.getByLabel('Elements per Page:', { exact: true })).toHaveValue('50');
  await expect(page.locator('#country')).toHaveValue('RO');
});
