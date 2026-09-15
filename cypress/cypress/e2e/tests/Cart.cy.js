import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';

describe('Inventory and Cart functionality', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    // Log in using standard user credentials from the source [1, 2]
    LoginPage.userLogin('standard_user', 'secret_sauce'); 
    cy.url().should('include', 'inventory.html');
  });

  it('testcase1: verify product list is visible', () => {
    cy.get(InventoryPage.inventoryItems).should('have.length.greaterThan', 0);
  });

  it('testcase2: verify item can be added to cart and updates the badge', () => {
    cy.get(InventoryPage.cartBadge).should('not.exist');
    InventoryPage.addItemToCart(0);
    cy.get(InventoryPage.cartBadge).should('be.visible').and('contain', '1');
  });

  it('testcase3: verify user can navigate to the cart page', () => {
    InventoryPage.goToCart();
    cy.url().should('include', 'cart.html');
  });

  it('testcase4: verify item can be removed directly from the inventory page', () => {
    // Add item
    InventoryPage.addItemToCart(0);
    cy.get(InventoryPage.cartBadge).should('contain', '1');
    cy.get(InventoryPage.inventoryItems).eq(0).find('button').should('have.text', 'Remove');

    // Remove item from inventory page
    InventoryPage.removeItemFromCart(0);

    // Verify it is gone
    cy.get(InventoryPage.cartBadge).should('not.exist');
    cy.get(InventoryPage.inventoryItems).eq(0).find('button').should('have.text', 'Add to cart');
  });

  it('testcase5: verify item can be removed from the cart page list', () => {
    // Add item and go to cart
    InventoryPage.addItemToCart(0);
    InventoryPage.goToCart();
    cy.url().should('include', 'cart.html');

    // Verify item is present in the cart list
    cy.get(CartPage.cartItems).should('have.length', 1);

    // Click "Remove" on the cart page
    CartPage.removeItem(0);

    // Verify item is removed from the list and the cart badge disappears
    cy.get(CartPage.cartItems).should('have.length', 0);
    cy.get(InventoryPage.cartBadge).should('not.exist');
  });

  it('testcase6: verify products can be sorted by price (low to high)', () => {
    // Select the "Price (low to high)" option from the dropdown
    cy.get(InventoryPage.productSortDropdown).select('lohi');

    // Capture the prices of the first and second items to verify sorting
    cy.get('.inventory_item_price').then(($prices) => {
      const price1 = parseFloat($prices.eq(0).text().replace('$', ''));
      const price2 = parseFloat($prices.eq(1).text().replace('$', ''));
      
      // Assert that the first item is cheaper than or equal to the second item
      expect(price1).to.be.lte(price2);
    });
  });
    it('testcase7: verify products can be sorted by name (Z to A)', () => {
    // Select the "Name (Z to A)" option from the dropdown (value is 'za')
    cy.get(InventoryPage.productSortDropdown).select('za');

    // Capture the names of the first and second items to verify sorting
    cy.get('[data-test="inventory-item-name"]').then(($names) => {
      const name1 = $names.eq(0).text();
      const name2 = $names.eq(1).text();
      
      // Assert that the first name is alphabetically greater than or equal to the second name
      expect(name1.localeCompare(name2)).to.be.at.least(0);
    });
  });



});
