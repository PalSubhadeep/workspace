import { test, expect } from "@playwright/test";
test.describe("CURA Healthcare Service", () => {
  test.beforeEach(async ({ page }) => {
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await page.getByLabel("Username").click();

    // ✅different types of filling the text box
      //await page.getByLabel("Username").clear();// clear the text box before filling it
      //await page.getByLabel("Username").fill("John Doe");// fill the text box with the text
      await page.getByLabel("Username").pressSequentially("John Doe",{delay: 300});// type the text with delay

      await page.getByLabel("Password").click();
      await page.getByLabel("Password").fill("ThisIsNotAPassword");

      //✅clicks of different types
      await page.getByRole("button", { name: "Login" }).click(); // normal click
      //await page.getByRole("button", { name: "Login" }).press("Enter"); // press enter key
      //await page.getByRole("button", { name: "Login" }).dblclick();// double click
      //await page.getByRole("button", { name: "Login" }).click({button:"right"});// right click
      //await page.getByRole("button", { name: "Login" }).hover();// hover over the button to see the link
      //await page.getByRole("button", { name: "Login" }).click({timeout: 5_000});// click with timeout
  });
  test("make appointment", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Make Appointment");

    //✅Dropdown
    await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center"); // check the default value of the dropdown
    //await page .getByLabel("Facility").selectOption({"label": "Seoul CURA Healthcare Center"});
    await page.getByLabel("Facility").selectOption({"index":2});// select by index

    // await page
    //   .getByLabel("Facility")
    //   .selectOption("Hongkong CURA Healthcare Center");
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
