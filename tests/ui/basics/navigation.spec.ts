import { expect, test } from '@playwright/test';

test('@smoke navigation home to login ', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Test Login Page', exact: true }).click();
  await expect(page).toHaveURL(/.*login/);
  await expect(
    page.getByRole('heading', {
      name: 'Test Login page for Automation Testing Practice',
    }),
  ).toBeVisible();
});
