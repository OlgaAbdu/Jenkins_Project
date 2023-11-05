/// <reference types = "cypress"/>
import HomePage from '../../pageObjects/HomePage'
import BuildHistoryPage from '../../pageObjects/BuildHistoryPage'
import IconLegendsPage from '../../pageObjects/IconLegendsPage'
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import iconLegendsData from '../../fixtures/pom_fixtures/iconLegends.json'
import homePageData from "../../fixtures/pom_fixtures/homePage.json"

describe('iconLegends', () => {
    const homePage = new HomePage();
    const buildHistory = new BuildHistoryPage();
    const iconLegends = new IconLegendsPage();

    it('AT_20.05_003 | Icon legend`s quantity by groups', () => {
        homePage.clickBuildHistoryLink();
        buildHistory.clickIconLegendsButton();
        
        iconLegends
            .getStatusIconsGroup()
            .should('have.length', iconLegendsData.statusDescriptions.length);
        iconLegends
            .getProjectHealthIconsGroup()
            .should('have.length', iconLegendsData.projectHealthDescriptions.length)
    })

    it("AT_20.05.05 | Dashboard Icon legend | Verify the subtitle Project Health is visible on the Icon legend Page", function () {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

      homePage
        .clickIconLegendButton()
        .getIconLegendPageSubtitles()
        .contains(iconLegendsData.headers[1])
        .should("be.visible");
    });


    it("AT_20.05.006.01 | Icons visibility verification - Status", function () {
        homePage
            .clickBuildHistoryLink()
            .clickIconLegendsButton()

            .getStatusIcons()
            .each(($el) => {
                cy.wrap($el).should('be.visible');
            })          
    })
    
    it("AT_20.05.006.02 | Icons visibility verification - Project Health", function () {
        homePage
            .clickBuildHistoryLink()
            .clickIconLegendsButton()

            .getProjectHealthIcons()
            .each(($el) => {
                cy.wrap($el).should('be.visible');
            })
    })

    it("AT_20.05.01 | Dashboard Icon legend | Verify Icon legend button redirects to Icon legend Page", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

      homePage
        .clickIconLegendButton()
        .verifyIconLegendPageTitle()
        .getIconLegendPageUrl()
        .should("contain", iconLegendsData.iconLegendPageUrl);
    });

    it("AT_20.05.07 | Dashboard Icon legend | Verify visibility of The Icon legend button on the Dashboard", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

      homePage
        .getIconLegendButton()
        .should("be.visible")
        .and("have.text", homePageData.IconLegendName)
    });

    it("AT_20.05.08 | Dashboard Icon legend | Verify The Icon legend button is hoverable", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

        homePage
            .getIconLegendButton()
            .should("have.css", "cursor", "pointer");
    });

    it("AT_20.05.04| Dashboard Icon legend | Verify number of Icon legend", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

      homePage
        .clickIconLegendButton()
        .getAllIconLegendList()
        .should(
          "have.length",
          iconLegendsData.statusDescriptions.concat(
            iconLegendsData.projectHealthDescriptions
          ).length
        );
    });

    it("AT_20.05.09 | Dashboard Icon legend | Verify the subtitle Status is visible on the Icon legend Page", function () {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

      homePage
        .clickIconLegendButton()
        .getIconLegendPageSubtitles()
        .contains(iconLegendsData.headers[0])
        .should("be.visible");
    });

    it("AT_20.05.10 | Dashboard Icon legend | Verify the description list with subtitle Status includes list of descriptions of icons", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

      homePage
        .clickIconLegendButton()
        .getIconLegendPageStatusDescriptionList()
        .each(($el, idx) => {
          expect($el.text()).contain(iconLegendsData.statusDescriptions[idx]);
        });
    });

    it("AT_20.05.11 | Dashboard Icon legend | Verify the description list with subtitle Project Health includes list of descriptions of icons", () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName);

      homePage
        .clickIconLegendButton()
        .getIconLegendPageProjectHealthDescriptionList()
        .each(($el, idx) => {
          expect($el.text()).contain(
            iconLegendsData.projectHealthDescriptions[idx]
          );
        });
    });
})