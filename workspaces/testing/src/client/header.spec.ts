import { expect, test } from '@playwright/test';

const BOOK_ID = '670abeed-7c82-4d7a-a997-cd86c362b9b8';
const EPISODE_ID = 'fe2c26de-6bf7-4564-a4dc-d0b88cba8b22';
const AUTHOR_ID = '2ab0aca5-7dc2-4543-ac98-e23fdaca0739';

const pages = [
  { name: '作者ページ', path: `/authors/${AUTHOR_ID}` },
  { name: '作品ページ', path: `/books/${BOOK_ID}` },
  { name: 'エピソードページ', path: `/books/${BOOK_ID}/episodes/${EPISODE_ID}` },
  { name: '検索ページ', path: '/search' },
];

for (const { name, path } of pages) {
  test.describe(`${name} のヘッダー`, () => {
    test.beforeEach(async ({ page }) => {
      // Given
      await page.goto(path);
    });

    test('トップへ戻るボタンが表示されていること', async ({ page }) => {
      // Then
      const header = page.getByRole('banner');
      const button = header.getByRole('link', { name: 'トップへ戻る' });
      await expect(button).toBeVisible();
      await expect(header).toHaveScreenshot(`${name}-header.png`);
    });

    test('トップへ戻るボタンを押すと、トップページに遷移すること', async ({ page }) => {
      // When
      const header = page.getByRole('banner');
      const button = header.getByRole('link', { name: 'トップへ戻る' });
      await button.click();

      // Then
      await expect(page).toHaveURL('/');
    });
  });
}
