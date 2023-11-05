/// <reference types="cypress" />

import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import HomePage from "../../pageObjects/HomePage";
import FolderPage from "../../pageObjects/FolderPage";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import multibranchPipelineConfirmRenamePageData from "../../fixtures/pom_fixtures/multibranchPipelineConfirmRenamePage.json";
import MultibranchPipelinePage from "../../pageObjects/MultibranchPipelinePage";
import multibranchPipelinePageData from "../../fixtures/pom_fixtures/multiConfProjectPage.json";
import MultibranchPipelineConfigurePage from "../../pageObjects/MultibranchPipelineConfigurePage";
import DashboardBreadcrumbs from "../../pageObjects/DashboardBreadcrumbs";


describe('multibranchPipeline', () => {

    const headerAndFooter = new HeaderAndFooter();
    const homePage = new HomePage();
    const folderPage = new FolderPage();
    const multibranchPipelinePage = new MultibranchPipelinePage()
    const multibranchPipelineConfigurePage = new MultibranchPipelineConfigurePage();
    const dashboardBreadcrumbs = new DashboardBreadcrumbs();

    it('AT_16.03.001 | Delete the Multibranch Pipeline using dropdown menu', function () {
        cy.createMultiBranchPipeline(newItemPageData.multibranchPipelineName);

        headerAndFooter
            .clickJenkinsHomeLink()
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.multibranchPipelineName)
            .clickDeleteFoldersAndMultiBrPipelineFromDrpDwnMenu(newItemPageData.multibranchPipelineName)
            .clickSubmitBtn()
            .getProjectTable()
            .should('not.exist');
    });

    it('AT_16.02.06 | Verify user can rename Multibranch Pipeline inside the selected Multibranch Pipeline', () => {
        cy.createMultiBranchPipeline(newItemPageData.multibranchPipelineName);

        headerAndFooter
            .clickJenkinsHomeLink()
            .clickMultibranchPipelineNameLink(newItemPageData.multibranchPipelineName)
            .clickMultibranchPipeRenameSideMenuLink()
            .clickMultibranchPipelineRenameBtn()
            .getErrorMessage()
            .should('have.text', multibranchPipelineConfirmRenamePageData.errorMessage);
    });

    it('AT_16.04 _001| Verify that the Multibranch Pipeline is moved to an existing folder using dropdown', function () {
        cy.createFolderProject(newItemPageData.folderName);
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);

        homePage
            .hoverAndClickProjectDrpDwn(newItemPageData.multibranchPipelineName)
            .clickProjectNameDropdownMoveLink()
            .selectDestinationMoveJob(newItemPageData.folderName)
            .clickMoveButton()
            .clickGoToDashboard()
            .clickProjectName(newItemPageData.folderName)
            .getIconProject()
            .should('have.attr', 'title', newItemPageData.newItemNames[4])
        folderPage
            .getJobInsideFolderLink()
            .should('have.text', newItemPageData.multibranchPipelineName)
    });

    it('AT_16.02.01 | Rename Multibranch Pipeliner using dropdown menu', () => {
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);

        homePage
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.multibranchPipelineName)
            .selectRenameMultiBrPipelineDrpDwnMenuBtn()
            .clearAndTypeNewPipelineName(newItemPageData.newpipelineName)
            .clickRenameSubmitBtn()
            .getMultiBranchPipelineHeader()
            .should('contain', newItemPageData.newpipelineName)
            .and('not.contain', newItemPageData.multibranchPipelineName);
    });

    it('AT_16.04 _002| Verify that the moved Multibranch Pipeline (using drop down) does not exist on the list of projects on the home page', function () {
        cy.createFolderProject(newItemPageData.folderName);
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);

        homePage
            .hoverAndClickProjectDrpDwn(newItemPageData.multibranchPipelineName)
            .clickProjectNameDropdownMoveLink()
            .selectDestinationMoveJob(newItemPageData.folderName)
            .clickMoveButton()
            .clickGoToDashboard()
            .getProjectName(newItemPageData.multibranchPipelineName).should('not.exist')
    });

    it('AT_16.04 _003| Verify that the Multibranch Pipeline is moved to an existing folder using the left sidebar', function () {
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);
        cy.createFolderProject(newItemPageData.folderName);

        homePage
            .clickProjectName(newItemPageData.multibranchPipelineName)
            .clickMoveBtnLeftSidebar()
            .selectDestinationMoveJob(newItemPageData.folderName)
            .clickMoveButton()
            .clickGoToDashboard()
            .clickProjectName(newItemPageData.folderName)
            .getIconProject()
            .should('have.attr', 'title', newItemPageData.newItemNames[4])
        folderPage
            .getJobInsideFolderLink()
            .should('have.text', newItemPageData.multibranchPipelineName)
    });

    it("AT_16.03.04 | Multibranch Pipeline Verify Delete Multibranch Pipeline using 'Delete Multibranch Pipeline' button on the left sidebar", function () {
        cy.createMultiBranchPipeline(newItemPageData.multibranchPipelineName);

        headerAndFooter
             .clickJenkinsHomeLink()
             .clickMultibranchPipelineProjectNameLink(newItemPageData.multibranchPipelineName)
             .clickDeleteMultibranchPipelineSideBarBtn()
             .verifyConfirmDeleteMultibranchPipelineMessage()
             .clickConfirmDeleteMultibranchPipelineBtn()
             .getProjectTable()
             .should("not.exist");
    });
    it('AT_16.02.03 <Multibranch Pipeline>Rename using dropdown menu with empty name field',()=>{
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);
        homePage
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.multibranchPipelineName)
            .selectRenameMultiBrPipelineDrpDwnMenuBtn()
            .clearNewPipelineName()
            .clickRenameSubmitBtn()
        multibranchPipelinePage
            .getMultiBranchPipelineError().should('be.visible')
            .and('contain',multibranchPipelinePageData.error)
        multibranchPipelinePage  
            .getMultiBranchPipelineErrorMessage()
            .should('be.visible')
            .and('contain',multibranchPipelinePageData.errorMessage)
           
    });
    it('AT 16.05.02 Verify to disable Multibranch Pipeline',()=>{
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);
        homePage
            .clickMultibranchPipelineProjectNameLink(newItemPageData.multibranchPipelineName)
        multibranchPipelinePage 
            .clickDisableButton()
            .getMultibranchPipelineWarning()
            .should('be.visible')
            .and('contain',multibranchPipelinePageData.currentDisableMsg)
            .and('have.css', 'color', 'rgb(254, 130, 10)')
    });

    it('AT_16.05.03 Verify possibility to enable Multibranch Pipeline', () => {
        cy.createMultiBranchPipeline(newItemPageData.multibranchPipelineName);
 
        multibranchPipelineConfigurePage
        .clickDisableBtn()
        .clickSaveBtnAndGoMultiPipeline()
        .clickMultibranchPipelineEnableBtn()
        .getDisableButton()
        .should('be.visible')
        .and('have.text' , multibranchPipelinePageData.disableMultiBrPipelineBtnText)
    });

    it ('AT_16.02.07 | <Multibranch Pipeline>Verify user can rename Multibranch Pipeline on the left side panel inside Multibranch Pipeline.', () => {
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);

        homePage
            .clickMultibranchPipelineProjectNameLink(newItemPageData.multibranchPipelineName)
            .clickRenameMultibranchPipelineSideBarBtn()
            .clearAndTypeNewPipelineName(newItemPageData.newpipelineName)
            .clickRenameSubmitBtn()
            .getMultiBranchPipelineHeader()
            .should('contain', newItemPageData.newpipelineName)
            .and('not.contain', newItemPageData.multibranchPipelineName);
    });

    it("AT_16.03.05 | Multibranch Pipeline Verify Delete Multibranch Pipeline using breadcrumbs", function () {
        cy.createMultiBranchPipeline(newItemPageData.multibranchPipelineName);

        headerAndFooter
             .clickJenkinsHomeLink()
             .clickMultibranchPipelineProjectNameLink(newItemPageData.multibranchPipelineName);

        dashboardBreadcrumbs
             .clickMultibrPipelineDashboardDropdownBtn()     
             .clickDeleteMultibrPipelineFromBreadcrumbs()
             .verifyConfirmDeleteMultibranchPipelineMessage()
             .clickConfirmDeleteMultibranchPipelineBtn()
             .getProjectTable()
             .should("not.exist");
    });
});
