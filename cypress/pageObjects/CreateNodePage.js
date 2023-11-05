import NodesPage from "./NodesPage";

class CreateNodePage {
    getSaveBtn = () => cy.get('button[name="Submit"]')
    getNodeDescriptionField = () => cy.get('.setting-main [name="nodeDescription"]');
    
    clickSaveBtn() {
        this.getSaveBtn().click();
        return new NodesPage()
    }

    addDescription(nodeDescription) {
        this.getNodeDescriptionField().type(nodeDescription)
        return this
    }
}
export default CreateNodePage;