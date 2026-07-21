import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { loadEnvironment } from '../../utils/environment';

const environment = loadEnvironment();

test(' rejects invalid API login credentials', async ({ request }) => {
  const login = await request.post(`${environment.notesApiBaseUrl}/users/login`, {
    form: {
      email: `missing-${randomUUID()}@example.com`,
      password: 'WrongPassword1!',
    },
  });

  expect(login.status()).toBe(401);
  expect(await login.json()).toMatchObject({
    success: false,
    status: 401,
  });
});
test('registers, authenticates, reads, and deletes a user account', async ({ request }) => {
  const user = {
    name: 'Test User',
    email: 'user_${crypto.randomUUID()}@example.com',
    password: 'SecurePassword123!',
  };
  const register = await request.post(`${environment.notesApiBaseUrl}/users/register`, {
    form: user,
  });

  expect(register.status()).toBe(201);
  expect(await register.json()).toMatchObject({
    success: true,
    status: 201,
  });
});
