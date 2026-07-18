import { expect, test } from '@playwright/test';

test('Check boxes', async ({ page }) => {
  await page.goto('/checkboxes');

  const firstCheckbox = page.getByLabel('Checkbox 1', { exact: true });
  const secondCheckbox = page.getByLabel('Checkbox 2', { exact: true });
  await expect(firstCheckbox).not.toBeChecked();
  await expect(secondCheckbox).toBeChecked();

  await firstCheckbox.check();
  await secondCheckbox.uncheck();

  await expect(firstCheckbox).toBeChecked();
  await expect(secondCheckbox).not.toBeChecked();
});
