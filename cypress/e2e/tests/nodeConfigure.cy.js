/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import NodeConfigurePage from "../../pageObjects/NodeConfigurePage";
import nodeConfigurePageData from '../../fixtures/pom_fixtures/nodeConfigurePage.json';
import nodePageData from "../../fixtures/pom_fixtures/nodePage.json";
import ErrorMessagePage from "../../pageObjects/ErrorMessagePage";
import errorPageData from "../../fixtures/pom_fixtures/errorPageData.json";

describe('Build Executor Status > Agent (Node) > Configure', () => {
    const homePage = new HomePage();
    const nodeConfigurePage = new NodeConfigurePage();
    const errorPage = new ErrorMessagePage();

    it('AT 11.03.01 | Clicking Gear Icon on NodesPage navigates to the Node Configure page', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .getNodePropertiesTitle()
            .then((actualText) => {
                expect(actualText).to.equal(nodeConfigurePageData.nodePropertiesSectionTitle);
            });
        nodeConfigurePage
            .getNodeConfigurePageUrl()
            .should('include', nodeConfigurePageData.nodeConfigurePageUrl);
    });

    it('AT 11.03.02 | Clicking Configure dropdown on NodesPage navigates to the Node Configure page', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .hoverAndClickNodeDrpDwn(nodePageData.nodeBuiltInName)
            .selectConfigNodeDrpDwnMenuBtn(nodePageData.nodeBuiltInName)
            .getNodePropertiesTitle()
            .then((actualText) => {
                expect(actualText).to.equal(nodeConfigurePageData.nodePropertiesSectionTitle);
            });
        nodeConfigurePage
            .getNodeConfigurePageUrl()
            .should('include', nodeConfigurePageData.nodeConfigurePageUrl);
    });

    it('AT 11.03.03 | Clicking Configure side menu on NodeStatusPage navigates to the NodeConfigure page', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuildInNodeName(nodePageData.nodeBuiltInName)
            .clickConfigureSideMenuLink()
            .getNodePropertiesTitle()
            .then((actualText) => {
                expect(actualText).to.equal(nodeConfigurePageData.nodePropertiesSectionTitle);
            });
        nodeConfigurePage
            .getNodeConfigurePageUrl()
            .should('include', nodeConfigurePageData.nodeConfigurePageUrl);
    });

    it('AT 11.07.01 | Save Button is visible on Node Configure page', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .getNodeConfigSaveBtn()
            .should('be.visible')
            .and('have.text', 'Save')
    });

    it('AT 11.07.02 | Save Button is clickable', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .clickNodeConfigureSaveBtn()
            .getBuiltInNodeHeader()
            .should('be.visible')
            .and('have.text', nodePageData.buildInHeader)
    });

    it('AT 11.07.03 | Save Button redirects to Built-In Node Status page', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .clickNodeConfigureSaveBtn()
            .getNodePageUrl()
            .should('include', nodePageData.buildBuiltInUrl)
    });

    it('AT 11.07.04 | Apply configurations changes with Save button', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .typeValueIntoLabelsField(nodePageData.validSingleLabel)
            .typeValueNumberOfExecutorsIntoField(nodePageData.evenValueNumberOfExecutors)
            .clickNodeConfigureSaveBtn()
            .getLabelLink(nodePageData.validSingleLabel)
            .should("have.text", nodePageData.validSingleLabel);

        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .clearLabelsField()
            .clickNodeConfigureSaveBtn();
    });


    it('AT 11.08.01 | Number of executors > Verify that the field accepts valid digit input', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .typeValueNumberOfExecutorsIntoField(nodePageData.validValueNumberOfExecutors)
            .clickLabelsField()
            .getNumberOfExecutorsField()
            .should("have.value", nodePageData.validValueNumberOfExecutors);
    });

    it('AT 11.08.02 | Number of executors > Verify that the field filters digits from mixed input ' +
        'of digits, spaces, letters, special symbols', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .typeValueNumberOfExecutorsIntoField(nodePageData.mixedInputNumberOfExecutors)
            .clickLabelsField()
            .getNumberOfExecutorsField()
            .should("have.value", nodePageData.mixedValueNumberOfExecutors);
    });

    it('AT 11.08.03 | Number of executors > Verify that the default value is set to 0 (zero)', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .typeValueNumberOfExecutorsIntoField(nodePageData.defaultValueNumberOfExecutors)
            .clickLabelsField()
            .getNumberOfExecutorsField()
            .should("have.value", nodePageData.defaultValueNumberOfExecutors);
    });

    nodePageData.errorsNumberOfExecutors.forEach((errors, idx) => {
        it(`AT 11.08.${'04' + idx} | Number of executors > Error is displayed for negative or decimal input`, () => {
            const errorMessage=nodePageData.errorsNumberOfExecutors[idx].trim()
            homePage
                .clickBuildExecutorStatusLink()
                .clickBuiltInNodeGearBtn()
                .typeValueNumberOfExecutorsIntoField(nodePageData.invalidValueNumberOfExecutors[idx])
                .clickLabelsField()
                .getErrorMessage()
                .should("have.text", errorMessage)
                .and('be.visible');
        });
    });

    it('AT 11.08.06 | Number of executors > Error is displayed for empty field', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .clearNumberOfExecutorsField()
            .clickLabelsField()
            .getErrorMessage()
            .should("have.text", nodePageData.errorEmptyNumberOfExecutors)
            .and('be.visible');
    });

    it('AT 11.08.07 | Number of executors > User is able to paste data in the field', () => {
        const valueToPaste = nodePageData.valueToCopy;
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .clickNumberOfExecutorsField()
            .pasteValueNumberOfExecutorsIntoField(valueToPaste)
            .clickLabelsField()
            .getNumberOfExecutorsField()
            .should("have.value", nodePageData.valueToCopy);
    });

    nodePageData.invalidValuesNumberOfExecutorsToSave.forEach((errorChar, idx) => {
        it(`AT 11.08.0${9 + idx} | Number of executors > User is redirected to Error Page on saving not allowed ${errorChar} input`, () => {
            homePage
                .clickBuildExecutorStatusLink()
                .clickBuiltInNodeGearBtn()
                .typeValueNumberOfExecutorsIntoField(nodePageData.invalidValuesNumberOfExecutorsToSave[idx])
                .clickNodeConfigureSaveBtnAndNavigateErrorPage()
                .getErrorPageHeader()
                .should('be.visible')
                .and("have.text", errorPageData.errorPageHeader);
            errorPage
                .getErrorPageUrl()
                .should('include', errorPageData.nodeErrorPageUrl);
        });
    });

    it('AT 11.09.01 | Labels > The Field is empty by default', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .getLabelsField()
            .should("have.value", "");
    });

    it('AT 11.09.02 | Labels > User is able to add a single-word label', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .typeValueIntoLabelsField(nodePageData.validSingleLabel)
            .clickNodeConfigureSaveBtn()
            .getLabelLink(nodePageData.validSingleLabel)
            .should("have.text", nodePageData.validSingleLabel);

    });

    after('Clear configuration to defaults', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .clickBuiltInNodeGearBtn()
            .clearLabelsField()
            .clickNodeConfigureSaveBtn();
    });
})