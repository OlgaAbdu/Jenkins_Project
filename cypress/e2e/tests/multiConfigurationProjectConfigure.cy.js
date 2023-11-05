/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import projectData from "../../fixtures/pom_fixtures/multiConfigurationProjectConfigurePage.json";
import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import MultiConfigurationProjectConfigurePage from "../../pageObjects/MultiConfigurationProjectConfigurePage";


describe('multiConfigurationProjectConfigure', () => {
  const homePage = new HomePage();
  const headerAndFooter = new HeaderAndFooter();

  
  it('AT_14.05.10 | Multi-configuration project. Advanced project options default values', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .createAdvancedOptionsValuesList()
      .should('deep.equal', projectData.defaultOptionsValues)
  });

  it('AT_14.05.09 | Verify MultiConfig Project Advanced options are set and saved', () => {
    cy.createMultiConfigProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .clickProjectDropdownMenuBtn()
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .fillAdvancedOptionsForms()
      .clickSaveButton()
      .clickConfigureSideMenuLink()
      .clickAdvancedBtn()
      .createAdvancedOptionsCheckboxesList()
      .createAdvancedOptionsValuesList()
      .should('deep.equal', projectData.advancedOptionsValues);
  });

  it('AT_14.05_004c | Multi-configuration project. Advance project options are checked', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .clickSaveButton()
      .clickConfigureSideMenuLink()
      .clickAdvancedBtn()
      .assertAdvancedOptionsCheckboxesChecked()
  });

  it('AT_14.05_004u | Multi-configuration project. Advance project options are unchecked', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .clickSaveButton()
      .clickConfigureSideMenuLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .clickSaveButton()
      .clickConfigureSideMenuLink()
      .clickAdvancedBtn()
      .assertAdvancedOptionsCheckboxesUnChecked()
  });

  it('AT_14.05.03 | Multi-configuration project. Advanced options are enabled to select it', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .getAdvancedOptionsBlock()
      .should('be.visible')
      .and('be.enabled')
  });

  it('AT_14.05_005 | Multi-configuration project. Advanced project options. Type "number" field is shown if "Quiet period" option is selected', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickQuietPeriodCheckBox()
      .assertAdvancedOptionsQuietPeriodCheckbox()
  });


    it('AT_14.05.06 | Multi-configuration project. Advanced project options. Type "number" field is shown if "Retry count" option is selected', () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName)
      homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickRetryCountCheckBox()
      .getSCMCheckoutRetryCountText()
      .should('be.visible')
    })

    it('AT_14.05.07 | Multi-configuration project. Advanced project options. Type "number" field is shown if "Retry count" option is selected', () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName)
      homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickUseCustomWorkspaceCheckBox()
      .getDisplayNameText()
      .should('be.visible')
    })

    it('AT_14.04.06 | <Multi-configuration project> Configure | Verify possibility to disable MCPr through left side panel', () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
      homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickConfigureSideMenuLink()
        .clickEnableDisableSwitch()
        .clickSaveButton()
        .getWarningText()
        .should('be.visible')
        .and('contain', projectData.warningMessage)
        .and('have.css', 'color', projectData.colorWarningMessage)
    })

    it('AT_14.01.01 | Verify Build Environment items', () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
  
      homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickConfigureSideMenuLink()
        .verifyBuildEnviromentListItems(projectData.buildEnvironmentList)
    });

  projectData.buildEnvironmentList.forEach((text, idx) => {
    it(`AT_14.01.02 | Verify that ${text} button in Build Environment are checkable`, () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

      homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickConfigureSideMenuLink()
        .clickBuildEnviromentBtn()
        .checkBuildEnviromentCheckbox(idx)
        .getBuildEnviromentCheckbox(idx)
        .should('be.checked')
    })
  });

  it('AT_14.04.08 | <MC Project> Configure | Verify possibilty to disable MCPr through Configure in dropdown in Jenkins table', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

      homePage
        .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
        .clickMultiConfProjectDrpDwnConfigureLink()
        .clickEnableDisableSwitch()
        .clickSaveButton()
        .getWarningText()
        .should('be.visible')
        .and('contain', projectData.warningMessage)
        .and('have.css', 'color', projectData.colorWarningMessage)
  })

  it('AT_14.04.09 | <MC Project> Configure | Verify possibility to enable disabled project through configure in breadcrumbs', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

    homePage
      .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfigProjectDropdwnBreadcrumb()
      .clickBreadcrumbsMcPrConfigureBtn()
      .clickEnableDisableSwitch()
      .clickSaveButton()

    headerAndFooter
      .clickJenkinsHomeLink()

    homePage
      .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
      .clickEnableBtn()
      .getWarningText()
      .should('not.exist', projectData.warningMessage)      
  })

  projectData.buildEnvironmentList.forEach((text, idx) => {
  it(`AT_14.01.03 | Saving changes of "${text}" in Build Environment by clicking "Save" button`, () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

    homePage
    .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
    .clickConfigureSideMenuLink()
    .clickBuildEnviromentBtn()
    .checkBuildEnviromentCheckbox(idx)
    .clickSaveButton()
    .clickConfigureSideMenuLink()
    .getBuildEnviromentCheckbox(idx)
    .should('be.checked')
  })
  })

  projectData.buildEnvironmentList.forEach((text, idx) => {
    it(`AT_14.01.04 | Saving changes of "${text}" in Build Environment by clicking "Apply" button`, () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

      homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickConfigureSideMenuLink()
        .clickBuildEnviromentBtn()
        .checkBuildEnviromentCheckbox(idx)
        .clickApplyButton()

      headerAndFooter
        .clickJenkinsHomeLink()

      homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickConfigureSideMenuLink()
        .getBuildEnviromentCheckbox(idx)
        .should('be.checked')
    })
  })  

  it('AT_14.04.02 | <MC Project> Configure | Verify possibility to add description through Configure in dropdown menu on dashboard ', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

      homePage
        .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
        .clickMultiConfProjectDrpDwnConfigureLink()
        .typeDescriptionInputField()
        .clickSaveButton()
        .getDescriptionField().should('have.text', projectData.descriptionText)
   })

   it('AT_14.04.03 | <MC Project> Configure | Verify possibility to add description through configure in breadcrumbs', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

    homePage
      .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfigProjectDropdwnBreadcrumb()
      .clickBreadcrumbsMcPrConfigureBtn()
      .typeDescriptionInputField()
      .clickSaveButton()
      .getDescriptionField().should('have.text', projectData.descriptionText)
    })

    it('AT_14.04.04 | <MC Project> Configure | Verify possibility to edit description through the left-side panels', () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

      homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .typeDescriptionInputField()
      .clickSaveButton()

      .clickConfigureSideMenuLink()
      .clearDescriptionInputField()
      .editDescriptionInputField()
      .clickSaveButton()
      .getDescriptionField().should('have.text', projectData.newDescriptionText)

    })

    it('AT_14.04.05 | <MC Project> Configure | Edit description via Configure from dropdown menu on the dashboard', () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

      homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .typeDescriptionInputField()
      .clickSaveButton()

      headerAndFooter
        .clickJenkinsHomeLink()

      homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clearDescriptionInputField()
      .editDescriptionInputField()
      .clickSaveButton()
      .getDescriptionField().should('have.text', projectData.newDescriptionText)

    })

    it('AT_14.04.07 | <MC Project> Configure | Verify possibility to edit description through configure in breadcrumbs', () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);

      homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .typeDescriptionInputField()
      .clickSaveButton()

      headerAndFooter
      .clickJenkinsHomeLink()
  
     homePage
      .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfigProjectDropdwnBreadcrumb()
      .clickBreadcrumbsMcPrConfigureBtn()
      .clearDescriptionInputField()
      .editDescriptionInputField()
      .clickSaveButton()
      .getDescriptionField().should('have.text', projectData.newDescriptionText)

    })
    
    it(`AT_14.04.10 | Verify that the first checkbox under Description filed is checkable`, () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
  
      homePage
        .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
        .clickConfigureSideMenuLink()
        .checkGeneralOprionsFirstCheckbox()
        .getGeneralOptionsFirstCheckBox()
        .should('be.checked')
      })
    
});
