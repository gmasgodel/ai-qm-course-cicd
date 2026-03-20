// @ts-check
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { MainPage } = require("../pages/mainPage");

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test.afterEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("login and logout successful", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login("standard_user", "secret_sauce");
  await loginPage.rememberMeCheckbox().click();
  await loginPage.submitLogin();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  const mainPage = new MainPage(page);

  await mainPage.submitLogout();

  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test("login with invalid user shows error on screen", async ({ page }) => {
  const invalidUsername = "inv" + Math.random() + "_user";

  const loginPage = new LoginPage(page);

  await loginPage.login(invalidUsername, "secret_sauce");
  await loginPage.submitLogin();

  await expect(page).toHaveURL("https://www.saucedemo.com/");

  await expect(loginPage.errorMessageIsVisible()).toBeTruthy();
});
