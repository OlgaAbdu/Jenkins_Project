import MultibranchPipelineConfigurePage from "./MultibranchPipelineConfigurePage";
import HomePage from "../pageObjects/HomePage"
import multibranchPipelinwPageData from "../fixtures/pom_fixtures/multibranchPipelinePage.json"
import MultibranchPipelineRenamePage from "../pageObjects/MultibranchPipelineRenamePage"

class MultibranchPipelinePage {
    getConfigureTheProjectLink = () => cy.get('.content-block [href="./configure"]');
    getMultibranchPipelineTitle = () => cy.get('[class="icon-folder icon-xlg"]');
    getMultibranchPipelineWarning = () => cy.get('#enable-project');
    getEnableButton = () => cy.get('button[formnovalidate]');
    getMultiBranchPipelineHeader = () => cy.get('#main-panel h1');
    getDeleteMultibranchPipelineSideBarBtn = () => cy.get('#side-panel div a[href*="/delete"]');
    getConfirmDeleteMultibranchPipelineBtn = () => cy.get('form[action="doDelete"] button[name="Submit"]');
    getConfirmDeleteMultibranchPipelineMessage = () => cy.get("#main-panel form[action='doDelete']")
    getMultiBranchPipelineError = () => cy.get('div h1');
    getMultiBranchPipelineErrorMessage = () => cy.get('div p');
    getDisableButton = () => cy.get('#disable-project button');
    getBreadcrumbsMultibranchPipelineBtn = () => cy.get('#breadcrumbBar a[href*=job]')
    getBreadcrumbsMultibranchPipelineDropDownMenu = () => cy.get('a[href*=job] .jenkins-menu-dropdown-chevron')
    getBreadcrumbsMultibranchPipelineItemsList = () => cy.get('ul.first-of-type li a span')
    getRenameMultibranchPipelineSideBarBtn = () => cy.get('#side-panel div a[href*="/confirm-rename"]');


  
    clickConfigureTheProjectLink() {
        this.getConfigureTheProjectLink().click();
        return new MultibranchPipelineConfigurePage();
    };

    trimMultibranchPipelineDisabledText() {
        return this.getMultibranchPipelineWarning().then($el => {
            return $el.text().trimStart();
        });
    };

    clickMultibranchPipelineEnableBtn() {
        this.getEnableButton().click();
        return this;
      }; 
    
    clickDeleteMultibranchPipelineSideBarBtn() {
        this.getDeleteMultibranchPipelineSideBarBtn().click();
        return this;
    };

    verifyConfirmDeleteMultibranchPipelineMessage() { 
        this.getConfirmDeleteMultibranchPipelineMessage()
        .should("contain", multibranchPipelinwPageData.ConfirmDeleteMultibranchPipelineMessage);
        return this
    }

    clickConfirmDeleteMultibranchPipelineBtn() {
        this.getConfirmDeleteMultibranchPipelineBtn().click();
        return new HomePage()
    }

    clickDisableButton(){
        this.getDisableButton().click();
        return this
    }

    hoverBreadcrumbsMultibranchPipelineBtn(){
        this.getBreadcrumbsMultibranchPipelineBtn().realHover()
        return this
    }

    clickBreadcrumbsMultibranchPipelineDropDownMenu(){
        this.getBreadcrumbsMultibranchPipelineDropDownMenu().realHover().click({force: true})
        return this
    }

    clickRenameMultibranchPipelineSideBarBtn(){
        this.getRenameMultibranchPipelineSideBarBtn().click()
        return new MultibranchPipelineRenamePage()
    }

}

export default MultibranchPipelinePage;
