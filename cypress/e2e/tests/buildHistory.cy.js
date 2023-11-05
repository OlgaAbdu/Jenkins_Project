/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import { textTitle, buildDescription, buildNewDescription } from "../../fixtures/pom_fixtures/buildHistoryPage.json";
import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import BuildHistoryPage from "../../pageObjects/BuildHistoryPage"
import BuildPage from "../../pageObjects/BuildPage";
import editBuildInformationPageData from "../../fixtures/pom_fixtures/editBuildInformationPage.json";
import buildСhangesPageData from "../../fixtures/pom_fixtures/buildСhangesPageData.json"
import BuildChangesPage from "../../pageObjects/BuildChangesPage";

describe('buildHistory', () => {

    const homePage = new HomePage();
    const headerandFooter = new HeaderAndFooter();
    const buildHistoryPage = new BuildHistoryPage()
    const buildPage = new BuildPage();
    const buildChangesPage = new BuildChangesPage();
    
    it('AT_07.01_005 | Build History > Verify user can see date and time of build creating in build history calendar', function() {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .clickScheduleBuildBtn()
            .then(() => {
                const timeBuildCreating = homePage.getTimeBuildCreating()

                homePage
                    .clickBuildHistoryLink()
                    .clickBuildInBuildHistoryCalendar()
                    .getTimeOfBuildCreatingFromCalendar()
                    .should('contain', timeBuildCreating)
            })
    });

    it('AT_07.01 _001| Build History|Build History link is clickable', () => {

        homePage
            .clickBuildHistoryLink()
            .getBuildHistoryPageTitle()
            .should('have.text', textTitle)
    })

    it('AT_07.03.002 | Verify Possibility to Delete Builds from Build Page', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);
        homePage
            .clickOnScheduleBuildBtn()
            .clickBuildHistoryLink()
            .clickBuildLink()
            .clickDeleteBuildBtn()
            .clickConfirmDeleteBtn()
        headerandFooter
            .clickJenkinsHomeLink()
            .clickBuildHistoryLink()
            .getBuildLink().should('not.exist');
    })

    it('07.02_005 | Build History > Verify builds can be sorted by project name in descending alphabetical order', () => {   
        cy.createPipeline(newItemPageData.pipelineName)
        cy.createFreestyleProject(newItemPageData.freestyleProjectName) 
        homePage
            .clickScheduleBuildForProjectNameBtn(newItemPageData.pipelineName)
            .clickScheduleBuildForProjectNameBtn(newItemPageData.freestyleProjectName)
            .clickBuildHistoryLink()
        buildHistoryPage
            .createProjectStatusTable()
            .then((tableArray) => {
                buildHistoryPage
                    .clickSortHeaderBuild()
                    buildHistoryPage
                        .createProjectStatusTable()
                        .then((actualSortedTableArray) => {
                            let expectedSortedTable = tableArray.sort((a,b) => b['Build'].localeCompare(a['Build']))
                            expect(actualSortedTableArray).to.deep.equal(expectedSortedTable)
                        })
                })       
    });

    it('AT_07.05_02 | Build History | Add Build Description - Verify user can see description text Preview.', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);
        homePage
            .clickOnScheduleBuildBtn()
        headerandFooter
            .clickJenkinsHomeLink()
            .clickBuildTableLink()
        buildPage
            .clickBuildDescriptionLink()
            .typeBuildDescriptionInput(buildDescription)
            .verifyPreviewTextareaNotVisible()
            .clickShowPreviewLink()
            .getPreviewTextarea()
            .should('be.visible')
            .and('have.text', buildDescription)
    });

    it("AT_07.05_001  Build History  Verify adding build description", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);
      homePage
        .clickOnScheduleBuildBtn()
        .clickBuildHistoryLink()
        .clickBuildLink()
        .clickBuildDescriptionLink()
        .typeBuildDescriptionInput(buildDescription)
        .clickSaveDescriptionBtn()
        .getDescriptionText()
        .should("have.text", buildDescription);
    });

    it('AT_07.06.001 | Build History > Verify Possibility to Edit Build Description', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);
        homePage
            .clickOnScheduleBuildBtn();
        cy.addBuildDescription(buildDescription);
        homePage
            .clickBuildHistoryLink()
            .clickBuildLink()
            .clickBuildDescriptionLink()
            .typeBuildNewDescriptionInput(buildNewDescription)
            .clickSaveDescriptionBtn()
            .getDescriptionText().should("have.text", buildNewDescription);
    });

    it('AT_007.04.001 | Build History > Verify user can edit Build Information by clicking on dropdown menu', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .clickOnScheduleBuildBtn()
            .clickBuildHistoryLink()
            .clickBuildNameBtn()
            .clickEditBuildInformationBtn()
            .typeDisplayName(editBuildInformationPageData.displayName)
            .clickEditBuildInformationSaveBtn()
            .getBuildName()
            .should('contain', editBuildInformationPageData.displayName);
    });

    it('AT_07.01_010 | Build History > Verify column Build content matches the Time Line content', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName)
    
        homePage
            .clickScheduleBuildForProjectNameBtn(newItemPageData.freestyleProjectName)
            .clickScheduleBuildForProjectNameBtn(newItemPageData.freestyleProjectName)
            .clickScheduleBuildForProjectNameBtn(newItemPageData.freestyleProjectName)
            .clickBuildHistoryLink()
            .retrieveFromProjectStatusTableProjectNameAndBuildNumber().then((projectStatusTableProjectNameAndBuildNumber) => {
                buildHistoryPage.retrieveFromTimeLineProjectNameAndBuildNumber().then((timeLineProjectNameAndBuildNumber) => {
                    expect(projectStatusTableProjectNameAndBuildNumber).to.include.members(timeLineProjectNameAndBuildNumber)
                    })
            })
    });
    
    it('AT_07.02_008 | Verify user can sort builds in descending order by clicking “Time Since”', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName)

        homePage
        .createBuildsOfNewProject(newItemPageData.freestyleProjectName, 3) 
        .clickBuildHistoryLink()
        .clickTimeSinceBtn()
        .verifySortBuildsByTimeSience()
    })

    it('AT_07.01.07 | Build History calendar is visible',()=>{
        homePage
          .clickBuildHistoryLink()
          .getBuilHistoryTimeLine()
          .should('be.visible');       
    })

    it('AT_07.03.01 | <Build History> Verify user can delete build from drop-down menu next to build name', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .clickOnScheduleBuildBtn()
            .clickBuildHistoryLink()
            .clickBuildNameBtn()
            .selectDeleteBuildLink()
            .clickConfirmDeleteBtn()
        headerandFooter
            .clickJenkinsHomeLink()
            .clickBuildHistoryLink()
            .getBuildLink().should('not.exist');
    })

    it('AT_07.04.02 | Build History > Verify user can add DisplayName by clicking on "Edit Build Information" inside the build', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .clickOnScheduleBuildBtn()
            .clickBuildHistoryLink()
            .clickBuildLink()
            .clickEditBuildInfoSideMenuLink()
            .typeDisplayName(editBuildInformationPageData.displayName)
            .clickEditBuildInformationSaveBtn()
            .getBuildName()
            .should('contain', editBuildInformationPageData.displayName);
    });

    it('AT_07.04.03 | Build History > Verify user can edit DisplayName by clicking "Edit Build Information" in a dropdown menu', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .clickOnScheduleBuildBtn()
            .clickBuildHistoryLink()
            .clickBuildNameBtn()
            .clickEditBuildInformationBtn()
            .typeDisplayName(editBuildInformationPageData.displayName)
            .clickEditBuildInformationSaveBtn()
        headerandFooter
            .clickJenkinsHomeLink()
            .clickBuildHistoryLink()
            .clickBuildNameBtn()
            .clickEditBuildInformationBtn()
            .typeDisplayName(editBuildInformationPageData.newDisplayName)
            .clickEditBuildInformationSaveBtn()
            .getBuildName()
            .should('contain', editBuildInformationPageData.newDisplayName);
    });

    it('AT_07.04.04 | Build History > Verify user can edit DisplayName by clicking on "Edit Build Information" inside the build', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .clickOnScheduleBuildBtn()
            .clickBuildHistoryLink()
            .clickBuildLink()
            .clickEditBuildInfoSideMenuLink()
            .typeDisplayName(editBuildInformationPageData.displayName)
            .clickEditBuildInformationSaveBtn()
        headerandFooter
            .clickJenkinsHomeLink()
            .clickBuildHistoryLink()
            .clickBuildLink()
            .clickEditBuildInfoSideMenuLink()
            .typeDisplayName(editBuildInformationPageData.newDisplayName)
            .clickEditBuildInformationSaveBtn()
            .getBuildName()
            .should('contain', editBuildInformationPageData.newDisplayName);
    });

    it('AT_07.07.01 | <Build History>Check Build Status', () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName)

        homePage
        .clickOnScheduleBuildBtn() 
        .clickBuildHistoryLink()
        .clickBuildNameBtn()
        .selectChangesLink()
        .getPageHeader()
        .should('be.visible')
       
        buildChangesPage
        .verifyBuildChangesPageUrl(buildСhangesPageData.buildChangesPageUrl)
    });

});
