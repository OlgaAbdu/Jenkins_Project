import NodesPage from "./NodesPage";

class NodeDeletePage {

    getDeleteBtn = () => cy.get('button[name="Submit"]');

    clickDeleteBtn() {
        this.getDeleteBtn().click();
        return new NodesPage;
    }
}

export default NodeDeletePage;