import { expect, test } from '@playwright/test';

test(' @smoke health status', async ({ request }) => {
  const response = await request.get('https://practice.expandtesting.com/notes/api/health-check');
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({
    success: true,
    status: 200,
  });
});
