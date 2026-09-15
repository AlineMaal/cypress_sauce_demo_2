class CartPage {
  // Selectors
  get cartItems() {
    // Each item card on the cart page uses the same inventory-item data-test attribute
    return '[data-test="inventory-item"]';
  }

  get checkoutButton() {
    return '[data-test="checkout"]';
  }

  // Actions
  removeItem(index) {
    // Clicks the "Remove" button inside the specified item card in the cart list
    cy.get(this.cartItems).eq(index).find('button').click();
  }
}

export default new CartPage();
