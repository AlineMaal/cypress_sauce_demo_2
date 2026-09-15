class LoginPage {
    constructor() {
        this.username = '[data-test="username"]';
        this.password = '[data-test="password"]';
        this.loginButton ='[data-test="login-button"]';
    }
    userLogin(username, password){
        cy.get(this.username).type(username);
        cy.get(this.password).type(password);
        cy.get(this.loginButton).click();

    }
    
}
export default new LoginPage();