import { test, expect } from "@playwright/test";
// this checks the UAT GLL student login and all the tabs are coming or not
//  and also checks the transcript view and share to dallas collage and share to me via mail
// and also checks the share activity
test.describe("gll_student", () => {
  test.beforeEach("login", async ({ page }) => {
    await page.goto("https://lockeruat.glcredentials.com/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Login" })
      .click();
    await page.getByRole("textbox", { name: "Username *" }).click();
    await page
      .getByRole("textbox", { name: "Username *" })
      .fill("subhadeeppal2004+22@gmail.com");
    await page.getByRole("textbox", { name: "Password *" }).click();
    await page
      .getByRole("textbox", { name: "Password *" })
      .fill("GreenLight1$");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL("https://lockeruat.glcredentials.com/student/my-credentials");
    
  });
  test("check all pages and transcripts share and share activity", async ({
    page,
  }) => {
    //check all pages are coming or not
    await page.getByRole("tab", { name: "All Credentials (5)" }).click();
    await page.getByRole("tab", { name: "Transcripts (1)" }).click();
    await page.getByRole("tab", { name: "Certificates (0)" }).click();
    await page.getByRole("tab", { name: "Digital Badges (0)" }).click();
    await page.getByRole("tab", { name: "Recommendation Letters (0)" }).click();
    await page.getByRole("tab", { name: "Self Uploads (0)" }).click();
    await page.getByRole("tab", { name: "Resumes (4)" }).click();

    // transcript view
    await page.getByRole("tab", { name: "Transcripts (1)" }).click();
    await page.getByRole("button", { name: "View" }).click();
    await expect(
      page.getByRole("button", { name: "Back to the previous page" }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Back to the previous page" })
      .click();

    //transcript share to dallas collage
    await page
      .getByRole("button", { name: "Share", description: "Share" })
      .click();
    await page
      .getByRole("textbox", { name: "Type to search institution" })
      .click();
    await page
      .getByRole("textbox", { name: "Type to search institution" })
      .fill("Dallas College");
    await page.getByText("Dallas College", { exact: true }).click();
    await page.getByRole("button", { name: "Share" }).click();
    await expect(
      page.getByText("Credential shared successfully"),
    ).toBeVisible();

    //transcript share to me via mail
    await page
      .getByRole("button", { name: "Share", description: "Share" })
      .click();
    await page.getByRole("radio", { name: "Email" }).click();
    await page
      .getByRole("textbox", { name: "Email Address", exact: true })
      .click();
    await page
      .getByRole("textbox", { name: "Email Address", exact: true })
      .fill("subhadeeppal2004@gmail.com");
    await page.getByRole("textbox", { name: "Confirm Email Address" }).click();
    await page
      .getByRole("textbox", { name: "Confirm Email Address" })
      .fill("subhadeeppal2004@gmail.com");
    await page.getByRole("button", { name: "Share" }).click();
    await expect(
      page.getByText("Credential shared successfully"),
    ).toBeVisible();

    // share activity
    await page.getByRole("button", { name: "Share Activity" }).click();
    await expect(
      page.getByText("subhadeeppal2004@gmail.com").first(),
    ).toBeVisible();
    await expect(page.getByText("07-02-").first()).toBeVisible();
    await page.getByRole("link", { name: "My Credentials" }).click();
  });
});
