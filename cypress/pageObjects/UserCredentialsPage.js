import userCredentialsPageData  from '../fixtures/pom_fixtures/userCredentialsPage.json';

class UserCredentialsPage {
    getCredentialsPageUrl = () =>cy.url();
    getCredentialsHeader = () => cy.get('#main-panel h1');
    getUserCredPageIconBtns = () => cy.get("div[class='jenkins-icon-size__items jenkins-buttons-row'] ol")
    getUserCredPageTables = () => cy.get('.jenkins-table__cell--tight.jenkins-table__icon')
    getCredentialTableColumnNames = () => cy.get('#main-panel table:nth-of-type(1) th')
    getStoreHeaders = () => cy.get("#main-panel h2")
    getStoreUserNames = (idx) => cy.get(`#main-panel table:nth-of-type(${idx}) tbody td a`)
    getStoreUserNameLinks = () => cy.get('#main-panel tr>td:nth-child(2) a');    
    getStoreUserNamesChevrons = (idx) => cy.get(`table:nth-of-type(${idx}) tr>td:nth-child(2) button`);
    getStoreDomainLinks = () => cy.get('#main-panel tr>td:nth-child(3) a')
    getStoreDomainChevrons = (idx) => cy.get(`table:nth-of-type(${idx}) tr>td:nth-child(3) button`);
    getUserNameAddDomain = () => cy.get('#breadcrumb-menu span');
    getStoreDomainLinkByUserName = (name) => cy.get(`a[href$='${name}']`)

    checkUrlCredentialsPage() {
        this.getCredentialsPageUrl()
            .should('include', userCredentialsPageData.credentialsPageUrl);
        return this;
    }
    
    clickUserCredIconBtns(size) {
        this.getUserCredPageIconBtns().contains(size).click();
        return this;
    };

    verifyCredentialTableColumnNamesText() {
        let arr = [];
        this.getCredentialTableColumnNames().each($columnName => 
                arr.push($columnName.text().replace(/&nbsp;/g, " ").replace(/\u00A0/g, " "))
            )     
        return cy.wrap(arr)
    }

    verifyStoreHeader( idx_store, userFullName){
        return userCredentialsPageData.Stores[idx_store].header.replace("***user***", userFullName)
    }

    verifyStoreTableUserName( idx_store, index_table, userFullName){
        return userCredentialsPageData.Stores[idx_store].name[index_table].replace("***user***", userFullName)
    }

}
export default UserCredentialsPage;


