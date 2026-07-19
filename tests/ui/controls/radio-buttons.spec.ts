import { expect, test } from '@playwright/test';

test('Radio Buttons', async ({ page }) => {
  await page.goto('/radio-buttons');

  const blueRaddioButton = page.getByRole('radio', { name: 'blue' });
  const redRaddioButton = page.getByRole('radio', { name: 'red' });
  const yellowRaddioButton = page.getByRole('radio', { name: 'yellow' });
  //const blackRaddioButton = page.getByRole('radio', { name: 'black' });
  const greenRaddioButton = page.locator('#green');

  const basketballRaddioButton = page.getByRole('radio', { name: 'basketball' });
  const footballkRaddioButton = page.getByRole('radio', { name: 'football' });
  const tenniskRaddioButton = page.getByRole('radio', { name: 'tennis' });

  await expect(blueRaddioButton).toBeChecked();
  await expect(tenniskRaddioButton).toBeChecked();

  await redRaddioButton.check();
  await expect(redRaddioButton).toBeChecked();
  await expect(yellowRaddioButton).not.toBeChecked();

  await footballkRaddioButton.check();
  await expect(footballkRaddioButton).toBeChecked();
  await expect(basketballRaddioButton).not.toBeChecked();

  await expect(greenRaddioButton).toBeDisabled();
  await expect(greenRaddioButton).not.toBeChecked();
});
