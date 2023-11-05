import newItemPageData from "../fixtures/pom_fixtures/newItemPage.json";
import pipelineFullStageViewPageData from "../fixtures/pom_fixtures/pipelineFullStageViewPage.json";

class PipelineFullStageViewPage {
    getFullStageViewPageHeader = () => cy.get('#pipeline-box>h2');
    getFullStageViewPageUrl = () => cy.url();

    verifyFullStageViewPageHeader() {
        this.getFullStageViewPageHeader().should('have.text', newItemPageData.pipelineName + pipelineFullStageViewPageData.fullStageViewPageHeader);
        return this;
    }    
}
export default PipelineFullStageViewPage;