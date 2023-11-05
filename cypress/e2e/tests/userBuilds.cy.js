/// <reference types="cypress" />

import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import userBuildsPageData from "../../fixtures/pom_fixtures/userBuildsPage.json";
import freestyleProjectPageData from "../../fixtures/pom_fixtures/freestyleProjectPage.json";
import HomePage from "../../pageObjects/HomePage";
import UserBuildsPage from "../../pageObjects/UserBuildsPage";

describe('userBuilds', () => {
    const headerAndFooter = new HeaderAndFooter();
    const homePage = new HomePage();
    const userBuildsPage = new UserBuildsPage();
    

    it('AT_04.06.008 | Breadcrumbs Verify user can see his username in the title', () => {
        const USERID = Cypress.env('local.admin.username').toLowerCase();
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserBuildsMenu()
            .getPageHeading()
            .should('have.text', `Builds for ${USERID}`)
    });

    userBuildsPageData.tableSize.forEach((size) => {
        it(`AT_04.06.002 Verify clicking on ${size.size} icon will change the icon size`, function() {
            cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName)
            homePage
                .clickOnScheduleBuildBtn()
            headerAndFooter
                .clickUserDropDownBtn()
                .selectUserBuildsMenu()
                .clickUserBuildsTableSizeBtns(size.size)
                .getStatusIcon().should('have.css', 'height', size.heigth)
        });
    });

   it('AT_01.04.04 | User Builds link | Verify tasks links on the side panel', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserBuildsMenu()
            .getUserBuildsSidePanelTaskLinks().each(($el, index) => {
                cy.wrap($el).should('be.visible')
                cy.wrap($el).should('have.attr', 'href')
            })
            .then(($els) => {
                return Cypress._.map($els, 'innerText')
            })
            .should('deep.equal', userBuildsPageData.SidePanelTasks)
      });
    
    it('AT_04.06.007 | Verify sort the builds list by status',()=>{
        cy.createFreestyleProject(freestyleProjectPageData.freestyleProjectNewName)
        homePage
            .createBuildsOfNewProject(freestyleProjectPageData.freestyleProjectNewName,2)
        
        headerAndFooter
           .clickUserNameLink()
           .clickOnBuildsSubMenuLink()       
           .clickStatusBuilds()
           .getStatusBuildsUpp()
           .should('be.visible')
           .and('contain', freestyleProjectPageData.arrows.arrowUp)
        userBuildsPage
           .getOddRowBuilds()
           .should('contain', freestyleProjectPageData.buildsNumbers.build_2)
        userBuildsPage
           .getEvenRowBuilds()
           .should('contain', freestyleProjectPageData.buildsNumbers.build_1)                
      })
})
