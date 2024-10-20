import { test, expect } from '@playwright/test';
import { writeToFile } from './helpers';

const MULTIPLE_APPEND_HTML_NAME = 'multiple-append';
const DOCUMENT_FRAGMENT_HTML_NAME = 'document-fragment';

const testNames = [MULTIPLE_APPEND_HTML_NAME, DOCUMENT_FRAGMENT_HTML_NAME];

async function getTimeInt(page) {
  const timeLocator = page.locator('.time');
  const time = await timeLocator.textContent();
  return parseInt(time, 10);
}

test.describe('DOM updates', () => {
  for (const name of testNames) {
    test.describe(name, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/dom-updates/${name}.html`);
      });

      test('should have correct time', async ({ page }) => {
        const timeInt = await getTimeInt(page);

        if (process.env.UPDATE_STATS) {
          await writeToFile(name, timeInt);
        }

        expect(timeInt).toBeGreaterThan(0);
      });

      test('should have 100,000 added items on the page', async ({ page }) => {
        const addedItems = page.locator('.item');
        await expect(addedItems).toHaveCount(100000);
      });
    });
  }

  test.describe('titles validation', () => {
    test('should have the correct title in multiple append page', async ({ page }) => {
      await page.goto(`/dom-updates/${MULTIPLE_APPEND_HTML_NAME}.html`);
      const title = page.getByRole('heading', { name: 'Multiple Append' });
      await expect(title).toBeVisible();
    });

    test('should have the correct title in document fragment page', async ({ page }) => {
      await page.goto(`/dom-updates/${DOCUMENT_FRAGMENT_HTML_NAME}.html`);
      const title = page.getByRole('heading', { name: 'Document Fragment' });
      await expect(title).toBeVisible();
    });
  });

  test('should have times within 20% difference', async ({ page }) => {
    await page.goto(`/dom-updates/${MULTIPLE_APPEND_HTML_NAME}.html`);
    const multipleAppendTime = await getTimeInt(page);

    await page.goto(`/dom-updates/${DOCUMENT_FRAGMENT_HTML_NAME}.html`);
    const documentFragmentTime = await getTimeInt(page);

    if (!multipleAppendTime || !documentFragmentTime) {
      throw new Error('Times for both tests are not available');
    }

    const diff = Math.abs(multipleAppendTime - documentFragmentTime);
    const average = (multipleAppendTime + documentFragmentTime) / 2;
    const diffPercentage = (diff / average) * 100;

    console.log('Diff, Mult, Doc:', diffPercentage, multipleAppendTime, documentFragmentTime);

    expect(diffPercentage).toBeLessThanOrEqual(20);
  });
});
