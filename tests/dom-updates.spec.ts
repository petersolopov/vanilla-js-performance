import { test, expect } from '@playwright/test';
import { writeToFile } from './helpers';

for (const name of ['multiple-append', 'document-fragment']) {
  test.describe(name, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/dom-updates/${name}.html`);
    });

    test('should have the correct title', async ({ page }) => {
      const title = page.getByRole('heading').getByText('multiple append | document fragment');
      await expect(title).toBeVisible();
    });

    test('should be correct', async ({ page }) => {
      const timeLocator = page.locator('.time');
      const time = await timeLocator.textContent();
      const timeInt = parseInt(time, 10);

      if (process.env.UPDATE_STATS) {
        await writeToFile(name, timeInt);
      }

      expect(timeInt).toBeGreaterThan(0);
    });

    test('should have 100,000 added items on the page', async ({ page }) => {
      const addedItems = page.locator('.item');
      expect(await addedItems.count()).toBe(100000);
    });
  });
}
