import { expect, test } from '@playwright/test';

test('@smoke add and remove elements', async ({ page }) => {
  await page.goto('/add-remove-elements');
  await expect(
    page.getByRole('heading', {
      name: 'Add/Remove Elements page for Automation Testing Practice',
    }),
  ).toBeVisible();

  const NumberOfClicks = 5;
  const DeleteButtons = page.getByRole('button', { name: ' Delete', exact: true });
  const AddElements = page.getByRole('button', { name: 'Add Element', exact: true });

  await expect(DeleteButtons).toHaveCount(0);
  for (let click = 0; click < NumberOfClicks; click++) {
    await AddElements.click();
  }

  await expect(DeleteButtons).toHaveCount(NumberOfClicks);
  for (let click = 0; click < NumberOfClicks; click++) {
    await DeleteButtons.first().click();
  }
  await expect(DeleteButtons).toHaveCount(0);
});
