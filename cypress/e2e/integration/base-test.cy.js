/// <reference types="cypress"/>
import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";

describe('Base Test @Smoke', () => {
    const loginPage = new LoginPage();
    const basePage = new BasePage();

    it('TG11S-T183 - Validate main content after login', () => {
         loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD')); 

         const leftPanelOptions = ['View all orders', 'View all products', 'Order']; 
         const rightPanelHeadings = ['List of All Orders', 'List of All Products', 'Orders']; 

         }); 
    });