/// <reference types="cypress" />
import HomePage from "../../pageObjects/HomePage";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import gitHubPage from "../../fixtures/pom_fixtures/gitHubPage.json";
import pipelineConfigurePageData from "../../fixtures/pom_fixtures/pipelineConfigurePage.json";
import pipelinePageData from "../../fixtures/pom_fixtures/pipelinePage.json";
import homePageData from "../../fixtures/pom_fixtures/homePage.json";
import pipelineChangesPageData from "../../fixtures/pom_fixtures/pipelineChangesPage.json";
import piplineSyntaxPageData from '../../fixtures/pom_fixtures/piplineSyntaxPage.json'
import pipelineDeclarativeDirectiveGeneratorPageData from "../../fixtures/pom_fixtures/pipelineDeclarativeDirectiveGeneratorPage.json";
import pipelineStepsReferenceOverviewPageData from "../../fixtures/pom_fixtures/pipelineStepsReferenceOverviewPage.json"
import pipelineGlobalVariablesReferenceOverviewPageData from "../../fixtures/pom_fixtures/pipelineGlobalVariablesReferenceOverviewPage.json"
import pipelineGlobalScriptScopePageData from "../../fixtures/pom_fixtures/pipelineGlobalScriptScopePage.json";
import pipelineStatusPageData from "../../fixtures/pom_fixtures/pipelineStatusPage.json";
import pipelineFullStageViewPageData from "../../fixtures/pom_fixtures/pipelineFullStageViewPage.json";

