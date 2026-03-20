export class CartPage {
  constructor(page) {
    this.page = page;

    this.checkoutButton = page.getByTestId("checkout");
  }

  async goToCheckout() {
    const checkoutButton = this.checkoutButton;
    checkoutButton.click();
  }
}
