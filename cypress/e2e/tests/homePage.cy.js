/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import homePageData from "../../fixtures/pom_fixtures/homePage.json";
import { sidePanelItems } from "../../fixtures/pom_fixtures/homePage.json";
import { permanentAgentRadioBtn } from "../../fixtures/pom_fixtures/newNodePageData.json";
import {endPointUrl} from "../../fixtures/pom_fixtures/homePage.json";
import buildHistoryPageData from "../../fixtures/pom_fixtures/buildHistoryPage.json";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import peoplePageData from "../../fixtures/pom_fixtures/peoplePage.json";
import manageJenkinsData from "../../fixtures/pom_fixtures/manageJenkinsPage.json";
import myViewsPageData from "../../fixtures/pom_fixtures/myView.json";
import {configureCloudsHeader} from "../../fixtures/pom_fixtures/configureCloudsPage.json"
import {distributedBuildsLinkPageUrl} from "../../fixtures/pom_fixtures/distributedBuildsLinkPageData.json"
import NewItemPage from "../../pageObjects/NewItemPage";

describe("homePage", () => {
    const homePage = new HomePage()
    const newItemPage = new NewItemPage()

    sidePanelItems.forEach((item, idx) => {
      it(`AT_02.04_009 | <Homepage> Verify all ${item} of the sub-menu redirect to the proper pages`, function () {
        homePage
          .clickSideMenuPanelItem(idx)
          .should('contain', endPointUrl[idx])
      })
    })

    it("AT_02.06_005 | Homepage > Verification of the link 'Add description'", () => {
        homePage
          .clickAddDescriptionLink();
        cy.focused().should('have.attr', 'name', 'description') 
    })

    it('AT_02.04_008 | Homepage > Verify 5 items from the sub-menu', () => {
        homePage
          .createSidePanelItemsList()
          .should('deep.equal', sidePanelItems)
    });

    it("AT_02.06_004 | Homepage > Description input textarea does not exist", () => {
        homePage
          .getAddDescriptionField()
          .should("not.exist")
    });

    it("AT_02.06_006 | Homepage > Preview text equals to input description text", () => {
        homePage
          .clickAddDescriptionLink()
          .typeDescriptionIntoField(homePageData.descriptionText)
          .clickDescriptionPreviewLink()
          .getDescriptionPreview()
          .should('have.text', homePageData.descriptionText) 
    });
    
    it("AT_02.02.01 | Homepage > Verify the 'Set up an agent' link redirection", () => {
      homePage
        .clickSetUpAgentLink()
        .getPermanentAgentBtn()
        .should("have.text", permanentAgentRadioBtn);
    });

    it('AT_02.04.06 | Homepage > Verify "Build History" redirection', () => {
      homePage
          .clickBuildHistoryLink()
          .getBuildHistoryPageUrl()
          .should('include', buildHistoryPageData.buildHistoryUrl)
    })
    
    it('AT_02.04.04 | Homepage > Verify "New Item" redirection', () => {
      homePage
          .clickNewItemSideMenuLink()
          .getNewItemPageUrl()
          .should('include', newItemPageData.newItemEndPoinURL)   
    });

    it('AT_02.03.06 Homepage > Verify the redirection of the "Configure a cloud"', () => {
      homePage
      .clickConfigureACloudLink()
      .getConfigureCloudsHeader()
      .should('have.text', configureCloudsHeader)
    })

    it('AT_02.06.002 Homepage > User is able to add and edit the text in the panel description"', () => {
      homePage
        .clickAddDescriptionLink()
        .typeDescriptionIntoField(homePageData.descriptionText)
        .clickSaveDescriptionBtn()
        .clickEditDescriptionBtn()
        .typeDescriptionIntoField(homePageData.newDescriptionText)
        .clickSaveDescriptionBtn()
        .getDescriptionField()
        .should('have.text', homePageData.newDescriptionText);
    })

    it("AT_02.06_008 | Homepage > Verification of the link 'Hide preview' for description at main panel", () => {
      homePage
      .clickAddDescriptionLink()
      .typeDescriptionIntoField(homePageData.descriptionText)
      .clickDescriptionPreviewLink()
      .clickHideDescriptionPreviewLink()
      .getHideDescriptionPreview().should("not.be.visible")
    })

    it('AT_02.05.09 | Verify Link Learn more about distributed builds is redirected to the new window', () => {
      homePage
        .clickLearnMoreAboutDistributedBuildsLink()
        .getDistributedBuildsLinkPageUrl().should('contain', distributedBuildsLinkPageUrl)
    })
    
    it('AT_02.05.11 | Verify Link Learn more about distributed builds is visible', () => {
      homePage
        .getLearnMoreAboutDistributedBuildsLink()
        .should('be.visible')
        .and('contain.text', homePageData.learnMoreAboutDistributedBuildsLinkName)
    })


    it('AT_02.06.17 | Home page > The"Add description" button is visible', () => {
      homePage
        .getAddEditDescriptionBtn()
        .should('be.visible')
    })

    it('AT_02.06.18 | Verification the button Save of adding description on main page', () =>{
      homePage
      .clickAddDescriptionLink()
      .typeDescriptionIntoField(homePageData.descriptionText)
      .clickSaveDescriptionBtn()
      .getSavedDescriptionField()
      .should('contain', homePageData.descriptionText)
    })

    it('AT_02.04.02 | Homepage > Check the quantity of the submenu-items on the side panel', () => {
      homePage
        .getSideMenuPanel()
        .should('have.length', sidePanelItems.length)
    })

    it('AT_02.04.05 | Homepage > Verify "People" redirection', () => {
      homePage
          .clickPeopleSideMenuLink()
          .getPeoplePageUrl()
          .should('include', peoplePageData.peopleEndPointURL)   
  });

  it('AT_02.03.07 | Verify visibility of "Configure a cloud" link', () => {
    homePage
      .getConfigureACloudLink()
      .should('be.visible')
      .and('contain.text', homePageData.configureCloudLinkName)
  })

  it('AT_02.07.01 | Verify the header in the main panel', () => {
    homePage
      .getHomepageHeader()
      .should('be.visible')
      .and('contain.text', homePageData.homePageHeader)
  })

  it('AT_02.07.02 | Main panel should contain 2 sections', () => {
    homePage
      .getSubSectionOfMainPanelNames()
      .should('have.length', 2).each(($el, ind) => {
        expect($el.text()).to.be.equal(homePageData.subSectionOfMainPanelNames[ind])
      })
  })

  it ('AT_02.08.01 | <Homepage> Reset to initial state when all jobs deleted', () => {
    cy.createFreestyleProject(newItemPageData.freestyleProjectName);
    homePage
      .clickProjectDropdownMenuBtn()
      .selectDeleteDrpDwnLink()
      .clickWindowConfirmOk(homePageData.messages.windowConfirm)
    homePage
      .getSubSectionOfMainPanelNames()
      .should('have.length', 2).each(($el, ind) => {
        expect($el.text()).to.be.equal(homePageData.subSectionOfMainPanelNames[ind])
      })
  })
  
  it('AT_02.01.11| Homepage > Verify "Create a job" link redirection', () => {
    homePage
        .clickCreateJobLink()        
        .getNewItenHeader()
        .should('have.text', newItemPageData.newItemHeader)
    newItemPage
        .getNewItemPageUrl()
        .should('include', newItemPageData.newItemNewJobEndPoinURL)

  })

  it('AT_02.01.13 | Homepage > "Create a job" link is visible', () => {
    homePage
      .getCreateJobLink()
      .should('be.visible')
      .and('contain.text', homePageData.createJobLinkName)
  })

  it('AT_02.02.02 | Homepage > "Set up an agent" link is visible', () => {
    homePage
      .getSetUpAgentLink()
      .should('be.visible')
      .and('contain.text', homePageData.SetUpAgentLinkName)
  })

  it('AT_02.04.07 | Homepage > Verify "Manage Jenkins" redirection', () => {
    homePage
      .clickManageJenkinsSideMenuLink()
      .getManageJenkinsPageUrl()
      .should('include', manageJenkinsData.manageJenkinsEndPoinURL)  
  })

  it('AT_02.04.10 | Homepage > Verify "My views" redirection', () => {
    homePage
      .clickMyViewSideMenuLink()
      .getMyViewsPageUrl()
      .should('include', myViewsPageData.myViewsEndPoinURL)
  })

  homePageData.sidePanelItems.forEach((itemName, ind) => {
    it(`AT_02.04.${20 + ind} | Homepage > Verify the "${itemName}" item from side menu is visible`, () => {
      homePage
        .getSideMenuPanelItemText(ind)
        .should('contain.text', homePageData.sidePanelItems[ind])
    })
  })

  it('AT_20.07.07 | Verify that after clicking on the table head W arrow appears on the right side of the header', () => {
    cy.createFreestyleProject(newItemPageData.freestyleProjectName);
    homePage
      .clickHeaderTableJobW()
      .getHeaderTableJobWArrow()
      .should('exist');
  })

  })