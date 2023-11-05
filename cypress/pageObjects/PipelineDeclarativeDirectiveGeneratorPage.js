import pipelineDeclarativeDirectiveGeneratorPageData from "../fixtures/pom_fixtures/pipelineDeclarativeDirectiveGeneratorPage.json"

class PipelineDeclarativeDirectiveGeneratorPage {
    
    getSampleDirectiveOptionDropdownList = () => cy.get('select[class = "jenkins-select__input dropdownList"]');
    getAgentOptionDropdownList = () => cy.get('div[name="prototype"] > .jenkins-form-item > .jenkins-select > select[class="jenkins-select__input dropdownList"]');
    getGenerateDeclarativeDirectiveBtn = () => cy.get('button[id="yui-gen1-button"]');
    getGeneratedDeclarativeDirectiveTextArea = () => cy.get('input[name="json"]');

    verifyDeclarativeDirectiveTextAreaIsEmpty() {
        this.getGeneratedDeclarativeDirectiveTextArea().should('have.value', pipelineDeclarativeDirectiveGeneratorPageData.generatedDeclarativeDirectiveValue)
        return this
    }

    selectSampleDirectiveOption() {
        this.getSampleDirectiveOptionDropdownList().select(pipelineDeclarativeDirectiveGeneratorPageData.sampleDirectiveOption);
        return this;
    }

    selectAgentOption() {
        this.getAgentOptionDropdownList().select(pipelineDeclarativeDirectiveGeneratorPageData.AgentOption)
        return this
    }

    clickGenerateDeclarativeDirectiveBtn() {
        this.getGenerateDeclarativeDirectiveBtn().click()
        return this
    }
}

export default PipelineDeclarativeDirectiveGeneratorPage;