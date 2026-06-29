import { test, expect } from "@playwright/test";
test.describe("CURA Healthcare Service", () => {
  test.beforeEach(async ({ page }) => {
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await page.getByLabel("Username").click();
      await page.getByLabel("Username").fill("John Doe");
      await page.getByLabel("Password").click();
      await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.getByRole("button", { name: "Login" }).click();
  });
  test("make appointment", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Make Appointment");
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    await page.getByRole("radio", { name: "Medicaid" }).check();
    await page.locator("span").click();
    await page.getByRole("columnheader", { name: "June" }).click();
    await page.getByRole("columnheader", { name: "2026" }).click();
    await page.getByRole("cell").getByText("2020").click();
    await page.getByText("Jul").click();
    await page.getByRole("cell", { name: "23" }).click();
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill(
        "Hii this is a multiline comment\nPlease check it if there is some issue",
      );
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(
      page.getByRole("heading", { name: "Appointment Confirmation" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Go to Homepage" }).click();
  });
});
