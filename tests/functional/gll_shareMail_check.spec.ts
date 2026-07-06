import { test, expect } from "@playwright/test";
test.describe("gll_shareMail_check", () => {
  test("send to dallas college", async ({ page }) => {
    await page.goto("https://lockeruat.glcredentials.com/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Login" })
      .click();
    await page.getByRole("textbox", { name: "Username *" }).click();
    await page
      .getByRole("textbox", { name: "Username *" })
      .fill("swikruti.mohapatra+gll-student@xelpmoc.in");
    await page.getByRole("textbox", { name: "Password *" }).click();
    await page
      .getByRole("textbox", { name: "Password *" })
      .fill("GreenLight1$");
    await page.getByRole("button", { name: "Login" }).click();
    await page
      .getByRole("table")
      .getByRole("button", { name: "Share" })
      .click();
    await page
      .getByRole("textbox", { name: "Type to search institution" })
      .click();
    await page
      .getByRole("textbox", { name: "Type to search institution" })
      .fill("Dallas");
    await page.getByText("Dallas College", { exact: true }).click();
    await page.getByRole("button", { name: "Share" }).click();
    await page.getByRole("button", { name: "Close toast" }).click();
    await page.getByRole("button", { name: "swikruti.mohapatra+gll-" }).click();
    await page.getByRole("button", { name: "Logout" }).click();
  });
  test("check in dallas the mail is correct or not ", async ({ page }) => {
    await page.goto("https://lockeruat.glcredentials.com/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Login" })
      .click();

    await page.getByRole("textbox", { name: "Username *" }).click();
    await page.getByRole("textbox", { name: "Username *" }).fill("carrick16");
    await page.getByRole("textbox", { name: "Password *" }).click();
    await page
      .getByRole("textbox", { name: "Password *" })
      .fill("GreenLight1$");
    await page.locator("//button[text()='Login']").click();
    await page.waitForTimeout(6000);
    await page.getByRole("link", { name: "Credentials" }).click();
    const actionButton = page
      .locator("table tbody tr")
      .first()
      .locator("td")
      .nth(11)
      .locator("button")
      .nth(2);

    // check action button is visible
    await expect(actionButton).toBeVisible();

    // click acknowledge/action button
    await actionButton.click();


    await expect(page.getByText("Successfully acknowledged")).toBeVisible();
    await page.getByRole("button", { name: "Close toast" }).click();
    await expect(page.locator("tbody")).toContainText("Abigail Zacharias");
    await expect(page.locator("tbody")).toContainText(
      "sarun.chuttakula+gll@xelpmoc.in",
    );
  });
});
