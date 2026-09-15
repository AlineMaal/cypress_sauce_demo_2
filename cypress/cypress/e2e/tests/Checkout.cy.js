import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('End-to-End Checkout Flow', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    // Standard user login using credentials from our sources [1, 2]
    LoginPage.userLogin('standard_user', 'secret_sauce');
    
    // Add an item and navigate to checkout
    InventoryPage.addItemToCart(0);
    InventoryPage.goToCart();
    cy.get(CartPage.checkoutButton).click();
    cy.url().should('include', 'checkout-step-one.html');
  });

  it('testcase1: verify user can successfully complete checkout', () => {
    // Fill out customer details
    CheckoutPage.fillInformation('Alex', 'Smith', '12345');
    CheckoutPage.clickContinue();

    // Verify we transitioned to the overview step
    cy.url().should('include', 'checkout-step-two.html');
    
    // Complete purchase
    CheckoutPage.clickFinish();

    // Verify purchase success message
    cy.url().should('include', 'checkout-complete.html');
    cy.get(CheckoutPage.completeHeader)
      .should('be.visible')
      .and('contain', 'Thank you for your order!');
  });

  it('testcase2: verify form validation error when information is missing', () => {
    // Leave fields empty and click continue
    CheckoutPage.clickContinue();

    // Verify error message is shown and we stay on the same page
    cy.url().should('include', 'checkout-step-one.html');
    cy.get(CheckoutPage.errorMessage)
      .should('be.visible')
      .and('contain', 'Error: First Name is required');
  });

it('testcase3: verify validation error when Last Name is missing', () => {
    // Fill in First Name and Postal Code, but leave Last Name blank
    CheckoutPage.fillInformation('Alex', '', '12345');
    CheckoutPage.clickContinue();

    // Assert correct error message
    cy.get(CheckoutPage.errorMessage)
      .should('be.visible')
      .and('contain', 'Error: Last Name is required');
  });

  it('testcase4: verify validation error when Postal Code is missing', () => {
    // Fill in First Name and Last Name, but leave Postal Code blank
    CheckoutPage.fillInformation('Alex', 'Smith', '');
    CheckoutPage.clickContinue();

    // Assert correct error message
    cy.get(CheckoutPage.errorMessage)
      .should('be.visible')
      .and('contain', 'Error: Postal Code is required');
  });



});
