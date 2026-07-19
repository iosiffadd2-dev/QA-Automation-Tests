import { expect, test as base } from '@playwright/test';

const blockedDomains = [
  'doubleclick.net',
  'googlesyndication.com',
  'googleadservices.com',
  'fundingchoicesmessages.google.com',
];

function shouldBlockRequest(requestUrl: string): boolean {
  const hostname = new URL(requestUrl).hostname;

  return blockedDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
}

export const test = base.extend({
  page: async ({ context, page }, use) => {
    await context.route('**/*', async (route) => {
      if (shouldBlockRequest(route.request().url())) {
        await route.abort('blockedbyclient');
        return;
      }

      await route.continue();
    });

    await use(page);
  },
});

export { expect };
