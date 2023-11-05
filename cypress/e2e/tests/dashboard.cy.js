/// <reference types="cypress" />

import pipelinePageData from "../../fixtures/pom_fixtures/pipelinePage.json";
import HomePage from "../../pageObjects/HomePage";
import freestyleProjectPageData from "../../fixtures/pom_fixtures/freestyleProjectPage.json";
import homePageData from "../../fixtures/pom_fixtures/homePage.json";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import folderPageData from "../../fixtures/pom_fixtures/folderPage.json";
import dashboardData from "../../fixtures/pom_fixtures/dashboard.json"

describe('dashboard', () => {

    const homePage = new HomePage()

    it("AT_20.04.01 | <Dashboard> Jenkins Table: Pipeline's dropdown menu", () => {
        cy.createPipeline(pipelinePageData.pipelineName);
        homePage
            .hoverAndClickProjectDrpDwn(pipelinePageData.pipelineName)
            .verifyPipeLineDrpDwnMenu()
            .should('deep.equal', pipelinePageData.pipelineDropdownItems)
            .and('have.length', pipelinePageData.pipelineDropdownItems.length)
    });

    it('AT_20.01.07 |DashbordVerify size of project table S', () => {
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName)
        homePage
        .clickTableSizeBtnS()
        .verifyTableSize(homePageData.sRem)
    });

    it('AT_20.01.13 |DashbordVerify size of project table M',() => {
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName)
        homePage
        .clickTableSizeBtnM()
        .verifyTableSize(homePageData.mRem)
    });

    it('AT_20.01.14 |DashbordVerify size of project table L',() => {
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName)
        homePage
        .clickTableSizeBtnL()
        .verifyTableSize(homePageData.lRem)
    });

     it('AT_20.07.01 Dashboard|Icon S be visible in the first column of the title',()=>{
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName);
        cy.createPipeline(pipelinePageData.pipelineName);
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);
        homePage
       .getHeadersTableJobs().eq(0)
       .should('contain',homePageData.HeadersTableJobs[0]);           
     });

     it('AT 20.07.02 Dashboard| hover over the icon S , should be visible tooltip',()=>{
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName);
        cy.createPipeline(pipelinePageData.pipelineName);
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);
        homePage
        .hoverHeadersTableJobsIconS()
        .getToolTipsIconS()
        .should('have.text', 'Status of the last build')          
     });

     it('AT_20.07.03|Dashboard Verify that table head Name should be visible', () => {
        cy.createFolderProject(folderPageData.folderName);
        homePage
        .getHeadersTableJobName()
        .should('contain', homePageData.HeadersTableJobs[2])
     })

    it('AT_20.07.05 | Verify the table head W is visible', () => {
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName);
        homePage
            .getHeadersTableJobs().eq(1)
            .should('be.visible');
    });

    it("AT_20.10.01 | <Dashboard> Jenkins Table: Multibranch pipeline project's name is visible", () => {
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);
        homePage
            .getMulBranPipelineName()
            .should('be.visible')
            .and('contain',
            newItemPageData.multibranchPipelineName)
    });

    it('AT_20.07.06 | Verify table head W should be hoverable: the background color should change and tooltip should appear', () => {
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName);
        homePage
            .hoverHeaderTableJobW()
            .getHeaderTableJobWTooltip()
            .should('have.text', homePageData.tooltipWtext);
    });

    it('AT_20.10.03 | <Dashboard> Jenkins Table: Multibranch pipeline project names dropdown menu has list of items', () => {
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);
        homePage
        .hoverAndClickProjectDrpDwnBtn(newItemPageData.multibranchPipelineName)
        .getMultibranchPipelineDrDwnMenuListItems()
        .each((el, index) => {
            expect(el.text()).contain(dashboardData.dashboardMBPipelinaDropdownMenu[index])
        })
    });
    
    it("AT_20.03.07 | <Dashboard> Jenkins Table: Verify Freestyle Project's name down chevron button and background color change", () => {
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);
        homePage
            .hoverProjectNameLink()
            .getProjectDrpDwnBtn()
            .should('be.visible')
            .and('not.have.css', 'background-color', '#FFFFFF')
        });

    it('AT_20.11.01 | <Dashboard> Jenkins Table: Verify Dropdown menu of Folder Project name', () => {
        cy.createFolderProject(newItemPageData.folderName)
        homePage
            .hoverAndClickProjectDrpDwn(newItemPageData.folderName)
            .verifyFolderDrpDwnMenu()
            .should('deep.equal', folderPageData.folderDropdownItems)
       });

    it('AT_20.04.02 | <Dashboard> Jenkins Table: Pipeline project name is visible', () => {
        cy.createPipeline(pipelinePageData.pipelineName);
        homePage
            .getProjectName(pipelinePageData.pipelineName)
            .should('be.visible')
            .and('have.text', pipelinePageData.pipelineName)
    })

    it("AT_20.08.01 | <Dashboard> Jenkins Table: icons in the Status of the last build column match project type", () => {
        cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
        cy.createMultBranchPipeline(newItemPageData.multibranchPipelineName);
        cy.createFolderProject(newItemPageData.folderName);
        cy.createOrgFolderProject(newItemPageData.orgFolderName);
        cy.createFreestyleProject(newItemPageData.freestyleProjectName);
        cy.createPipeline(newItemPageData.pipelineName);
        homePage
        .verifyStatusMultibranchPipelineIcon()
        .verifyStatusPipelineIcon(newItemPageData.pipelineName)
        .verifyStatusFreestyleProjectIcon(newItemPageData.freestyleProjectName)
        .verifyStatusFolderIcon()
        .verifyStatusOrgFolderIcon()
        .verifyStatusMulticonfigurationProjecIcon(newItemPageData.multiConfigurationProjectName)
        })   
        
    it('AT_20.11.02 | <Dashboard> Jenkins Table: Folder Project name is visible', () => {
        cy.createFolderProject(newItemPageData.folderName)
        homePage
            .getProjectName(newItemPageData.folderName)
            .should ('be.visible')
            });   
             
    it('AT_20.07.08 | <Dashboard> Jenkins Table: heads of the table Last Duration should be visible', () => {
        cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
        homePage
            .getLastDuration()
            .should('be.visible')
            .and('have.text', 'Last Duration')
            })

    it('AT 20.07.09 Dashboard|Jenkins Table: heads of the table Last Failure should be visible',()=>{
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName);
        cy.createPipeline(pipelinePageData.pipelineName);
        homePage
       .getLastFailureBtn()
       .should('contain',homePageData.HeadersTableJobs[4]);           
     });
    
    it("AT_20.07.10 | Dashboard Verify that Table head Last Success should be visible", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);
      homePage
        .getHeadersTableJobs()
        .eq(3)
        .should("contain", homePageData.HeadersTableJobs[3])
        .and("be.visible");
    });

    it("AT_20.07.11 | Dashboard Verify that the table head Last Success is hoverable", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .getLastSuccessBtn()
            .should("have.css", "cursor", "pointer");
    });
    
    it('AT_20.11.03| <Dashboard> Jenkins Table: the arrow of dropdown menu is displayed within Folder Project name', () => {
        cy.createFolderProject(newItemPageData.folderName)
        homePage
             .getProjectDrpDwnBtn(newItemPageData.folderName).realHover()
             .should('be.visible')
    });

 it("AT_20.01.12 <Dashboard> Icons S,M,L Verify that 'Icon' panel for table size switching is visible", () => {
   cy.createFolderProject(newItemPageData.folderName);

     homePage
         .getIconSizeTable()
         .should("be.visible");
 });

 it('AT_20.01.15 <Dashboard> The panel Icon is highlighted while hovering over the "S","M", or "L" buttons', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName)

    homePage
      .getPanelIcon()
      .realHover()
      .then((obj) => {
        cy.document().then(() => {
          cy.wrap(obj).then($el => window.getComputedStyle($el[0], 'before').getPropertyValue('background-color'))
          .should('contain', 'rgba(175, 175, 207, 0.1')
        })
      })
  });

})        