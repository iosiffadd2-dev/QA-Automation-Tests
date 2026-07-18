import { expect, test } from '@playwright/test';

test('JavaScript alert', async ({ page }) => {
  await page.goto('/js-dialogs');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am a Js Alert');

    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Js Alert', exact: true }).click();

  await expect(page.locator('#dialog-response')).toHaveText('OK');
});

test('JavaScript confirm', async ({ page }) => {
  await page.goto('/js-dialogs');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('I am a Js Confirm');

    await dialog.dismiss();
  });

  await page.getByRole('button', { name: 'Js Confirm', exact: true }).click();

  await expect(page.locator('#dialog-response')).toHaveText('Cancel');
});

test('JavaScript prompt', async ({ page }) => {
  await page.goto('/js-dialogs');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('I am a Js prompt');

    await dialog.accept('JS dialog test');
  });

  await page.getByRole('button', { name: 'Js Prompt', exact: true }).click();

  await expect(page.locator('#dialog-response')).toHaveText('JS dialog test');
});
