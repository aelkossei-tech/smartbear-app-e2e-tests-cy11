/// <reference types="cypress"/>
import LoginPage from "../../pages/LoginPage";
import ViewAllOrdersPage from "../../pages/ViewAllOrdersPage";

describe('View All Orders Verification @Regression', () => {
  const loginPage = new LoginPage();
  const viewAllOrdersPage = new ViewAllOrdersPage();

  beforeEach(() => {
    loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
  });

    it('TG11S - T123 Validate "View All Orders" table', () => {
        viewAllOrdersPage.getRows().should('have.length', 9);
        viewAllOrdersPage.getTableHeaders().should('have.length', 13);

        const expectedHeaderTexts = [
            '&nbsp;', 'Name', 'Product', '#', 'Date', 'Street',
            'City', 'State', 'Zip', 'Card', 'Card Number', 'Exp', '&nbsp;'
        ]

        viewAllOrdersPage.getTableHeaders().each((el, index) => {
            if (index > 0 || index < expectedHeaderTexts.length - 1) {
                cy.wrap(el).should('have.text', expectedHeaderTexts[index]);
            }
        });
    });

    it('TG11S - T124  Validate "Check All" and "Uncheck All" boxes', () => {
        viewAllOrdersPage.getColumn(0).each(el => {
            cy.wrap(el).find('input').should('not.be.checked');
        });

        viewAllOrdersPage.getCheckAllButton().click();

        viewAllOrdersPage.getColumn(0).each(el => {
            cy.wrap(el).find('input').should('be.checked');
        });

        viewAllOrdersPage.getUnCheckAllButton().click();

        viewAllOrdersPage.getColumn(0).each(el => {
            cy.wrap(el).find('input').should('not.be.checked');
        });
    });

    it('TG11S - T125  Validate rows can be deleted', () => {
        viewAllOrdersPage.getRows().should('have.length', 9);
        viewAllOrdersPage.getColumn(0).first().click(); 
        viewAllOrdersPage.getDeleteSelectedButton().click(); 
        viewAllOrdersPage.getRows().should('have.length', 8);
    });

    it('TG11S - T126  Validate all rows can be deleted', () => {
        viewAllOrdersPage.getRows().should('have.length', 9);
        viewAllOrdersPage.getCheckAllButton().click();
        viewAllOrdersPage.getDeleteSelectedButton().click(); 
        viewAllOrdersPage.getEmptyOrdersTableMessage().should('be.visible'); 
       // viewAllOrdersPage.getRightPanelMainContentTable.should('not.be.visible');
    });
}); 
