class InventoryPage {
  // Selectors
  get inventoryItems() {
    return '[data-test="inventory-item"]';
  }
  get cartBadge() {
    return '[data-test="shopping-cart-badge"]';
  }
  get cartButton() {
    return '[data-test="shopping-cart-link"]';
  }
  get productSortDropdown() {
    return '[data-test="product-sort-container"]';
  }

  get burgerMenuButton() {
    return '#react-burger-menu-btn';
  }
  get logoutButton() {
    return '[data-test="logout-sidebar-link"]';
  }

  // Actions
  addItemToCart(index) {
    // Finds the product card at the specified index and clicks its "Add to cart" button
    cy.get(this.inventoryItems).eq(index).find('button').click();
  }

  removeItemFromCart(index) {
    // Finds the product card at the specified index and clicks its "Remove" button
    cy.get(this.inventoryItems).eq(index).find('button').click();
  }
  goToCart() {
    cy.get(this.cartButton).click();
  }
}

export default new InventoryPage();