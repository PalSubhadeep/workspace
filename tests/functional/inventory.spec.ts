import { test, expect } from "@playwright/test";
test.describe("inventory", () => {
  test.beforeEach("login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);
  });

  test("should check there is no zero value products", async ({ page }) => {
    //get all list of products
    const products = await page.locator(".inventory_item");
    await expect(products).toHaveCount(6);

    //get product name and prices
    let totalprocudts = await products.count();

    let priceArr =[];
    for (let i = 0; i < totalprocudts; i++) {
      let productName = await products.nth(i).locator(".inventory_item_name").textContent();
      let productPrice = await products.nth(i).locator(".inventory_item_price").textContent();
      console.log(`Product Name: ${productName} | Product Price: ${productPrice}`);
      priceArr.push(productPrice);
    }

    //replace the $ sign and convert to number and check if any product has zero value and print there is no zero value products
    let priceArr2 = priceArr.map((price) => parseFloat(price?.replace("$", "") || "0"));
    if (priceArr2.some((price) => price === 0)) {
      console.log("There is a product with zero value");
    } else {
      console.log("There is no product with zero value");
    }
    

  });
});
