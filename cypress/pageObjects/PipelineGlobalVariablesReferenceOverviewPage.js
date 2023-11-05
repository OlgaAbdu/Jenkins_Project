import pipelineGlobalVariablesReferenceOverviewPageData from "../fixtures/pom_fixtures/pipelineGlobalVariablesReferenceOverviewPage.json"

class PipelineGlobalVariablesReferenceOverviewPage {

    getGlobalVariablesReferenceOverviewPageHeader = () => cy.get('#main-panel>h1');
    getGlobalVariablesReferenceOverviewPageUrl = () => cy.url();

    verifyGlobalVariablesReferenceOverviewPageHeader() {
        this.getGlobalVariablesReferenceOverviewPageHeader().should('have.text', pipelineGlobalVariablesReferenceOverviewPageData.globalVariablesReferenceOverviewPageHeader)
        return this
    }

}

export default PipelineGlobalVariablesReferenceOverviewPage