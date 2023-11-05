import pipelineStepsReferenceOverviewPageData from "../fixtures/pom_fixtures/pipelineStepsReferenceOverviewPage.json"

class PipelineStepsReferenceOverviewPage {
    
    getStepsReferenceOverviewPageHeader = () => cy.get('#main-panel>h1');
    getStepsReferenceOverviewPageUrl = () => cy.url();

    verifyStepsReferenceOverviewPageHeader() {
        this.getStepsReferenceOverviewPageHeader().should('have.text', pipelineStepsReferenceOverviewPageData.stepsReferenceOverviewPageHeader)
        return this
    }
}

export default PipelineStepsReferenceOverviewPage