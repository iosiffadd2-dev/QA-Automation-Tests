import { expect, test } from '@playwright/test';
import { loadEnvironment } from '../../utils/environment';

test('uses safe public defaults', () => {
  expect(loadEnvironment({})).toEqual({
    webBaseUrl: 'https://practice.expandtesting.com',
    notesApiBaseUrl: 'https://practice.expandtesting.com/notes/api',
  });
});

test('removes a trailing slash from configured URLs', () => {
  expect(
    loadEnvironment({
      WEB_BASE_URL: 'https://example.test/',
      NOTES_API_BASE_URL: 'https://api.example.test/',
    }),
  ).toEqual({
    webBaseUrl: 'https://example.test',
    notesApiBaseUrl: 'https://api.example.test',
  });
});

test('rejects non-HTTP URLs', () => {
  expect(() =>
    loadEnvironment({
      WEB_BASE_URL: 'file:///tmp/app',
    }),
  ).toThrow('WEB_BASE_URL must use http or https');
});
