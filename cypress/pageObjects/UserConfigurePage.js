import UserProfilePage from "../pageObjects/UserProfilePage"
import HomePage from "../pageObjects/HomePage";
import userConfigurePageData from "../fixtures/pom_fixtures/userConfigurePage.json" 

class UserConfigurePage {
    getFullNameInputField = () => cy.get('input[name="_.fullName"]');
    getUserConfigSaveBtn = () => cy.get('button[name="Submit"]');
    getUserConfigDescription = () => cy.get('textarea[name="_.description"]');
    getUserBuildsSidePanelConfigureLink = () => cy.get('a[href$="/configure"]');
    getSensitiveSearchCheckbox = () => cy.get('div.setting-main label');
    getBreadcrumbsConfigure = () => cy.get("li[aria-current='page']");
    getUserSidePanelItems = () => cy.get(".task-link-text");
    getConfigurePageUrl = () => cy.url();
    getConfigureSectionsList = () => cy.get('form .jenkins-section__title');

    typeFullNameInputField(name) {
        this.getFullNameInputField().clear().type(name);
        return this;
    }

    clickUserConfigSaveBtn() {
        this.getUserConfigSaveBtn().click();
        
        return new UserProfilePage();
    }

    typeUserConfigDescription(description) {
        this.getUserConfigDescription().clear().type(description);
        return this;
    };

    clickSensitiveSearchCheckbox() {
        this.getSensitiveSearchCheckbox().click();
        return this;
    }

    listUserSidePanelItems() {
        return this.getUserSidePanelItems()
        .then(($els) => {
            return Cypress.$.makeArray($els).map($el => $el.innerText);
        })
    };

    verifyConfigureSectionsList(){
        return this.getConfigureSectionsList().then($sections =>
            $sections
                .toArray()
                .map($section => $section.innerText).sort());        
    }
}
export default UserConfigurePage;