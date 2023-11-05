import OrgFolderPage from "./OrgFolderPage"
import OrgFolderConfigurePageData from "../fixtures/pom_fixtures/orgFolderConfigurePage.json"

class OrgFolderConfigurePage {
    getProjectConfigSaveBtn = () => cy.get('button[name=Submit]');
    getEnableDisabledToggle = () => cy.get('.jenkins-toggle-switch__label');
    getDescriptionField = () => cy.get('textarea[name="_.description');
    getOrgFolderHeaderField = () => cy.get('input[name="_.displayNameOrNull"]');
    getSidePanelMenuItemsOrgFolderConfig = () => cy.get('#tasks .task');
    getHealthMetricsSidePanelMenuItem = () => cy.get('.task button[data-section-id="health-metrics"]')
    getHealthMetricsItem = () => cy.get('.jenkins-section [class= "jenkins-form-item tr"] button[class="jenkins-button advanced-button advancedButton"]')
    getHealthMetricsType = () => cy.get('.yuimenuitemlabel').contains(OrgFolderConfigurePageData.healthMetricsType)
    getAddMetric = () => cy.get('#yui-gen7 button')
    getAppearance = () => cy.get('button[data-section-id="appearance"]')
    getDropDownIconeTypeMenu = () => cy.get('div.config-table > div:nth-child(8) > div:nth-child(2) [class="jenkins-select"] select')

    clickAppearance() {
        this.getAppearance().click()
        return this
    }

    verifyDropDownIconeTypeMenu() {
        return this.getDropDownIconeTypeMenu().children('option').then($options => {
            return Cypress.$.makeArray($options).map($option => $option.innerText)
        })
    }

    clickAddMetric() {
        this.getAddMetric().click()
        return this
    }

    clickHealthMetricsSidePanelMenuItem() {
        this.getHealthMetricsSidePanelMenuItem().click();
        return this;
    }

    clickHealthMetricsItem() {
        this.getHealthMetricsItem().click();
        return this;
    }

    clickSaveBtnAndGoOrgFolder() {
        this.getProjectConfigSaveBtn().click();
        return new OrgFolderPage();
    }

    clickEnableDisabledToggle() {
        this.getEnableDisabledToggle().click();
        return this;
    }

    addDescription(description) {
        this.getDescriptionField().type(description);
        return this;
    }

    addDisplayName(displayName) {
        this.getOrgFolderHeaderField().type(displayName)
        return this
    }
}

export default OrgFolderConfigurePage;