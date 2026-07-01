import { test, expect } from "@playwright/test";
test.describe("checkout", () => {
  test.beforeEach("login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText("Swag Labs")).toBeVisible();
  });
  test("add product to cart and proceed to checkout", async ({ page }) => {
    await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').pressSequentially("xp",{delay: 300});
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').pressSequentially("xaiver",{delay: 300});
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').pressSequentially("731204",{delay: 300});
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
    await expect(page.locator('[data-test="finish"]')).toBeVisible();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    await page.locator('[data-test="back-to-products"]').click();
  });
});
