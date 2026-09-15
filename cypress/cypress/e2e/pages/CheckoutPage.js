class CheckoutPage {
  // Selectors
  get firstNameInput() {
    return '[data-test="firstName"]';
  }
  get lastNameInput() {
    return '[data-test="lastName"]';
  }
  get postalCodeInput() {
    return '[data-test="postalCode"]';
  }
  get continueButton() {
    return '[data-test="continue"]';
  }
  get finishButton() {
    return '[data-test="finish"]';
  }
  get completeHeader() {
    return '[data-test="complete-header"]';
  }
  get errorMessage() {
    return '[data-test="error"]';
  }

  // Actions
  fillInformation(firstName, lastName, postalCode) {
    if (firstName) cy.get(this.firstNameInput).type(firstName);
    if (lastName) cy.get(this.lastNameInput).type(lastName);
    if (postalCode) cy.get(this.postalCodeInput).type(postalCode);
  }

  clickContinue() {
    cy.get(this.continueButton).click();
  }

  clickFinish() {
    cy.get(this.finishButton).click();
  }
}

export default new CheckoutPage();
