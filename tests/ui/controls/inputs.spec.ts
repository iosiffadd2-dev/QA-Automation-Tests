import { expect, test } from '@playwright/test';

test('fill display and cear inputs', async ({ page }) => {
  await page.goto('/inputs');

  const numberFill = '123';
  const textFill = 'test input text';
  const passwordFill = 'test input password';
  const dateFill = '2026-07-18';
  const numberInput = page.getByLabel('Input: Number');
  const textInput = page.getByLabel('Input: Text');
  const passwordInput = page.getByLabel('Input: Password');
  const dateInput = page.getByLabel('Input: Date');

  await numberInput.fill(numberFill);
  await textInput.fill(textFill);
  await passwordInput.fill(passwordFill);
  await dateInput.fill(dateFill);

  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.locator('#output-number')).toHaveText(numberFill);
  await expect(page.locator('#output-text')).toHaveText(textFill);
  await expect(page.locator('#output-password')).toHaveText(passwordFill);
  await expect(page.locator('#output-date')).toHaveText(dateFill);

  await page.getByRole('button', { name: 'Clear Inputs' }).click();

  await expect(numberInput).toHaveValue('');
  await expect(textInput).toHaveValue('');
  await expect(passwordInput).toHaveValue('');
  await expect(dateInput).toHaveValue('');
});
