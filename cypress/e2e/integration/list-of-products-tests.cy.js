/// <reference types="cypress"/>
import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";
import ListOfProductsPage from "../../pages/ListOfProductsPage";


describe('Base Test @Smoke', () => {
    const loginPage = new LoginPage();
    const listOfProductsPage = new ListOfProductsPage();

    it('TG11S-T201 - Validate list of products table', () => {
         loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD')); 
        
         listOfProductsPage.clickOnLeftPanelOptions('View all products'); 
         listOfProductsPage.getRows().should('have.length', 4); 
         listOfProductsPage.getTableHeaders().should('have.length', 3);
            
            const expectedTableTexts = [
                ['Product name', 'Price', 'Discount'], 
                ['MyMoney', '$100', '8%'], 
                ['FamilyAlbum', '$80', '15%'], 
                ['ScreenSaver', '$20', '10%']
            ];

         listOfProductsPage.getRows().each((row, i) => {
                cy.wrap(row).children().each((cell, j) => {
                    cy.wrap(cell).should('have.text', expectedTableTexts[i][j]);
                }); 
            }); 

         }); 
    });