import UserCredentialsPage from "./UserCredentialsPage";
import UserConfigurePage from "./UserConfigurePage";
import UserBuildsPage from "./UserBuildsPage";

const userName = Cypress.env("local.admin.username").toLowerCase();

class UserProfilePage {
    getUserPageHeader = () => cy.get('#main-panel h1');
    getUserDescriptionBtn = () => cy.get('#description-link');
    getUserDescriptionInputField = () => cy.get('textarea[name="description"]');
    getUserDescriptionSaveBtn = () => cy.get('button[name="Submit"]');
    getUserDescriptionText = () =>  cy.get('#description div:not(.jenkins-buttons-row)');
    getUserCredentialsLink = () => cy.get(`a[href="/user/${userName}/credentials"]`);
    getUserConfigureLink = (userName) => cy.get(`a[href="/user/${userName}/configure"]`);
    getUserConfigureNameLink = () => cy.get(`a[href="/user/${userName}/configure"] .task-link-text`)
    getUserId = () => cy.get('#main-panel>div:last-child');
    getStatusBtn = () => cy.get('#tasks>:nth-child(2)');
    getUserDescriptionText = () =>  cy.get('#description div:not(.jenkins-buttons-row)').not("div[class]");
    getBuildsSubMenuLink = () => cy.get('a[href$="/builds"].task-link');
    getPreviewLink = () => cy.get('#description a.textarea-show-preview');
    getPreviewBox = () => cy.get('#description .textarea-preview-container');
    getUserIcon = () => cy.get("span[class='icon-lg']");
    getSideMenuItems = () => cy.get('#tasks .task-link-text');
    getUserStatusLinks = () => cy.get('.task-link-wrapper  a[href="/user/admin/"]');

    clickOnBuildsSubMenuLink() {
        this.getBuildsSubMenuLink().click();
        return new UserBuildsPage();
    }

    clearUserStatusDescription() {
        this.getUserDescriptionInputField().clear();
        return this;    
    }
    
    trimUserPageHeaderName() {
        return this.getUserPageHeader().then($el => {
            return $el.text().trim();
        });
    };

    clickUserDescriptionBtn() {
        this.getUserDescriptionBtn().click();
        return this;
    };

    typeUserDescriptionInputField(text) {
        this.getUserDescriptionInputField().clear().type(text);
        return this;  
    };

    clickUserDescriptionSaveBtn() {
        this.getUserDescriptionSaveBtn().click();
        return this;
    };

    clickUserCredentialsLink() {
        this.getUserCredentialsLink().click();
        return new UserCredentialsPage();
    }

    clickUserConfigureLink(userName = Cypress.env('local.admin.username')) {
        this.getUserConfigureLink(userName).click();
        return new UserConfigurePage();
    }

    verifyUserPagesUrl(user) {
        cy.url().should('contain', user);
        return this;
    };

    verifyStatusBtn() {
        this.getStatusBtn().should('exist');
        return this;
    };

    checkUserDescriptionTextNotExists(){
        this.getUserDescriptionText().should("be.empty");
        return this;
    };

    clickEditUserDescriptionBtn(btnName){
        this.getUserDescriptionBtn().contains(btnName).click();
        return this;
    }

    verifyPreviewBox(){
        this.getPreviewBox().should('contain.text', '[Plain text]');
        return this;
    }

    getSideMenuItemsNames() {
        return this.getSideMenuItems().then($tasks =>
            $tasks
                .toArray()
                .map($task => $task.innerHTML))
    }

}
export default UserProfilePage;