describe('pipelineProject',()=>{
    const homePage= new HomePage()
    const headerAndFooter = new HeaderAndFooter()

    it('AT_13.02_04|verify user can delete pipeline Project and project not displayed on homepage',()=>{
        homePage
        .clickCreateJobLink()
        .typeNewItemNameInputField(newItemPageData.pipelineName)
        .selectPipelineItem()
        .clickOkBtnAndGoPipelineConfig();

        headerAndFooter
        .clickJenkinsHomeLink()
        .hoverAndClickProjectDrpDwnBtn(newItemPageData.pipelineName)
        .selectDeleteDrpDwnLink()
        .getMainPanel()
        .should('not.include.text', newItemPageData.pipelineName)
        .and('include.text','Welcome to Jenkins!')                
    })
    it('AT_13.03.05 | <Pipeline>User can rename pipeline project',()=>{
        homePage
            .clickCreateJobLink()
            .typeNewItemNameInputField(newItemPageData.pipelineName)
            .selectPipelineItem()
            .clickOkBtnAndGoPipelineConfig();

        headerAndFooter
            .clickJenkinsHomeLink()
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.pipelineName)
            .selectRenamePipelineProjectDrpDwnMenuBtn()
            .typePipelineProjectNameInputField(newItemPageData.newpipelineName)
            .clickPipelineProjectRenameBtn()
            .getPipelinePageHeadline()
            .should('contain.text',newItemPageData.newpipelineName)
    })
    it('AT_13.06.01 | <Pipeline|Configuration>verify the ability to paste link from GitHub project and user is displayed icon GitHub',()=>{
        homePage
            .clickCreateJobLink()
            .typeNewItemNameInputField(newItemPageData.pipelineName)
            .selectPipelineItem()
            .clickOkBtnAndGoPipelineConfig();

        headerAndFooter
            .clickJenkinsHomeLink()
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.pipelineName)
            .clickPipelineProjectNameDropdownConfigureLink()
            .checkGitHubProjectCheckbox()
            .typePipelineProjectUrl(gitHubPage.gitHubProjectURL)
            .clickPipelineSaveBtn()
            .getSideMenuPanel()
            .should('have.length',9)
            .and('contain','GitHub');             
    })

    it('AT_13.02.003 | Pipeline Delete created project within the selected Pipeline itself', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickDeletePipelineBtn()
            .clickConfirmDeletePipeline();
            
        homePage
            .getMainPanel()
            .should('not.have.text', newItemPageData.pipelineName);
    });

    it('AT_13.05_001 | Pipeline | Edit existing description of the pipeline by adding new text to the end',()=>{
        cy.createPipelineWithDescription(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickEditDescriptionBtn()
            .typeAdditionalDescriptionOnPiplinePage()
            .clickSaveBtn()
            .getDescription()
            .should('have.text', pipelineConfigurePageData.firstDescription + pipelinePageData.additionalDescriptionPipeline)
    });

    it('AT_13.02.005 | Pipeline | Delete with breadcrumbs dropdown menu',()=>{
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickDashboardDropdownBtn()
            .clickProjectBreadcrumbsMenu()
            .clickDeletePipelineMenuFromBreadcrumbs()
            .getMainPanel()
            .should('not.have.text', newItemPageData.pipelineName)
            .and('include.text', homePageData.homePageHeader); 
    });

    it('AT_13.07.001 | <Pipeline>User is able to choose in pipeline Project on the drop down menu speed/durability override and save it',()=>{
        cy.createPipeline(newItemPageData.pipelineName); 

        homePage
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.pipelineName)
            .selectConfigPipelineDrpDwnMenuBtn()
            .clickspeedPipelineProjectCheckbox()
            .getspeedPipelineProjectDrpDnwMemuList().should('have.length',3).should('be.visible')
            .each((el, index) => {
               expect(el.text()).to.equal(pipelineConfigurePageData.pipelineSpeedDurabilityOverride[index])
      });                   
    })

    it('AT_13.02_006 | Pipeline - Verify the user can cancel the deletion of the pipeline in the confirmation window.',()=>{
        cy.createPipeline(newItemPageData.pipelineName); 

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickDeletePipelineBtn()
            .clickCancelConfirmDeletePipeline()
            .verifyPipelinePageUrl()
            .getPipelinePageHeadline()
            .should('have.text', `${pipelinePageData.pipelinePageHeaderStart} ${newItemPageData.pipelineName}`);
    });

    it('AT_13.12.01 | View pipeline project changes using the left-side panel', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickChangesPipelineBtn()
            .trimPipelineChangesMainPanelText()
            .should('eq', pipelineChangesPageData.pipelineChangesPageText);
    });

    it('AT_13.09.01 | Build Now option is visible', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .getBuildNowOptionLink()
            .should('contain', pipelinePageData.pipelineDropdownItems[1]);       
    });

    it('AT_13.09.02 | Run a new build', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickBuildNowOptionLink()
            .getBuildNowIndicatorWrap()
            .should('be.visible');       
    });
    
    it('AT_13.09.03 | The build details are visible', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickBuildNowOptionLink()
            .clickBuildNowTimeLink()
            .getBuildNowTimestampInfoText()
            .should('be.visible');       
    });

    it('AT_13.12.02 | View pipeline project changes using the dropdown menu from breadcrumb trail', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickProjectBreadcrumbsMenu()
        .clickBreadcrumbsPipelineChangesBtn()
        .trimPipelineChangesMainPanelText()
        .should('eq', pipelineChangesPageData.pipelineChangesPageText);
    });

    it('AT_13.10.04 | Verify clicking on the Declarative Online Documentation option redirects to the Jenkins website', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .clickDeclarativeOnlineDocumentationPageLink()
        .getDeclarativeOnlineDocumentationPageUrl()
        .should('contain', piplineSyntaxPageData.declarativeOnlineDocumentationURL)
    });

    it('AT_13.10.03 | Verify Declarative Directive can be generated', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .clickDeclarativeDirectiveGeneratorOptionLink()
        .verifyDeclarativeDirectiveTextAreaIsEmpty()
        .selectSampleDirectiveOption()
        .selectAgentOption()
        .clickGenerateDeclarativeDirectiveBtn()
        .getGeneratedDeclarativeDirectiveTextArea()
        .should('not.have.value', pipelineDeclarativeDirectiveGeneratorPageData.generatedDeclarativeDirectiveValue)
    });

    it('AT_13.10.05 | Verify clicking on the Steps Reference option redirects to the Steps Reference Overview page', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .clickStepsReferenceOptionLink()
        .verifyStepsReferenceOverviewPageHeader()
        .getStepsReferenceOverviewPageUrl()
        .should('contain', pipelineStepsReferenceOverviewPageData.stepsReferenceOverviewPageUrl )
    });

    it('AT_13.10.07 | Verify clicking on the Online Documentation option redirects to the Jenkins website', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .clickOnlineDocumentationOptionLink()
        .getOnlineDocumentationPageUrl()
        .should('contain', piplineSyntaxPageData.onlineDocumentationURL)
    });

    it('AT_13.10.06 | Verify clicking on the Global Variables Reference option redirects to the Global Variables Reference Overview page', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .clickGlobalVariablesReferenceOptionLink()
        .verifyGlobalVariablesReferenceOverviewPageHeader()
        .getGlobalVariablesReferenceOverviewPageUrl()
        .should('contain', pipelineGlobalVariablesReferenceOverviewPageData.globalVariablesReferenceOverviewPageUrl)
    });

    it('AT_13.10.08 | Verify clicking on the Examples Reference option redirects to the Jenkins website', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .clickExamplesReferenceOptionLink()
        .getExamplesReferencePageUrl()
        .should('contain', piplineSyntaxPageData.examplesReferenceUrl)
    });

    it('AT_13.10.09 | Verify clicking on the IntelliJ IDEA GDSL option redirects to the Global script scope page', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .clickIntellijIdeaGdslOptionLink()
        .verifyGlobalScriptScopePageText()
        .getGlobalScriptScopePageUrl()
        .should('contain', pipelineGlobalScriptScopePageData.globalScriptScopePageUrl)
    });

    it('AT_13.11.01 | Pipeline > Status Page: Stage View > The stage view message is visible', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickPipelineStatusOptionLink()
            .trimPipelineStatusStageViewMessage()
            .should('eq', pipelineStatusPageData.pipelineStatusStageViewMessage);     
    });

    it('AT_13.11.08 | Pipeline > Status Page: Stage View > Verify clicking on the Full Stage View option redirects to the Full Stage View page', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
            .clickPipelineProjectName(newItemPageData.pipelineName)
            .clickPipelineFullStageViewOptionLink()
            .verifyFullStageViewPageHeader()
            .getFullStageViewPageUrl()
            .should('contain', pipelineFullStageViewPageData.fullStageViewPageUrl);
    });

    it('AT_13.10.02 | Verify Pipeline Script can be generated', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .verifyPipelineScriptTextAreaIsEmpty()
        .selectSampleStepOption()
        .typeMessage()
        .clickGeneratePipelineScriptBtn()
        .getGeneratedPipelineScriptTextArea()
        .should('not.have.value', piplineSyntaxPageData.generatedPipelineScriptValue);
    });

    it('AT_13.10.01 | Verify Pipeline Syntax options are visible', () => {
        cy.createPipeline(newItemPageData.pipelineName);

        homePage
        .clickPipelineProjectName(newItemPageData.pipelineName)
        .clickPipelineSyntaxOptionLink()
        .getPipelineSyntaxPageOptionsList().then(($els) => {
            let actual = Cypress.$.makeArray($els).map($el => $el.innerText)
            expect(actual).to.be.deep.equal(piplineSyntaxPageData.pipelineSyntaxOptions)
        });
    });

});
