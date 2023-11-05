import userCredentialsPageData from "../fixtures/pom_fixtures/userCredentialsPage.json"

class UserStorePage {
    getUserStorePageUrl = () =>cy.url();
    getUserStorePageHeader = () => cy.get('#main-panel h1');

    verifyUrlUserStorePage(name) {
        this.getUserStorePageUrl()
            .should('include', userCredentialsPageData.credentialsStorePageUrl+name.toLowerCase());
        return this;
    }
}
export default UserStorePage;


