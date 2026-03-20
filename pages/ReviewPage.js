export class ReviewPage {
  constructor(page) {
    this.page = page;

    this.finishButton = page.getByTestId("finish");
    this.backButton = page.getByTestId("back-to-products");
    this.completeHeader = page.getByTestId("complete-header");
  }

  async clickFinishPurchase() {
    const finishButton = this.finishButton;
    finishButton.click();
  }

  async goBackToMainPage() {
    const backButton = this.backButton;
    backButton.click();
  }
}
