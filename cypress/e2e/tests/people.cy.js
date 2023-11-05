/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import userProfilePageData from "../../fixtures/pom_fixtures/userProfilePage.json";
import peoplePageData from "../../fixtures/pom_fixtures/peoplePage.json";
import UserProfilePage from "../../pageObjects/UserProfilePage";
import PeoplePage from "../../pageObjects/PeoplePage";

describe('people', () => {

    const homePage = new HomePage();
    const headerAndFooter = new HeaderAndFooter();
    const userProfilePage = new UserProfilePage();
    const peoplePage = new PeoplePage();
    
    it('AT_06.01.02 | People tab is clickable and redirecting to the correct page with the header People and endpoint is /asynchPeople/', () => {
        homePage
            .clickPeopleSideMenuLink()
            .verifyPeoplePagesUrl(peoplePageData.peopleEndPointURL)
            .trimPeoplePageHeader()
            .should('eq', peoplePageData.peoplePageHeader)
    });

    it('AT_06.03.01 | <People>Sort people list', () => {
        homePage
            .clickPeopleSideMenuLink()
            .clickSortHeaderMenu()
    });


    it('AT_06.01.09 | People tab is highlighted after redirecting to the People page.', () => {
        homePage
            .clickPeopleSideMenuLink()
            .verifyPeopleTabIsHighlighted(peoplePageData.highlitedTabClass, peoplePageData.highlitedTabClassBackGroundColor)
    });    

    it('AT_06.01.08 | Verify that the User ID is displayed in the People table on the People page after creating a new User', () => {
        homePage
            .clickPeopleSideMenuLink()
            .getPeopleTableBody()
            .should('not.contain', peoplePageData.newUserName);
        
        headerAndFooter
            .clickJenkinsHomeLink();
        cy.createUser(
            userProfilePageData.user.name,
            userProfilePageData.user.password,
            userProfilePageData.user.confirmPassword,
            userProfilePageData.user.emailAddress
            );

        homePage
            .clickPeopleSideMenuLink()
            .getPeopleTableBody()
            .should('contain', peoplePageData.newUserName);
    });

    it('AT_6.01.03 | People tab should be visible in the left side bar', () => {
        homePage
            .getPeopleSideMenuLink()
            .should("be.visible")
            .and("contain.text",peoplePageData.peopleTabText)
    });

    it('AT_06.03.06 | <People> Changing the sort order of the people`s list', () => {
        userProfilePageData.userArray.forEach((el) => {
            cy.createUser(el.name, el.password, el.confirmPassword, el.emailAddress)
        });
        homePage
            .clickPeopleSideMenuLink()
            .verifySortPeopleListArray()
    });

    it('AT_06.01.10 | <People> Ensure the User redirect to User Page by clicking User name on People page', () => {
        userProfilePageData.userArray.forEach((el) => {
            cy.createUser(el.name, el.password, el.confirmPassword, el.emailAddress)
        });        
        homePage
            .clickPeopleSideMenuLink()
            .getRandomUserFromList()
            .then(($randomUser) => {
                cy.wrap($randomUser)
                .invoke('text')
                .then((randomUserName) => {
                    cy.wrap($randomUser).click();
                    cy.url().should('contain', randomUserName.toLowerCase());
                    userProfilePage
                        .trimUserPageHeaderName()
                        .should('eq', randomUserName);
                });
            });
    })
});
