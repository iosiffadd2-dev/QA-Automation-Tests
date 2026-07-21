import { expect, test } from '@playwright/test';
import { loadEnvironment } from '../../utils/environment';

const environment = loadEnvironment();

test(' @smoke Notes API reports healthy status', async ({ request }) => {
  const response = await request.get(`${environment.notesApiBaseUrl}/health-check`);
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({
    success: true,
    status: 200,
  });
});
