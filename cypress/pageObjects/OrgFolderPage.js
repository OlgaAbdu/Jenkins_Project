import HomePage from "./HomePage";
import OrgFolderConfigurePage from "./OrgFolderConfigurePage";
import OrgFolderDeletePage from "./OrgFolderDeletePage";
import OrgFolderMoveChoicePage from "./OrgFolderMoveChoicePage";
import OrgFolderRenamePage from "./OrgFolderRenamePage";

class OrgFolderPage {
    getDashboard = () => cy.get('#breadcrumbs a').contains("Dashboard");
    getConfigureTheProjectLink = () => cy.get('.content-block [href="./configure"]');
    getEnableProjectForm = () => cy.get('#enable-project');
    getDescription = () => cy.get('#view-message');
    getMoveInSideMenulink = () => cy.get('#side-panel a[href*="move"]')
    getOrgFolderHeader = () => cy.get('#main-panel h1')
    getDisableOrgFolderBtn = () => cy.get('#disable-project button').contains("Disable Organization Folder")
    getEnableOrgFolderBtn = () => cy.get('#enable-project button[name="Submit"]')
    getConfigureInSideMenuLinkOrgFolder = () => cy.get('span a[href*="configure"]')
    getRenameOrgFolderBtn = () => cy.get('#tasks > div:nth-child(8)>span').contains("Rename")
    getDeleteOrgFolderBtn = () => cy.get('#tasks > div:nth-child(5)>span').contains("Delete Organization Folder")


    clickDeleteOrgFolderBtn() {
        this.getDeleteOrgFolderBtn().click()
        return new OrgFolderDeletePage()
    }

    clickRenameOrgFolderBtn() {
        this.getRenameOrgFolderBtn().click()
        return new OrgFolderRenamePage()
    }

    clickConfigureInSideMenuLinkOrgFolder() {
        this.getConfigureInSideMenuLinkOrgFolder().click();
        return this
    }

    clickDisableOrgFolderBtn() {
        this.getDisableOrgFolderBtn().click();
        return this
    }

    clickEnableOrgFolderBtn() {
        this.getEnableOrgFolderBtn().click();
        return this
    }

    clickGoToDashboard() {
        this.getDashboard().click();
        return new HomePage();
    }

    clickConfigureTheProjectLink() {
        this.getConfigureTheProjectLink().click();
        return new OrgFolderConfigurePage();
    }

    clickMoveInSideMenuLink() {
        this.getMoveInSideMenulink().click()
        return new OrgFolderMoveChoicePage
    }

    verifyDissableOrgFolderBtn() {
        this.getDisableOrgFolderBtn().contains("Disable Organization Folder") 
    }
}

export default OrgFolderPage;
