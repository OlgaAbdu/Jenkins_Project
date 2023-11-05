import MultibranchPipelineRenamePage from "./MultibranchPipelineRenamePage";
import multibranchPipelinePage from "../fixtures/pom_fixtures/multibranchPipelinePage.json"


class MultibranchPipelineStatusPage{
    getMultibranchPipeRenameSideMenuLink = () => cy.get('#tasks a[href*="/confirm-rename"]');
    getMultibranchTitle = () => cy.get("div[id='main-panel'] h1");
    getMultibranchDescription = () => cy.get('#view-message')


    clickMultibranchPipeRenameSideMenuLink() {
        this.getMultibranchPipeRenameSideMenuLink().click();
        return new MultibranchPipelineRenamePage();
    };

    checkMultibranchPipelineTitle() {
        this.getMultibranchTitle()
        .should('contain', multibranchPipelinePage.multibranchPipelineTitle);
         return this     
    }

    checkMultibranchPipelineDescription() {
        this.getMultibranchDescription()
        .should('contain', multibranchPipelinePage.multibranchPipelineDescription);
         return this     
    }
}
export default MultibranchPipelineStatusPage;