const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { MainPage } = require("../pages/mainPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");
const { ReviewPage } = require("../pages/ReviewPage");

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await loginPage.submitLogin();
});

test.afterEach(async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.submitLogout();
});

test("create purchase successful", async ({ page }) => {
  const itemName = "Sauce Labs Backpack";
  const mainPage = new MainPage(page);

  await mainPage.addToCart();
  const cartLinkBadge = mainPage.cartLinkBadge;
  await expect(await cartLinkBadge.textContent()).toBe("1");

  await mainPage.goToCart();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  await expect(
    await page.getByTestId("inventory-item-name").textContent(),
  ).toBe(itemName);

  const cartPage = new CartPage(page);
  await cartPage.goToCheckout();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );

  const checkoutFirstName = "First " + Math.random() + "Name";
  const checkoutLastName = "Last " + Math.random() + "Name";
  const checkoutZipCode = (Math.random() * 1000).toString();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillCheckoutData(
    checkoutFirstName,
    checkoutLastName,
    checkoutZipCode,
  );
  await checkoutPage.continueAfterFilling();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html",
  );
  await expect(
    await page.getByTestId("inventory-item-name").textContent(),
  ).toBe(itemName);
  const reviewPage = new ReviewPage(page);
  await reviewPage.clickFinishPurchase();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html",
  );
  await expect(await page.getByTestId("complete-header").textContent()).toBe(
    "Thank you for your order!",
  );

  await reviewPage.goBackToMainPage();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("Social networks open after clicking footer links", async ({
  page,
  context,
}) => {
  const mainPage = new MainPage(page);

  const twitterPage = await mainPage.openSocialNetworkPage(
    context,
    mainPage.twitterLink,
  );
  await expect(twitterPage).toHaveURL("https://x.com/saucelabs");

  const facebookPage = await mainPage.openSocialNetworkPage(
    context,
    mainPage.facebookLink,
  );
  await expect(facebookPage).toHaveURL("https://www.facebook.com/saucelabs");

  const linkedinPage = await mainPage.openSocialNetworkPage(
    context,
    mainPage.linkedinLink,
  );
  await expect(linkedinPage).toHaveURL(
    "https://www.linkedin.com/company/sauce-labs/",
  );
});

test("Page sorting works correctly", async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.selectSortBy("lohi");

  const pricesAreSortedLowToHigh = await mainPage.verifyItemPricesLowToHigh();

  await expect(pricesAreSortedLowToHigh).toBeTruthy();
});
