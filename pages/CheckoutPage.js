export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstNameField = page.getByPlaceholder("First Name");
    this.lastNameField = page.getByPlaceholder("Last Name");
    this.zipCodeField = page.getByPlaceholder("Zip/Postal Code");

    this.continueButton = page.getByTestId("continue");
  }

  async fillCheckoutData(firstname, lastname, zipCode) {
    const firstNameField = this.firstNameField;
    await firstNameField.fill(firstname);
    const lastNameField = this.lastNameField;
    await lastNameField.fill(lastname);
    const zipCodeField = this.zipCodeField;
    await zipCodeField.fill(zipCode);
  }

  async continueAfterFilling() {
    const continueButton = this.continueButton;
    continueButton.click();
  }
}
