import { test, expect } from "@playwright/test";
test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("h1")).toHaveText("CURA Healthcare Service");

    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(
      page.getByText("Please login to make appointment"),
    ).toBeVisible();
  });

  test("Should log in Sucessfully ", async ({ page }) => {
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("h2")).toContainText("Make Appointment");
  });
  test("Should not log in successfully", async ({ page }) => {
    await page.getByLabel("Username").fill("John smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
