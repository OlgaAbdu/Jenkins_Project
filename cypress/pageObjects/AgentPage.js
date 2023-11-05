import NodeDeletePage from "./NodeDeletePage";
import NodesPage from "./NodesPage";
class AgentPage {

getDescriptionField = () => cy.get ('#description');
getDeleteAgentSidePanLink = () => cy.get('#tasks a[href*="/delete"]');

clickDeleteAgentLink() {
    this.getDeleteAgentSidePanLink().click()
    return new NodeDeletePage()
}

}

export default AgentPage;