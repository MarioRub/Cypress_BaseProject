import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import SearchPage from '../../pages/SearchPage'

Given('an user', () => {
    SearchPage.visit();
})

When('Inputing some text', (dataTable) => {
    dataTable.hashes().forEach(d => {
        SearchPage.fillLoginData(d['text']);
    })
})

And('Click Search', () => {
    SearchPage.clickSearchBtn();
})

Then('Search should load', () => {
    cy.url().should('include', 'Acklen+Avenue');
});