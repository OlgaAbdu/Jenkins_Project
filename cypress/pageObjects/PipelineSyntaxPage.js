import PipelineDeclarativeDirectiveGeneratorPage from "./PipelineDeclarativeDirectiveGeneratorPage"
import PipelineStepsReferenceOverviewPage from "./PipelineStepsReferenceOverviewPage"
import PipelineGlobalVariablesReferenceOverviewPage from "./PipelineGlobalVariablesReferenceOverviewPage"
import PipelineGlobalScriptScopePage from "./PipelineGlobalScriptScopePage"
import pipelineSyntaxPageData from "../fixtures/pom_fixtures/piplineSyntaxPage.json"

class PipelineSyntaxPage {
    getDeclarativeOnlineDocumentationOptionLink = () => cy.get('#side-panel>:nth-child(1)>:nth-child(4)');
    getDeclarativeOnlineDocumentationPageUrl = () =>cy.url();
    getDeclarativeDirectiveGeneratorOptionLink = () => cy.get('#side-panel>:nth-child(1)>:nth-child(3)');
    getStepsReferenceOptionLink = () => cy.get('#side-panel>:nth-child(1)>:nth-child(5)');
    getOnlineDocumentationOptionLink = () => cy.get('#side-panel>:nth-child(1)>:nth-child(7)');
    getOnlineDocumentationPageUrl = () =>cy.url();
    getGlobalVariablesReferenceOptionLink = () => cy.get('#side-panel>:nth-child(1)>:nth-child(6)');
    getExamplesReferenceOptionLink = () => cy.get('#side-panel>:nth-child(1)>:nth-child(8)');
    getExamplesReferencePageUrl = () =>cy.url();
    getIntellijIdeaGdslOptionLink = () => cy.get('#side-panel>:nth-child(1)>:nth-child(9)');
    getGeneratedPipelineScriptTextArea = () => cy.get('input[name="json"]');
    getSampleStepOptionDropdownList = () => cy.get('select[class="jenkins-select__input dropdownList"]');
    getMessageInput = () => cy.get('input[name="_.message"]');
    getGeneratePipelineScriptBtn = () => cy.get('button[id="yui-gen1-button"]');
    getPipelineSyntaxPageOptionsList = () => cy.get('#side-panel .task span a[href]');

    clickDeclarativeOnlineDocumentationPageLink() {
        this.getDeclarativeOnlineDocumentationOptionLink().click();
        return this;
    }

    clickDeclarativeDirectiveGeneratorOptionLink() {
        this.getDeclarativeDirectiveGeneratorOptionLink().click();
        return new PipelineDeclarativeDirectiveGeneratorPage();
    }

    clickStepsReferenceOptionLink() {
        this.getStepsReferenceOptionLink().click();
        return new PipelineStepsReferenceOverviewPage();
    }

    clickOnlineDocumentationOptionLink() {
        this.getOnlineDocumentationOptionLink().click();
        return this;
    }

    clickGlobalVariablesReferenceOptionLink() {
        this.getGlobalVariablesReferenceOptionLink().click();
        return new PipelineGlobalVariablesReferenceOverviewPage();
    }

    clickExamplesReferenceOptionLink() {
        this.getExamplesReferenceOptionLink().click();
        return this;
    }

    clickIntellijIdeaGdslOptionLink() {
        this.getIntellijIdeaGdslOptionLink().click();
        return new PipelineGlobalScriptScopePage();
    }

    verifyPipelineScriptTextAreaIsEmpty() {
        this.getGeneratedPipelineScriptTextArea().should('have.value', pipelineSyntaxPageData.generatedPipelineScriptValue)
        return this
    }

    selectSampleStepOption() {
        this.getSampleStepOptionDropdownList().select(pipelineSyntaxPageData.sampleStepOption);
        return this;
    }

    typeMessage() {
        this.getMessageInput().type(pipelineSyntaxPageData.snippetGeneratorMessage);
        return this;
    }

    clickGeneratePipelineScriptBtn() {
        this.getGeneratePipelineScriptBtn().click();
        return this;
    }

};

export default PipelineSyntaxPage