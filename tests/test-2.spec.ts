import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://lockeruat.glcredentials.com/login');
  await page.getByRole('textbox', { name: 'Username *' }).click();
  await page.getByRole('textbox', { name: 'Username *' }).fill('subhadeeppal2004+17@gmail.com');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('GreenLight1$');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('navigation')).toContainText('My Credentials');
  await page.getByRole('tab', { name: 'Resumes (1)' }).click();
  await page.getByRole('button', { name: 'Share', description: 'Share' }).click();
  await page.getByRole('radio', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email Address', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill('subhadeeppal2004@gmail.com');
  await page.getByRole('textbox', { name: 'Confirm Email Address' }).click();
  await page.getByRole('textbox', { name: 'Confirm Email Address' }).fill('subhadeeppal2004@gmail.com');
  await page.getByRole('button', { name: 'Share' }).click();
});