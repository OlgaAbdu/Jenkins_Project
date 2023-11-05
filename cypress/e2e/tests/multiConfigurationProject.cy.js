/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import newItemPage from "../../fixtures/pom_fixtures/newItemPage.json"
import multiConfProjectPageData from "../../fixtures/pom_fixtures/multiConfProjectPage.json";
import multiConfigurationProjectConfigurePage from "../../fixtures/pom_fixtures/multiConfigurationProjectConfigurePage.json"
import MultiConfigurationProjectPage from "../../pageObjects/MultiConfigurationProjectPage";
import headerAndFooter from "../../pageObjects/HeaderAndFooter";
import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import dashboardBreadcrumbs from "../../fixtures/pom_fixtures/dashboardBreadcrumbs.json";

describe("multiConfigurationProject", () => {
    const homePage = new HomePage();
    const multiConfigurationProjectPage = new MultiConfigurationProjectPage();
    const headerAndFooter = new HeaderAndFooter();

    it("AT_14.07.01 | Verify Multi-configuration project deleted within itself", () => {
        cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
        homePage
            .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
            .clickDeleteSideMenuLink()
            .getProjectTable()
            .should('not.exist');
    });

    it('AT_14.07.02 | Delete Multi-configuration project from dropdown menu inside MC Project', () => {
        cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
        homePage
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
            .selectDeleteMultiConfProjectDrpDwnMenuBtn()
            .getProjectTable()
            .should('not.exist');
    });

    it('AT_14.06.003 | Rename Multi-configuration project with the current name', () =>{
        cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
        homePage
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
            .selectRenameMultiConfProjectDrpDwnMenuBtn()
            .typeMultiConfProjectNameInputField(newItemPageData.multiConfigurationProjectName)
            .clickMultiConfProjectRenameBtn()
            .getErrorTextMessage()
            .should('contain.text', multiConfProjectPageData.currentNameMsg)
    })

    it('AT_14.06.004 | Multi-configuration project>Rename Multi-configuration project', () => {
        cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
        homePage
        .hoverProjectNameLink()
        .clickProjectDrpDwnBtn()
        .selectRenameMultiConfProjectDrpDwnMenuBtn()
        .typeMultiConfProjectNameInputField(newItemPageData.newMultiConfigurationProjectName)
        .clickRenameBtnMultiConfProject()
        .clickGoHome()
        .getNameMulticonfigProjectName()
        .should('have.text', newItemPageData.newMultiConfigurationProjectName)
    })

    it('AT_14.04_001 | Multi-configuration project verify adding description', () => {
        homePage
        .clickCreateJobLink()
        .typeNewItemNameInputField(newItemPageData.multiConfigurationProjectName)
        .selectMultiConfigurationProjectItem()
        .clickOkBtnAndGoMultiConfProjectConfig()
        .typeDescriptionInputField()
        .clickSaveButton()
        .getDescriptionField().should('have.text',multiConfigurationProjectConfigurePage.descriptionText);
    })

    it('AT_14.02_001 |MultiConfigurationProject | Verify that the user is able to Disable Project', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName);
        
        homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickDisableProjectBtn()
        .getDisableProjectMsg().should('contain', multiConfProjectPageData.disableProjectMsg)
        multiConfigurationProjectPage
        .getEnableBtn().should('be.visible').and('have.text', multiConfProjectPageData.enableBtnText);
    })

    it('AT_14.02_002 |MultiConfigurationProject | Verify that the user is able to Enable Disabled Project', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName);
        homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickDisableProjectBtn();
        headerAndFooter
        .clickJenkinsHomeLink();

        homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickEnableBtn()
        .getDisableProjectMsg().should('not.exist', multiConfProjectPageData.disableProjectMsg)
        multiConfigurationProjectPage
        .getDisableProjectBtn().should('be.visible').and('have.text', multiConfProjectPageData.disableBtnText);
    })

    it('AT_14.07.04 | Delete Multi-configuration project within breadcrums menu', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName);
        
        homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickMultiConfigProjectDropdwnBreadcrumb() 
        .selectDeleteBtnMultiConfigProjectDropdownBreadcrumb()
        .getProjectTable()
        .should('not.exist');
    })

    it('AT_14.03.01 | <Multi-configuration project> Verify possibility to add description by clicking Add Description', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName);

        homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickAddEditDescriptionBtn()
        .typeDescriptionInputField(multiConfigurationProjectConfigurePage.descriptionText)
        .clickSaveDescriptionBtn()
        .getDescriptionField()
        .should('have.text', multiConfigurationProjectConfigurePage.descriptionText)
    })

    multiConfProjectPageData.invalidCharacters.forEach((invalidCharacters) =>{
    it(`AT_14.06.01 | Rename Multi-configuration project by entering invalid symbols ${invalidCharacters}`, () => {     
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName);
        
        homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickRenameBtnMultiConfPrj()
        .typeMultiConfProjectNameInputField(invalidCharacters)
        .clickMultiConfProjectRenameBtn()
        .getErrorTextMessage()
        .should('contain', multiConfProjectPageData.invalidCharactersMsg)
    })
 }) 


    it('AT_14.03.02 | <Multi-configuration project> Verify possibility to edit description by clicking Edit Description', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName); 
                
        homePage
            .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
            .clickAddEditDescriptionBtn()
            .typeDescriptionInputField(multiConfigurationProjectConfigurePage.descriptionText)
            .clickSaveDescriptionBtn()
            .clickAddEditDescriptionBtn()
            .typeDescriptionInputField(multiConfigurationProjectConfigurePage.newDescriptionText)
            .clickSaveDescriptionBtn()
            .getDescriptionField()
            .should('have.text', multiConfigurationProjectConfigurePage.newDescriptionText)
    })  

    it('AT_14.08.01| The down arrow appears near the end of the MC project name by hovering the mouse on the MC project name', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName);
        homePage
            .hoverProjectNameLink()
            .getProjectDrpDwnBtn()
            .should('be.visible')
            .and('exist')
      });
      
      it('AT_14.06.02 | Rename Multi-configuration project with empty input field', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName);
        
        homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickRenameBtnMultiConfPrj()
        .clearMultiConfProjectNameInputField()
        .clickMultiConfProjectRenameBtn()
        .getErrorTextMessage()
        .should('contain', multiConfProjectPageData.emptyNameErrorMsg)
      }); 

    it('AT_14.06.05 | Rename Multi-Config Project by clicking on a "Rename" from breadcrums dropdown menu', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName);

        homePage
            .clickMultiConfigProjectNameLink(newItemPage.multiConfigurationProjectName)
            .clickMultiConfigProjectDropdwnBreadcrumb()
            .clickRenameBtnMultiConfigProjectBreadcrumb()
            .clearMultiConfProjectNameInputField()
            .typeMultiConfProjectNameInputField(multiConfigurationProjectConfigurePage.descriptionText)
            .clickMultiConfProjectRenameBtn()

        multiConfigurationProjectPage
            .getMultiConfigurationProjectHeader()
            .should('contain', multiConfigurationProjectConfigurePage.descriptionText);
    });

    it('AT_14.06.06 | Rename Multi-Config Project by clicking on a "Rename" on a left-side panel', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName)
        
        homePage
            .clickMultiConfigProjectNameLink(newItemPage.multiConfigurationProjectName)
            .clickRenameBtnMultiConfPrj()
            .clearMultiConfProjectNameInputField()
            .typeMultiConfProjectNameInputField(multiConfigurationProjectConfigurePage.descriptionText)
            .clickMultiConfProjectRenameBtn()

        multiConfigurationProjectPage
            .getMultiConfigurationProjectHeader()
            .should('contain', multiConfigurationProjectConfigurePage.descriptionText);
    });

    it('AT_14.08.02 | Verify the visibility of the six dropdown items by clicking the down arrow icon', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName)

        homePage
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
            .getProjectNameDrpDwnItems()
            .should('be.visible')
            .and('have.length', 6);
    });

    it('AT_14.08.03 | Verify the names of the six dropdown items by clicking the down arrow icon', () => {
        cy.createMultiConfigurationProject(newItemPage.multiConfigurationProjectName)

        homePage
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
            .getProjectNameDrpDwnItems()
            .each((item, index) => {
                cy.wrap(item).should('contain.text', dashboardBreadcrumbs.breadcrumbscMulticonfigurationprojectDropdow[index])
            })

    });
})