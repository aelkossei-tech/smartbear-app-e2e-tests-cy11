/// <reference types="cypress"/>
import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";

const loginPage = new LoginPage();
const basePage = new BasePage(); 

describe('Login Verification', () => { // Login Verification ==> Epic in JIRA

    it('TG11S-T139 - Validate login with valid credentials', () => {
        // put your unique test case id --> for easier access/searchibility 

        loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD')); 

        cy.url().should('include', 'weborders'); 

        basePage.getWebOrdersHeading().should('have.text', 'Web Orders'); 
        basePage.getLogoutButton().should('have.text', 'Logout'); 
        basePage.getWelcomeUserInfo().should('include.text', Cypress.env('USERNAME')); 
    }); 

    it('TG11S-T145 - Validate logout', () => { 
        loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD')); 
        basePage.getLogoutButton().click(); 
        cy.url().should('include', 'Login'); 
        loginPage.getLoginForm().should('be.visible'); 
    });

     [
    {
      title: 'emptyUsernameAndPassword',
      username: "",
      password: "",
    },
    {
      tile: 'invalidUsernameValidPassword',
      username: "InvalidUsername",
      password: Cypress.env("PASSWORD"),
    },
    {
      titel: 'validUsernameInvalidPassword',
      username: Cypress.env("USERNAME"),
      password: "InvalidPassword",
    },
    {
      title: 'invalidUsernameInvalidPassword', 
      username: "InvalidUsername",
      password: "InvalidPassword",
    },
  ].forEach((creds) => {
    it(`TG11S-T165 - Validate login with invalid credentials ${creds.title}`, () => {

      if(creds.username === '' && creds.password === '') loginPage.clickOnLoginButton();
      else loginPage.login(creds.username, creds.password);

      cy.url().should("include", "Login");
      loginPage.getErrorMessage().should('have.text', 'Invalid Login or Password.');
    });
  });
}); 

describe('Login Verification - Additional Tests', () => {
    beforeEach(() => {
        cy.visit(Cypress.env("APP_BASE_URL"));
    });

    it('TG11S-T174 - Validate the password input is masked', () => {
        loginPage.getPasswordInput().should('have.attr', 'type', 'password');
    });

    it('TG11S-T170 - Validate login with valid credentials and ENTER', () => {
        loginPage.getPasswordInput().should('have.attr', 'type', 'password');

        loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'), false);

        cy.url().should('include', 'weborders');

        basePage.getWebOrdersHeading().should('have.text', 'Web Orders');
        basePage.getLogoutButton().should('have.text', 'Logout');
        basePage.getWelcomeUserInfo().should('include.text', Cypress.env('USERNAME'));
    });
});