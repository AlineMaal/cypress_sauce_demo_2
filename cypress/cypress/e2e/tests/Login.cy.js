import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
describe('full login testing', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get(LoginPage.username).should('be.visible');
  })
  it('testcase1: verify user can login', () => {
    LoginPage.userLogin('standard_user', 'secret_sauce');
    cy.url().should('include', 'inventory.html');

  });
  it('testcase2: verify user cannot login with wrong credentials', () => {
    LoginPage.userLogin('standard_user1', 'secret_sauce');

  });

  it('testcase3: verify locked_out_user cannot login and sees error message', () => {
  LoginPage.userLogin('locked_out_user', 'secret_sauce');
  cy.url().should('not.include', 'inventory.html');
  cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain', 'Sorry, this user has been locked out');
});

  it('testcase4: verify user can successfully logout', () => {
    // Log in first
    LoginPage.userLogin('standard_user', 'secret_sauce');
    cy.url().should('include', 'inventory.html');

    // Open sidebar menu and click logout
    cy.get(InventoryPage.burgerMenuButton).click();
    cy.get(InventoryPage.logoutButton).click();

    // Verify redirection to the login page and that the login button is visible again
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get(LoginPage.loginButton).should('be.visible');
  });

    it('testcase5: verify performance_glitch_user can login (handles slow load)', () => {
    // We increase the timeout assertion because this user takes 5 seconds to load the page
    LoginPage.userLogin('performance_glitch_user', 'secret_sauce');
    cy.url({ timeout: 10000 }).should('include', 'inventory.html');
  });



  
})

