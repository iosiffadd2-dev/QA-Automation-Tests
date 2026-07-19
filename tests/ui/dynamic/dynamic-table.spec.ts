import { expect, test } from '../../fixtures/ad-free-test';

test('Dynamic Table page for Automation Testing Practice', async ({ page }) => {
  await page.goto('/dynamic-table');

  const table = page.locator('table');

  const columnHeaders = await table.locator('tr th').allTextContents();
  const cpuColumnIndex = columnHeaders.indexOf('CPU');

  expect(cpuColumnIndex).toBeGreaterThanOrEqual(0);

  const chromeRow = page.getByRole('row').filter({ hasText: 'Chrome' }).getByRole('cell');
  const cpuValue = (await chromeRow.nth(cpuColumnIndex).innerText()).trim();

  await expect(page.locator('#chrome-cpu')).toHaveText(`Chrome CPU: ${cpuValue}`);
});
