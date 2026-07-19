import { expect, test } from '@playwright/test';
import path from 'node:path';

test('Flie Upload', async ({ page }) => {
  await page.goto('/upload');

  const filePath = path.join(process.cwd(), 'tests', 'fixtures', 'files', 'sample-upload.txt');
  const fileInput = page.getByTestId('file-input');
  const uploadButton = page.getByTestId('file-submit');
  const uploadResult = page.getByRole('main').getByRole('alert');

  await fileInput.setInputFiles(filePath);

  await expect(fileInput).toHaveValue(/sample-upload\.txt$/);
  await expect(uploadButton).toBeEnabled();

  await uploadButton.click();
  await expect(page.getByRole('heading', { name: 'File Uploaded!', exact: true })).toBeVisible();
  await expect(uploadResult).toContainText('sample-upload.txt');
});
