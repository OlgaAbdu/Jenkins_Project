import MultibranchPipelineConfirmRenamePage from "./MultibranchPipelineConfirmRenamePage";
import MultibranchPipelinePage from "./MultibranchPipelinePage";

class MultibranchPipelineRenamePage{
    getMultibranchPipelineRenameBtn = () => cy.get('button[name="Submit"]');
    getInputField = () => cy.get('input[name="newName"]');

    clickMultibranchPipelineRenameBtn() {
        this. getMultibranchPipelineRenameBtn().click();
        return new MultibranchPipelineConfirmRenamePage();
    };

    clearAndTypeNewPipelineName(pipelineName) {
        this. getInputField().clear().type(pipelineName);
        return this;
    };

    clickRenameSubmitBtn(){
        this. getMultibranchPipelineRenameBtn().click();
        return new MultibranchPipelinePage();

    };

    clearNewPipelineName() {
        this. getInputField().clear();
        return this;
    };
}
export default MultibranchPipelineRenamePage;