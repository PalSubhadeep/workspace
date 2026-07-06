import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { waitForShareEmail, extractShareLinks } from './emailVerifier';

// Values confirmed from a real "transcript shared" email screenshot.
// Update these if the logged-in test account, institution, or student changes.
const EXPECTED_STUDENT_NAME = 'SAMUEL SHIBU';
const EXPECTED_INSTITUTION = 'roosevelt ISD';
const EXPECTED_SENDER_CONTACT_EMAIL = 'subhadeeppal2004+22@gmail.com'; // the logged-in/student account

test('share transcript via email and verify delivery via IMAP', async ({ page }) => {
  // Record the time just before we trigger the share, so IMAP only looks
  // at mail that arrived after this point (avoids matching old emails).
  // A small buffer handles minor clock drift between machines.
  const shareTriggerTime = new Date(Date.now() - 60_000);

  // ---------- UI flow: login + share ----------
  await page.goto('https://lockeruat.glcredentials.com/');
  await page.getByRole('navigation').getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Username *' }).click();
  await page.getByRole('textbox', { name: 'Username *' }).fill('subhadeeppal2004+22@gmail.com');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('GreenLight1$');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('table').getByRole('button', { name: 'Share' }).click();
  await page.getByRole('radio', { name: 'Email' }).click();
  await page.getByRole('radio', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email Address', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill('subhadeeppal2004@gmail.com');
  await page.getByRole('textbox', { name: 'Confirm Email Address' }).click();
  await page.getByRole('textbox', { name: 'Confirm Email Address' }).fill('subhadeeppal2004@gmail.com');
  await page.getByRole('button', { name: 'Share' }).click();

  await expect(page.getByRole('listitem')).toContainText('Credential shared successfully');
  await page.getByRole('button', { name: 'Close toast' }).click();

  // ---------- IMAP verification ----------
  const email = await waitForShareEmail({
    host: 'imap.gmail.com',
    user: process.env.GMAIL_USER!,           // subhadeeppal2004@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD!,   // Gmail App Password, NOT the login password
    fromContains: 'support@glcredentials.com',
    subjectContains: 'has shared a transcript with you',
    since: shareTriggerTime,
    timeoutMs: 90_000,
    pollIntervalMs: 5_000,
  });

  // --- Subject & sender ---
  expect(email.from.toLowerCase()).toContain('support@glcredentials.com');
  expect(email.subject).toContain(EXPECTED_STUDENT_NAME);
  expect(email.subject.toLowerCase()).toContain('has shared a transcript with you');

  // --- Body content: institution + student name ---
  const body = email.text || email.html;
  expect(body).toBeTruthy();
  expect(body).toContain(EXPECTED_INSTITUTION);
  expect(body).toContain(EXPECTED_STUDENT_NAME);

  // Confirms the email reflects the correct student/sender account
  expect(body).toContain(EXPECTED_SENDER_CONTACT_EMAIL);

  // --- Links: download + verify + matching trackId ---
  const links = extractShareLinks(body);

  expect(links.downloadUrl, 'Download Transcript link should be present').not.toBeNull();
  expect(links.verifyUrl, 'Verify-credentials link should be present').not.toBeNull();
  expect(links.trackId, 'trackId GUID should be extractable').not.toBeNull();

  expect(links.downloadUrl).toContain('lockeruat.glcredentials.com/report/api/share-credentials/view/');
  expect(links.verifyUrl).toContain('lockeruat.glcredentials.com/verify-credentials');
  expect(links.verifyUrl).toContain(`trackId=${links.trackId}`);

  // --- Optional: confirm the download link actually resolves ---
  // (Uses Playwright's API request context — no need to open a new page.)
  const downloadResponse = await page.request.get(links.downloadUrl!);
  expect(downloadResponse.status(), 'Download link should resolve successfully').toBeLessThan(400);
});