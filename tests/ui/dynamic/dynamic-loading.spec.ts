import { expect, test } from '../../fixtures/ad-free-test';

test('Dynamic loading: element on the page is hidden', async ({ page }) => {
  await page.goto('/dynamic-loading/1');

  const helloWorld = page.locator('#finish');

  await expect(helloWorld).toHaveCount(1);
  await expect(helloWorld).toBeHidden();
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(helloWorld).toBeVisible({
    timeout: 10_000,
  });
});

test('Dynamic loading: Element rendered after the fact', async ({ page }) => {
  await page.goto('/dynamic-loading/2');

  const helloWorld = page.getByRole('heading', { name: 'Hello World!', exact: true });

  await expect(helloWorld).toHaveCount(0);
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await expect(helloWorld).toBeVisible({
    timeout: 10_000,
  });
});
