import myView from '../fixtures/pom_fixtures/myView.json';

class MyViewEditConfigurePage {
    getMyViewEditConfigurePageUrl = () => {
        cy.url();
    }

    verifyMyViewEditConfigurePageUrl() {
        cy.url().should('contain', myView.myViewsEditConfigurePageURL);
        return this;
    };
};
export default MyViewEditConfigurePage;