import { expect, test } from '../../fixtures/ad-free-test';

test('error for an invalid username', async ({ page }) => {
  await page.goto('/login');

  const passwordTest = 'SuperSecretPassword!';
  const usernameTestfail = 'BadUsername';
  const usernameField = page.getByLabel('Username', { exact: true });
  const passwrodField = page.getByLabel('Password', { exact: true });
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  await usernameField.fill(usernameTestfail);
  await passwrodField.fill(passwordTest);
  await loginButton.click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('alert')).toContainText('Your username is invalid!');
});

test('successful login', async ({ page }) => {
  await page.goto('/login');

  const passwordTest = 'SuperSecretPassword!';
  const usernameTest = 'practice';
  const usernameField = page.getByLabel('Username', { exact: true });
  const passwrodField = page.getByLabel('Password', { exact: true });
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  const logoutButton = page.getByRole('link', { name: 'Logout', exact: true });

  await usernameField.fill(usernameTest);
  await passwrodField.fill(passwordTest);
  await loginButton.click();
  await expect(page).toHaveURL(/\/secure$/);
  await expect(page.getByRole('alert')).toContainText('You logged into a secure area!');
  await logoutButton.click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('alert')).toContainText('You logged out of the secure area!');
});
