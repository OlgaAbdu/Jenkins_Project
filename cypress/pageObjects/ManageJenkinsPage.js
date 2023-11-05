import UsersPage from './UsersPage';
import manageJenkinsPageData from '../fixtures/pom_fixtures/manageJenkinsPage.json';

class ManageJenkinsPage {

    getManageUsersLink = () => cy.get('.jenkins-section__item a[href="securityRealm/"]');
    getManageJenkinsPageUrl = () => cy.url();
    getManageJenkinsHeader = () => cy.get('#main-panel h1');
    
    clickManageUsersLink() {
        this.getManageUsersLink().click();
        return new UsersPage();
    };
    
    verifyManageJenkinsPageUrl() {
        this.getManageJenkinsPageUrl().should('contain', manageJenkinsPageData.manageJenkinsEndPoinURL);
        return this;
    };

}

export default ManageJenkinsPage;
