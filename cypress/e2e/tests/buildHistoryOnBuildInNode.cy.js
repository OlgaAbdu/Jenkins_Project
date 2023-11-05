/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import nodePageData from "../../fixtures/pom_fixtures/nodePage.json";
import buildHistoryOnBuildInNodePageData from "../../fixtures/pom_fixtures/buildHistoryOnBuildInNodePage.json";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";

describe('buildHistoryOnBuildInNode', () => {

    const homePage = new HomePage();

    it('AT_11.04.01 | Build Executor Status > Verify possibility to get to the "Build History on Build-In Node" page from the Build-In Node page through left side panel', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuildInNodeName(nodePageData.nodeBuiltInName)
            .clickBuildHistoryLink()
            .getPageHeader().should('have.text', buildHistoryOnBuildInNodePageData.pageHeader)
    });

    it('AT_11.04.02 | Build Executor Status > Verify possibility to get to the "Build History on Build-In Node" page from the Build-In Node dropdown menu', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .hoverAndClickNodeDrpDwn(nodePageData.nodeBuiltInName)
            .selectBuildHistoryDrpDwnLink(nodePageData.nodeBuiltInName)
            .getPageHeader().should('have.text', buildHistoryOnBuildInNodePageData.pageHeader)
    });

    it('AT_11.04.03 | Build Executor Status > Verify possibility to get to the "Build History on Build-In Node" page from breadcrumbs dropdown menu inside "Build-In Node" page', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuildInNodeName(nodePageData.nodeBuiltInName)
            .clickBreadcrumbsBuildInNodeDrpDwnBtn()
            .selectBreadcrumbsBuildHistoryDrpDwnLink()
            .getPageHeader().should('have.text', buildHistoryOnBuildInNodePageData.pageHeader)
    });

    it('AT_11.04.04 | Build Executor Status > On the "Build History on Built-In Node" page verify possibility to see builds that were scheduled', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .clickOnScheduleBuildBtn()
            .clickBuildExecutorStatusLink()
            .clickBuildInNodeName(nodePageData.nodeBuiltInName)
            .clickBuildHistoryLink()
            .getProjectBuild().should('exist')
    });

});
