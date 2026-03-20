export class MainPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.getByText("Logout");
    this.sidebarMenu = page.getByText("Open Menu");

    this.usedAddToCartButton = page.getByTestId(
      "add-to-cart-sauce-labs-backpack",
    );

    this.cartLinkBadge = page.getByTestId("shopping-cart-badge");
    this.cartLink = page.getByTestId("shopping-cart-link");

    this.twitterLink = page.getByTestId("social-twitter");
    this.facebookLink = page.getByTestId("social-facebook");
    this.linkedinLink = page.getByTestId("social-linkedin");

    this.sortSelector = page.getByTestId("product-sort-container");
  }

  async addToCart() {
    const usedAddToCartButton = this.usedAddToCartButton;
    usedAddToCartButton.click();
  }

  async goToCart() {
    const cartLink = this.cartLink;
    cartLink.click();
  }

  async openSocialNetworkPage(context, socialMediaLink) {
    const pagePromise = context.waitForEvent("page");
    await socialMediaLink.click();
    const socialMediaPage = await pagePromise;
    return socialMediaPage;
  }

  async verifyItemPricesLowToHigh() {
    const prices = await this.page.$$(
      "xpath=//*[@class='inventory_item_price']",
    );
    let itemPricesLowToHigh = true;
    for (let i = 1; i < (await prices.length); i++) {
      const prevPrice = Number((await prices[i - 1].innerText()).substring(1));
      const currPrice = Number((await prices[i].innerText()).substring(1));
      if (currPrice < prevPrice) {
        itemPricesLowToHigh = false;
        break;
      }
    }

    return itemPricesLowToHigh;
  }

  async selectSortBy(value) {
    const sortSelector = this.sortSelector;
    await sortSelector.selectOption(value);
  }

  async submitLogout() {
    const sidebarMenu = this.sidebarMenu;
    await sidebarMenu.isVisible();
    await sidebarMenu.click();
    const logoutButton = this.logoutButton;
    await logoutButton.isVisible();
    await logoutButton.click();
  }
}
